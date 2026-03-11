# Journey — Deployment Guide
## From your computer to iPhone in ~45 minutes

---

## What you'll need
- The `journey/` project folder (this file is inside it)
- A GitHub account (you have one ✓)
- A free Vercel account — sign up at vercel.com with your GitHub login
- Node.js installed on your Mac — check by running `node -v` in Terminal

---

## Step 1 — Install Node.js (if needed)

Open **Terminal** (Applications → Utilities → Terminal) and run:

```
node -v
```

If you see a version number (e.g. `v20.11.0`), you're good — skip to Step 2.

If you get "command not found", install Node.js:
1. Go to https://nodejs.org
2. Download the **LTS** version
3. Run the installer, click through all defaults
4. Restart Terminal, run `node -v` again to confirm

---

## Step 2 — Test the app locally

In Terminal, navigate to the journey folder and install dependencies:

```bash
cd ~/Downloads/journey        # or wherever you saved the folder
npm install
npm run dev
```

You should see something like:
```
  VITE v5.x  ready in 400ms
  ➜  Local:   http://localhost:5173/
```

Open http://localhost:5173 in your browser. Journey should be running.
Press Ctrl+C in Terminal when you're done testing.

---

## Step 3 — Push to GitHub

### Option A — GitHub Desktop (easier, no command line)
1. Download GitHub Desktop from https://desktop.github.com
2. Open it and sign in with your GitHub account
3. File → Add Local Repository → select the `journey/` folder
4. If it asks to "create a repository", click that and name it `journey`
5. Click **Publish Repository** (keep it Private if you prefer)

### Option B — Terminal commands
```bash
cd ~/Downloads/journey
git init
git add .
git commit -m "Initial Journey app"
```
Then on GitHub.com:
1. Click **+** → New repository → name it `journey` → Create
2. Copy the commands shown under "push an existing repository" and run them in Terminal

---

## Step 4 — Deploy to Vercel

1. Go to https://vercel.com and sign up / log in with GitHub
2. Click **Add New → Project**
3. Find your `journey` repository and click **Import**
4. Vercel auto-detects Vite — the settings should be:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**

Vercel will build and deploy in about 60 seconds.
You'll get a URL like: `https://journey-abc123.vercel.app`

**Custom domain (optional):** In Vercel project settings → Domains, you can add your own domain (e.g. `journey.yourdomain.com`) for free.

---

## Step 5 — Install on iPhone

1. On your iPhone, open **Safari** (must be Safari, not Chrome)
2. Go to your Vercel URL (e.g. `https://journey-abc123.vercel.app`)
3. Tap the **Share button** (box with arrow pointing up)
4. Scroll down and tap **"Add to Home Screen"**
5. Name it `Journey` and tap **Add**

Journey will appear on your home screen with the ✈️ icon. Tap it — it opens full-screen with no browser chrome, just like a native app.

---

## Step 6 — Offline support

The app is already configured to work offline. After your first visit on WiFi:
- All app code and fonts are cached on your device
- Your trip data is saved to your phone's local storage
- The app works on a plane, in a tunnel, anywhere — no signal needed

To confirm offline works: turn on Airplane Mode and open Journey. It should load instantly.

---

## Keeping your data safe

Your trip data lives in your iPhone's browser storage for the installed app.
Use Journey's built-in **Export → JSON Backup** regularly to save a copy to your Files app or iCloud Drive. This is your safety net if you ever clear Safari data.

To restore: open the JSON file from Files app, share it to Journey, or use the Import feature in the app.

---

## Updating the app

When you make changes to the code:

```bash
cd ~/Downloads/journey
# make your edits in App.jsx
git add .
git commit -m "describe your change"
git push
```

Vercel auto-deploys within ~60 seconds. Next time you open Journey on iPhone, it silently updates in the background.

---

## Troubleshooting

**"Add to Home Screen" doesn't appear**
→ Must use Safari, not Chrome or Firefox. Chrome on iOS cannot install PWAs.

**App doesn't work offline**
→ You need to visit the app once on WiFi first to prime the cache. Then it works offline.

**My trips disappeared**
→ You may have cleared Safari website data in iPhone Settings. Use the JSON export regularly as a backup.

**Vercel build failed**
→ Check the build log in Vercel dashboard. Most common issue: Node version mismatch. In Vercel project settings → General → Node.js Version, set it to 20.x.

---

## Quick reference — Terminal commands

```bash
npm install          # Install dependencies (first time only)
npm run dev          # Run locally at localhost:5173
npm run build        # Build for production (Vercel does this automatically)
git add .            # Stage all changes
git commit -m "msg"  # Save a version
git push             # Push to GitHub → triggers Vercel deploy
```
