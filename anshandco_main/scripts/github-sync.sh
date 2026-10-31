#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/Naman-OO7/anshandco.git"
SUBFOLDER="anshandco_main"
BRANCH="main"
SYNC_DIR="/tmp/anshandco_check"
COMMIT_MSG="${1:-feat(seo): complete on-page SEO, AEO, GEO, schema markup, and hero video update}"

echo "=== Connecting to GitHub Repository: Naman-OO7/anshandco ($BRANCH -> $SUBFOLDER) ==="

if [ ! -d "$SYNC_DIR/.git" ]; then
  rm -rf "$SYNC_DIR"
  git clone --branch "$BRANCH" --single-branch "$REPO_URL" "$SYNC_DIR"
fi

git -C "$SYNC_DIR" config user.name "Naman Singh"
git -C "$SYNC_DIR" config user.email "85234010+Naman-OO7@users.noreply.github.com"

echo "=== Syncing workspace files into $SUBFOLDER/ ==="
mkdir -p "$SYNC_DIR/$SUBFOLDER"

# Copy workspace project files (excluding node_modules, dist, .git, .github-sync, and AI Studio temp attachments)
tar -cf - \
  --exclude='./node_modules' \
  --exclude='./dist' \
  --exclude='./build' \
  --exclude='./.git' \
  --exclude='./.github-sync' \
  --exclude='./.aistudio' \
  --exclude='./public/assets/aistudio' \
  --exclude='./.env' \
  --exclude='./.env.local' \
  -C /app/applet . | tar -xf - -C "$SYNC_DIR/$SUBFOLDER"

git -C "$SYNC_DIR" add "$SUBFOLDER"

if git -C "$SYNC_DIR" diff --cached --quiet; then
  echo "No new changes to commit in $SUBFOLDER."
else
  git -C "$SYNC_DIR" commit -m "$COMMIT_MSG"
  echo "=== Committed changes to local branch '$BRANCH' ==="
fi

git -C "$SYNC_DIR" status -sb

if [ -n "${GITHUB_TOKEN:-}" ]; then
  echo "=== Pushing to origin/$BRANCH ==="
  git -C "$SYNC_DIR" push "https://x-access-token:${GITHUB_TOKEN}@github.com/Naman-OO7/anshandco.git" "$BRANCH"
  echo "=== Successfully pushed to https://github.com/Naman-OO7/anshandco/tree/main/anshandco_main ==="
else
  echo "=== Ready to push! Provide GITHUB_TOKEN to push directly to origin/$BRANCH ==="
fi
