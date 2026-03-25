# Workbench — Design Spec

**Date:** 2026-03-25
**Status:** Approved
**Project:** New repo — `workbench` (separate from `claude-skills`)

---

## Overview

A public spatial canvas where a designer's work lives — frames (design exploration images) scattered freely in a pure black void, navigated by panning and zooming. Visitors browse; only the owner can add, move, and manage frames through a password-protected admin interface built on the same canvas engine.

Inspired by the spatial freedom of Figma, the formless scatter of myMind, and the polish of intercom.design.

---

## Core Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Canvas model | CSS transform pan+zoom | Performant for <500 frames, simpler than WebGL, admin and public share engine |
| Visual identity | Pure black `#080808` | Work is the only colour; void aesthetic; no chrome competing with design |
| Frame layout | Formless scatter, manually placed | Owner composes the canvas; composition is part of the art |
| Frame content | Image only | No titles, no metadata, no text on canvas — pure visual |
| Audience | Public browse, private admin | Anyone can visit; only owner can edit |
| Icons | Phosphor — thin weight + duotone | Thin on dark = premium; duotone encodes meaning (blue active, red destructive) |
| Comments | Frame-pinned only, cascade delete | Comments belong to frames; no orphans when frames removed |
| Comment control | Admin-only toggle | Owner decides when commenting is open |
| Shortcuts | Full Figma shortcut map | Feels like a real design tool, not a portfolio site |

---

## Visual Design

### Canvas
- Background: `#080808` — pure near-black void
- No grid, no dots, no visual structure — frames exist in empty space
- Frames: images displayed at full quality, subtle 1px border `rgba(255,255,255,0.06)`, drop shadow `0 6px 24px rgba(0,0,0,0.8)`
- No frame labels, titles, or overlays in public view
- Cursor: grab (panning), crosshair (comment mode), pointer (select in admin)

### Typography
- Font: Geist (UI elements only — toolbar, admin, comment popovers)
- Geist Mono for zoom percentage display, admin labels

### Opening Cinematic
1. Frames API response arrives → compute bounding box of all frames (`minX`, `minY`, `maxX`, `maxY`)
2. Calculate zoom level that fits the full bounding box in the viewport with 60px padding → clamp to `0.05×–4×`
3. Set initial canvas transform to this "fit all" zoom — canvas is visible but not yet interactive
4. Staggered frame fade-in: frames appear with 20ms stagger sorted by creation order
5. 300ms pause — visitor takes in the full scatter
6. 700ms ease-in-out zoom to `min(0.75, fitAllZoom * 1.5)` — `cubic-bezier(0.16, 1, 0.3, 1)` — control released
7. **Loading state**: while frames API is in flight, show canvas background with a single centered `opacity: 0.15` wordmark; no skeleton, no spinner

---

## Canvas Engine

### Pan + Zoom (shared — public and admin)
- Single container div: `transform: translate(${panX}px, ${panY}px) scale(${zoom})`
- Pan: `mousedown` + `mousemove` on canvas background (not on frames in public mode)
- Zoom: `wheel` event (Ctrl/Cmd+scroll or trackpad pinch), range `0.05×` to `4×`
- Touch: two-finger pan and pinch-to-zoom on mobile
- All frame positions stored as absolute canvas coordinates (px from origin)

### Edit Layer (admin only, layered on top)
- Click frame → selected state (white border glow, resize handles on corners)
- Drag selected frame → reposition (mouse delta ÷ current zoom = canvas delta)
- Corner handles → resize (maintains aspect ratio with Shift held)
- Drop image file onto canvas → upload + place at drop coordinates
- Auto-save on position/size change: debounced 800ms → PATCH `/api/frames/[id]`
- Unsaved indicator: orange dot on toolbar save button

---

## Toolbar

Floating, bottom-center, `backdrop-filter: blur(16px)`, `background: rgba(14,14,14,0.94)`.

### Public mode
| Icon (Phosphor thin) | Label | Action | Shortcut |
|---|---|---|---|
| `Hand` | Pan | Default pan tool | `H` |
| `MagnifyingGlassMinus` | Zoom out | Decrease zoom | `Cmd/-` |
| Zoom % display | — | Click to reset to 100% | `Cmd+1` |
| `MagnifyingGlassPlus` | Zoom in | Increase zoom | `Cmd/+` |
| `ArrowsOut` | Fit all | Fit all frames to viewport | `Cmd+0` |
| `MapTrifold` | Minimap | Toggle minimap | — |
| `ChatCircle` | Comments | Toggle comment pins visibility | — |

### Admin mode (adds to public toolbar)
| Icon (Phosphor thin) | Label | Action | Shortcut |
|---|---|---|---|
| `ImageSquare` + `Plus` | Add frame | Open file picker | — |
| `CursorClick` | Select | Select/move tool | `V` |
| `Trash` | Delete | Delete selected frame | `Delete` / `Backspace` |
| `CheckCircle` | Resolve | Resolve selected comment | — |
| Save indicator dot | — | Orange when unsaved | — |

### Active states
- Active tool: Phosphor **duotone** variant, blue accent `#6060ff` fill + lighter stroke
- Destructive hover (Trash, delete comment): Phosphor duotone, red accent `#c05050`

---

## Minimap

- Position: bottom-right corner, `88×62px`
- Background: `rgba(10,10,10,0.94)`, border `1px solid #1e1e1e`, `border-radius: 6px`
- **Scale**: compute bounding box of all frames → scale to fit `80×54px` inner area (4px padding each side). Scale factor: `scaleX = 80 / (bbox.maxX - bbox.minX)`, `scaleY = 54 / (bbox.maxY - bbox.minY)`, use `min(scaleX, scaleY)` to maintain aspect ratio.
- Frames rendered as tiny proportional rectangles `rgba(255,255,255,0.1)`
- Viewport indicator: white border rectangle — size = `(viewportWidth / zoom) * minimapScale × (viewportHeight / zoom) * minimapScale`, position tracks current `panX/panY`
- Click minimap → convert minimap click coordinates back to canvas space → set `panX/panY`
- Toggled via toolbar icon; persists preference in `localStorage`

---

## Comment System

### Interaction (public)
1. Comments toggle must be on (admin-controlled globally — read from `GET /api/settings`)
2. Visitor hovers a frame → cursor becomes crosshair
3. Visitor clicks on frame → compute `x_pct = (clickX - frameLeft) / frameWidth`, `y_pct = (clickY - frameTop) / frameHeight` → pin drops at that position
4. Popover appears: optional name field + comment body textarea + submit
5. Submitted pin is numbered (sequential by `created_at` ASC per frame, 1-based), visible to all visitors (blue `#6060ff`)

### Pin states
- **Open** — blue `#6060ff`, fully opaque
- **Resolved** — dimmed `rgba(96,96,255,0.25)`, still visible
- Hover pin → preview comment text in tooltip
- Click pin → full popover with comment body + author + timestamp + admin resolve/delete actions

### Admin controls
- Resolve comment: `CheckCircle` icon in pin popover → sets `resolved: true`
- Delete comment: `XCircle` icon → hard delete
- Global toggle: stored in a `settings` table row, read on every public canvas load

### Cascade delete
- `comments.frame_id` has `ON DELETE CASCADE` — frame deletion removes all its pins automatically

---

## Keyboard Shortcuts

### Universal (public + admin)
| Shortcut | Action |
|---|---|
| `H` | Hand / pan tool |
| `Space + drag` | Pan regardless of active tool |
| `Cmd/Ctrl + =` or `+` | Zoom in |
| `Cmd/Ctrl + -` | Zoom out |
| `Cmd/Ctrl + 0` | Fit all frames to screen |
| `Cmd/Ctrl + 1` | Zoom to 100% |
| `Z` + click | Zoom in on click point |
| `Z` + `Alt` + click | Zoom out on click point |
| `C` | Toggle comment mode |
| `Escape` | Dismiss popover / deselect |

### Admin only
| Shortcut | Action |
|---|---|
| `V` | Select / move tool |
| `Delete` / `Backspace` | Delete selected frame |
| `Cmd/Ctrl + D` | Duplicate selected frame — reuses same `image_url` (no re-upload), places copy at `x+20, y+20`, inserts as new DB row |
| `Cmd/Ctrl + Z` | Undo — pops last action from client-side history stack (max 50 entries), re-issues inverse API call |
| `Cmd/Ctrl + Shift + Z` | Redo — re-applies popped action |
| `Cmd/Ctrl + A` | Select all frames |
| `Cmd/Ctrl + ]` | Bring forward: `z_index = max(allFrames.z_index) + 1` for selected frame |
| `Cmd/Ctrl + [` | Send backward: `z_index = min(allFrames.z_index) - 1` for selected frame |
| `Arrow keys` | Nudge selected frame 1px (in canvas space) |
| `Shift + Arrow` | Nudge selected frame 10px (in canvas space) |

**Undo/Redo history stack** — client-side only, stored in a `useHistory` hook:
- Stack entries: `{ type: 'move' | 'resize' | 'create' | 'delete', frameId: string, before: Partial<Frame>, after: Partial<Frame> }`
- On undo: PATCH frame with `entry.before` values (or re-create/re-delete for create/delete actions)
- Stack is cleared on page reload — no persistence required for v1
- The 800ms auto-save debounce is bypassed on undo/redo — API call fires immediately

---

## Routes & API Shapes

| Route | Method | Access | Description |
|---|---|---|---|
| `/` | — | Public | Canvas — read-only pan+zoom+comments |
| `/admin/login` | — | Public | Password entry → HTTP-only session cookie |
| `/admin` | — | Protected | Edit canvas — drag, resize, upload, manage comments |
| `/api/frames` | GET | Public | List all frames |
| `/api/frames` | POST | Protected | Create frame |
| `/api/frames/[id]` | PATCH | Protected | Update position / size / z-index |
| `/api/frames/[id]` | DELETE | Protected | Delete frame (cascades comments) |
| `/api/upload` | POST | Protected | Upload image → Vercel Blob |
| `/api/comments` | GET | Public | List comments for a frame |
| `/api/comments` | POST | Public (when on) | Create comment |
| `/api/comments/[id]` | PATCH | Protected | Resolve comment |
| `/api/comments/[id]` | DELETE | Protected | Delete comment |
| `/api/settings` | GET | Public | Read settings |
| `/api/settings` | PATCH | Protected | Update settings |

### Response shapes

**`GET /api/frames`**
```ts
{ frames: Array<{ id: string; image_url: string; x: number; y: number; width: number; height: number; z_index: number; created_at: string }> }
```

**`POST /api/frames`** body: `{ image_url: string; x: number; y: number; width: number; height: number }`
→ `{ frame: Frame }`

**`PATCH /api/frames/[id]`** body: `Partial<{ x: number; y: number; width: number; height: number; z_index: number }>`
→ `{ frame: Frame }`

**`POST /api/upload`** body: `FormData` with `file` field
→ `{ url: string; width: number; height: number }`

**`GET /api/comments?frame_id=[uuid]`**
```ts
{ comments: Array<{ id: string; frame_id: string; x_pct: number; y_pct: number; body: string; author_name: string | null; resolved: boolean; created_at: string }> }
```
Query param `frame_id` is required.

**`POST /api/comments`** body: `{ frame_id: string; x_pct: number; y_pct: number; body: string; author_name?: string }`
→ `{ comment: Comment }`

**`PATCH /api/comments/[id]`** body: `{ resolved: boolean }`
→ `{ comment: Comment }`

**`GET /api/settings`**
→ `{ comments_enabled: boolean }`

**`PATCH /api/settings`** body: `{ comments_enabled: boolean }`
→ `{ comments_enabled: boolean }`

---

## Data Model

### `frames`
```sql
CREATE TABLE frames (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url   TEXT NOT NULL,           -- Vercel Blob URL
  x           FLOAT NOT NULL DEFAULT 0,
  y           FLOAT NOT NULL DEFAULT 0,
  width       FLOAT NOT NULL DEFAULT 400,
  height      FLOAT NOT NULL DEFAULT 300,
  z_index     INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Trigger to auto-update updated_at:
-- CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
-- BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;
-- CREATE TRIGGER frames_updated_at BEFORE UPDATE ON frames FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

### `comments`
```sql
CREATE TABLE comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  frame_id    UUID NOT NULL REFERENCES frames(id) ON DELETE CASCADE,
  x_pct       FLOAT NOT NULL,  -- 0–1 relative to frame width
  y_pct       FLOAT NOT NULL,  -- 0–1 relative to frame height
  body        TEXT NOT NULL,
  author_name TEXT,
  resolved    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### `settings`
```sql
CREATE TABLE settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
-- Seed: INSERT INTO settings VALUES ('comments_enabled', 'true');
```

---

## Authentication

- Single owner, no user accounts
- `ADMIN_PASSWORD` env var stores the **raw password** (server-side only, never sent to client). `bcryptjs` hashes it on first comparison using `bcrypt.hash(process.env.ADMIN_PASSWORD, 10)` and caches the hash in a module-level variable for subsequent requests — avoids re-hashing on every login attempt.
- Login flow: POST plain-text password from form → server compares with `bcrypt.compare(input, cachedHash)` → on match, set HTTP-only signed cookie `wb_session` (random 32-byte token, stored in memory/DB) with 7-day expiry
- `proxy.ts` (Next.js 16 middleware — **not** `middleware.ts`, which is the Next.js 15 name) guards `/admin` and all write API routes: reads `wb_session` cookie → validates token → passes through or redirects to `/admin/login`
- No third-party auth required

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router (TypeScript) |
| Styling | CSS Modules + CSS custom properties |
| Icons | `@phosphor-icons/react` — thin weight default, duotone for states |
| Font | Geist (next/font) |
| Image storage | Vercel Blob (`@vercel/blob`) |
| Database | Neon Postgres (`@neondatabase/serverless`) |
| Auth | `bcryptjs` + Next.js `cookies()` |
| Deploy | Vercel — new project `workbench` |

---

## Project Structure

```
workbench/
├── app/
│   ├── page.tsx                  # Public canvas
│   ├── admin/
│   │   ├── login/page.tsx        # Password entry
│   │   └── page.tsx              # Admin canvas
│   └── api/
│       ├── frames/
│       │   ├── route.ts          # GET, POST
│       │   └── [id]/route.ts     # PATCH, DELETE
│       ├── upload/route.ts
│       ├── comments/
│       │   ├── route.ts          # GET, POST
│       │   └── [id]/route.ts     # PATCH, DELETE
│       └── settings/route.ts
├── components/
│   ├── canvas/
│   │   ├── Canvas.tsx            # Core pan+zoom engine
│   │   ├── Frame.tsx             # Single image frame
│   │   ├── Toolbar.tsx           # Floating toolbar
│   │   ├── Minimap.tsx           # Minimap overlay
│   │   ├── CommentPin.tsx        # Pin + popover
│   │   └── useKeyboardShortcuts.ts
│   └── admin/
│       ├── EditFrame.tsx         # Drag/resize handles
│       └── UploadDropzone.tsx
├── lib/
│   ├── db.ts                     # Neon client
│   ├── auth.ts                   # bcrypt + cookie helpers
│   └── canvas.ts                 # Coordinate math utilities
├── proxy.ts                      # Auth guard middleware
└── .env.local                    # ADMIN_PASSWORD, DATABASE_URL, BLOB_READ_WRITE_TOKEN
```

---

## Out of Scope (v1)

- Multi-user admin / collaboration
- Frame tags or categories
- Search / filter
- Mobile admin (view-only on mobile is fine)
- Comment notifications / email
- Animation between frame states
- Public frame permalinks
- Analytics

---

## Success Criteria

- Visitor opens the page → cinematic zoom-out → can freely pan and zoom within 2 seconds
- Admin can upload an image, drag it to position, and see it live on the public canvas within 30 seconds
- All 20 keyboard shortcuts work correctly (10 universal + 10 admin-only)
- Deleting a frame removes all its comment pins with no manual cleanup
- Canvas feels smooth at 60fps with 100+ frames on a modern laptop
