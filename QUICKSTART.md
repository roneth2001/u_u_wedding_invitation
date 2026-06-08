# Quick Start Guide

Get your wedding invitation site running in 5 minutes!

## Step 1: Firebase Setup (5 minutes)

### 1.1 Go to Firebase Console
Visit: https://console.firebase.google.com/
Select project: `uanduweddingdb`

### 1.2 Create Firestore Database
- Click **Build** → **Firestore Database**
- Click **Create Database**
- Select closest location
- **Start in Test Mode** (for now)
- Click **Create**

### 1.3 Update Firestore Security Rules
- Click **Rules** tab in Firestore
- Replace all code with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guests/{document=**} {
      allow read, write: if true;
    }
  }
}
```

- Click **Publish**

### 1.4 Get Your API Key
- Go to **Project Settings** (⚙️ icon, top-right)
- Go to **Service Accounts** tab
- Your API Key is shown under "Your API keys"
- Copy it

## Step 2: Set Environment Variable

### For Local Development
Create file: `.env.local`

```
NEXT_PUBLIC_FIREBASE_API_KEY=paste_your_api_key_here
```

### For Vercel (after deployment)
1. Go to Vercel dashboard
2. Select this project
3. Go to **Settings** → **Environment Variables**
4. Add: `NEXT_PUBLIC_FIREBASE_API_KEY` = `your_api_key`

## Step 3: Run the App

```bash
pnpm dev
```

Visit: http://localhost:3000

## Step 4: Add Your First Guest

1. Go to http://localhost:3000/admin
2. Enter:
   - Guest Name: "Test Guest"
   - Phone: "+94 71 234 5678"
3. Click "Add Guest"
4. See success message ✓

## Step 5: Test Lookup

1. Go to http://localhost:3000
2. Enter phone: "+94 71 234 5678"
3. Click "View My Invitation"
4. See personalized invitation 🎉

## Pages Reference

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Phone lookup form |
| Invitation | `/invitation?phone=...` | Personalized invitation |
| Admin | `/admin` | Add/manage guests |

## Customize Couple Details

Edit: `app/invitation/page.tsx`

Find these sections and update:

```tsx
// Couple names
<p className="text-xl font-bold text-primary">උදිත කෞශල්‍ය</p>
<p className="text-xl font-bold text-primary">උපේඛා නිල්මිණී</p>

// Time
<p className="text-lg font-bold text-primary mb-2">10:22 AM</p>

// Date
<p className="text-sm text-foreground">16th October 2026</p>

// Venue
<p className="text-lg font-bold text-foreground mb-1">
  Nethmi Reception Hall
</p>
<p className="text-sm text-muted-foreground">
  Matara, Sri Lanka
</p>
```

## Customize Colors

Edit: `app/globals.css`

Change these in `:root` section:

```css
--primary: oklch(0.7 0.15 330);         /* Pink */
--background: oklch(0.99 0.01 280);     /* Off-white */
--accent: oklch(0.75 0.18 330);         /* Light pink */
```

## Deploy to Vercel

1. Push to GitHub
2. Open Vercel dashboard
3. Click "New Project"
4. Select repo
5. Add env var: `NEXT_PUBLIC_FIREBASE_API_KEY`
6. Click Deploy
7. Share URL with guests! 🌟

## Common Issues

### "Error adding guest"
→ Check Firestore security rules are published (see Step 1.3)

### "Phone not found"
→ Make sure you added the guest to admin panel first

### Sinhala text shows as boxes
→ This is a rendering issue. Text is correct, browsers may display differently.

## Troubleshooting

**Dev server won't start?**
```bash
pnpm install
pnpm dev
```

**Still getting Firebase errors?**
1. Check `.env.local` has correct API key
2. Verify Firestore security rules are published
3. Check browser console for error messages

**Need more help?**
See: `FIREBASE_SETUP.md` or `README_WEDDING.md`

---

✨ **You're all set!** Share your wedding site with guests and enjoy! 💍
