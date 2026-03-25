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
1. Page loads — canvas at ~20% zoom, all frames visible in one view, staggered fade-in
2. 300ms pause — visitor takes in the full scatter
3. 700ms ease-in-out zoom to 75% — `cubic-bezier(0.16, 1, 0.3, 1)` — control released

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
- Frames rendered as tiny proportional rectangles `rgba(255,255,255,0.1)`
- Viewport indicator: white border rectangle showing current view position
- Click minimap → jump canvas to that position
- Toggled via toolbar icon; persists preference in `localStorage`

---

## Comment System

### Interaction (public)
1. Comments toggle must be on (admin-controlled globally)
2. Visitor hovers a frame → cursor becomes crosshair
3. Visitor clicks on frame → pin drops at click coordinates (stored as `x_pct`, `y_pct` — 0–1 relative to frame dimensions)
4. Popover appears: optional name field + comment body textarea + submit
5. Submitted pin is numbered, visible to all visitors (blue `#6060ff`)

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
| `Cmd/Ctrl + D` | Duplicate selected frame |
| `Cmd/Ctrl + Z` | Undo (position/size changes) |
| `Cmd/Ctrl + Shift + Z` | Redo |
| `Cmd/Ctrl + A` | Select all frames |
| `Cmd/Ctrl + ]` | Bring selected frame forward (z-index +1) |
| `Cmd/Ctrl + [` | Send selected frame backward (z-index -1) |
| `Arrow keys` | Nudge selected frame 1px |
| `Shift + Arrow` | Nudge selected frame 10px |

---

## Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Canvas — read-only pan+zoom+comments |
| `/admin/login` | Public | Password entry → HTTP-only session cookie |
| `/admin` | Protected | Edit canvas — drag, resize, upload, manage comments |
| `/api/frames` | GET: public · Write: protected | List all frames / create / update position+size / delete |
| `/api/upload` | Protected | POST image → Vercel Blob → returns `{ url, width, height }` |
| `/api/comments` | GET: public · POST: public (when comments on) | List by frame / create new comment |
| `/api/comments/[id]` | Protected | PATCH resolve · DELETE |
| `/api/settings` | GET: public · PATCH: protected | Read comments-enabled flag / toggle it |

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
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
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
- `ADMIN_PASSWORD` environment variable (bcrypt-hashed)
- Login: POST to `/admin/login` → compare with `bcrypt.compare()` → set HTTP-only signed cookie `wb_session` (7-day expiry)
- `proxy.ts` guards `/admin` and all write API routes: reads `wb_session` cookie → validates → passes or redirects to `/admin/login`
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
- All 18 Figma keyboard shortcuts work correctly
- Deleting a frame removes all its comment pins with no manual cleanup
- Canvas feels smooth at 60fps with 100+ frames on a modern laptop
