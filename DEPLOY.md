# Deploying Push! to GitHub Pages

GitHub Pages provides **100% free** hosting for static websites. No credit card required.

## Prerequisites

- GitHub account (free)
- Repository at github.com/kyleighscards/push

## Enable GitHub Pages

1. Go to https://github.com/kyleighscards/push
2. Click **Settings** (gear icon, top right of repo)
3. In left sidebar, click **Pages**
4. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

## Verify Deployment

1. Wait 1-2 minutes for GitHub to build
2. Refresh the Pages settings page
3. You'll see: "Your site is live at https://kyleighscards.github.io/push/"
4. Click the link to play!

## Live URL

**https://kyleighscards.github.io/push/**

## Automatic Updates

Every push to the `main` branch automatically updates the live site. Changes typically appear within 1-2 minutes.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 error | Ensure index.html exists at repo root |
| CSS/JS not loading | Check paths are relative (no leading /) |
| Changes not showing | Wait 1-2 min, hard refresh (Ctrl+Shift+R) |
| Build failed | Check Actions tab for error details |

## Checking Build Status

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Look for "pages build and deployment" workflow
4. Green checkmark = success, red X = failed (click for details)
