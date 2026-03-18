#!/bin/bash
# Auto-sync new skills to damilares-skills GitHub repo
# Watches ~/.claude/skills/ and ~/.agents/skills/ for new additions

REPO="$HOME/claude-skills"
REPO_SKILLS="$REPO/plugins/v-skills/skills"
SKIP="gstack browse gstack-upgrade"
CHANGED=0
ADDED=()

# Check all skill directories including Claude desktop app
DESKTOP_SKILLS=$(find "$HOME/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin" \
  -mindepth 3 -maxdepth 3 -type d -name "skills" 2>/dev/null | head -1)

for base in "$HOME/.claude/skills" "$HOME/.agents/skills" "$DESKTOP_SKILLS"; do
  [ -d "$base" ] || continue
  for dir in "$base"/*/; do
    [ -d "$dir" ] || continue
    name=$(basename "$dir")

    # Skip skills with binaries/node_modules
    echo "$SKIP" | grep -qw "$name" && continue

    # Skip if already in repo
    [ -d "$REPO_SKILLS/$name" ] && continue

    # Copy the skill (no node_modules, no compiled binaries)
    rsync -a \
      --exclude='node_modules' \
      --exclude='dist' \
      --exclude='bin' \
      --exclude='*.bin' \
      --exclude='.git' \
      "$dir" "$REPO_SKILLS/$name/"

    ADDED+=("$name")
    CHANGED=1
  done
done

# Push only if something new was added
if [ "$CHANGED" = "1" ]; then
  cd "$REPO" || exit 1
  git add plugins/v-skills/skills/

  NAMES=$(IFS=', '; echo "${ADDED[*]}")
  git commit -m "Auto-sync: add ${NAMES}"
  git push origin main
fi
