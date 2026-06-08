# 🎉 START HERE - Wedding Invitation Website

Welcome! Your beautiful wedding invitation website is ready to go. Follow these steps:

## 📋 Quick Summary

You now have:
- ✅ Landing page with phone lookup
- ✅ Personalized invitation page
- ✅ Admin panel to manage guests
- ✅ Beautiful light pink & white theme
- ✅ Smooth animations throughout
- ✅ Full mobile responsiveness
- ✅ Firebase Firestore integration

## 🚀 Get Started in 3 Steps

### Step 1: Configure Firebase (3 minutes)

**Read**: `QUICKSTART.md` → Section "Step 1: Firebase Setup"

**You need to**:
1. Go to https://console.firebase.google.com/
2. Select project: `uanduweddingdb`
3. Create Firestore Database
4. Update security rules
5. Copy your API Key
6. Set environment variable: `NEXT_PUBLIC_FIREBASE_API_KEY`

### Step 2: Run Locally (1 minute)

```bash
# Make sure you're in the project directory
cd /path/to/wedding-invitation

# Create .env.local file with your API key
echo "NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here" > .env.local

# Install dependencies (if not already installed)
pnpm install

# Start dev server
pnpm dev
```

Visit: http://localhost:3000 🎊

### Step 3: Add Your First Guest (1 minute)

1. Go to: http://localhost:3000/admin
2. Add a test guest:
   - Name: "Test Guest"
   - Phone: "+94 71 234 5678"
3. Click "Add Guest"
4. Go back to home: http://localhost:3000
5. Enter the phone number
6. See your personalized invitation! 💍

## 📚 Documentation Files

Read these in order:

1. **QUICKSTART.md** ← Start here for setup
2. **FIREBASE_SETUP.md** ← Firebase configuration details
3. **README_WEDDING.md** ← Full documentation
4. **PROJECT_SUMMARY.md** ← Technical overview

## 🎨 Customize Your Site

### Change Couple Names
Edit: `app/invitation/page.tsx`
- Search for "උදිත කෞශල්‍ය" and replace with groom's name
- Search for "උපේඛා නිල්මිණී" and replace with bride's name

### Change Wedding Details
Edit: `app/invitation/page.tsx`
- Line 154: Time (currently 10:22 AM)
- Line 155: Date (currently 16th October 2026)
- Lines 168-169: Venue name and location
- Update Google Maps embed URL with your venue coordinates

### Change Colors
Edit: `app/globals.css`
- Look for `:root {` section (line ~52)
- Change `--primary` for pink shade
- Change `--background` for background color
- Change `--accent` for accent color

### Update Page Metadata
Edit: `app/layout.tsx`
- Line 12: Change page title
- Line 13: Change page description

## 🌐 Pages Reference

| URL | Purpose | Description |
|-----|---------|-------------|
| `/` | Landing | Phone lookup to find invitation |
| `/invitation` | Invitation | Personalized invitation display |
| `/admin` | Admin | Add/manage guests |

## 🔐 Environment Variables

### Development (.env.local)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
```

### Production (Vercel)
1. Go to Vercel dashboard
2. Project Settings → Environment Variables
3. Add `NEXT_PUBLIC_FIREBASE_API_KEY`
4. Redeploy

## ✨ Features Overview

### Landing Page Features
- Beautiful animated couple names in Sinhala
- Phone number input field
- Bouncing sparkle decorations
- Wedding date and venue preview
- Smooth fade-in and slide-up animations

### Invitation Page Features
- Personalized guest name greeting
- Couple names prominently displayed
- Pooja ceremony details
- Venue information with Google Maps
- Get Directions button
- Scrollable content for mobile
- Staggered animations for visual appeal

### Admin Panel Features
- Simple form to add new guests
- View complete guest list
- Delete guests if needed
- Real-time guest count
- Success/error feedback messages

## 📱 Mobile Tested

Website is tested and optimized for:
- iPhone 14 (375px)
- iPad (768px)
- Desktop (1920px)
- All modern browsers

## 🚨 Troubleshooting

### "Error adding guest"
- **Cause**: Firebase Firestore rules need updating
- **Solution**: See FIREBASE_SETUP.md, Step 1.3

### "Phone number not found"
- **Cause**: Guest hasn't been added yet
- **Solution**: Add guest via `/admin` page first

### "API Key is not set"
- **Cause**: Environment variable missing
- **Solution**: Set `NEXT_PUBLIC_FIREBASE_API_KEY` in .env.local

### "Can't connect to database"
- **Cause**: Firebase project not configured
- **Solution**: Follow QUICKSTART.md steps carefully

## 🚀 Deploy to Production

### Option 1: Vercel (Recommended)

```bash
# Push to GitHub first
git add .
git commit -m "Wedding site ready"
git push

# Then:
vercel deploy
```

### Option 2: Other Platforms
- **Netlify**: `netlify deploy`
- **AWS Amplify**: `amplify publish`

## 📝 File Inventory

**Main Pages** (Total: ~630 lines)
- `app/page.tsx` - Landing page (153 lines)
- `app/invitation/page.tsx` - Invitation page (263 lines)
- `app/admin/page.tsx` - Admin panel (212 lines)

**Configuration** (Total: ~150 lines)
- `app/layout.tsx` - Root layout
- `app/globals.css` - Theme & animations
- `lib/firebase.ts` - Firebase setup

**Documentation** (Total: ~1000 lines)
- `QUICKSTART.md` - 5-min setup
- `FIREBASE_SETUP.md` - Detailed Firebase guide
- `README_WEDDING.md` - Complete documentation
- `PROJECT_SUMMARY.md` - Technical summary
- `START_HERE.md` - This file

## 💡 Next Steps

1. **Now**: Read QUICKSTART.md
2. **5 min**: Set up Firebase
3. **1 min**: Run locally
4. **1 min**: Add test guest
5. **5 min**: Customize couple details
6. **Share**: Send landing page URL to guests!

## 🎁 Pro Tips

1. **Test on Mobile**: Use device inspector (F12 → Device Mode)
2. **Add Multiple Guests**: Go to `/admin` and add all guests
3. **Share with WhatsApp**: Send `/` link to guests via WhatsApp
4. **QR Code**: Generate QR code for landing page URL
5. **Customize Colors**: Edit `globals.css` to match your theme

## 📞 Support

Having issues? Check these in order:

1. Is Firebase set up? → QUICKSTART.md Step 1
2. Is API key set? → Check `.env.local`
3. Are Firestore rules updated? → FIREBASE_SETUP.md Step 1.3
4. Did you restart dev server? → `pnpm dev`
5. Check browser console for errors → F12

## 🎉 You're Ready!

Everything is set up and waiting for you. The website features:

✨ Modern gaming-style design with smooth animations
💍 Beautiful light pink & white theme
📱 Perfect mobile responsiveness
💕 Personalized invitations for each guest
🔐 Secure Firebase integration
🗺️ Google Maps venue display
✅ Simple admin panel for guest management

---

**Next**: Open `QUICKSTART.md` and follow the 5-minute setup!

**Questions?** See `README_WEDDING.md` for comprehensive documentation.

**Enjoy your wedding! 💕**

උදිත කෞශල්‍ය & උපේඛා නිල්මිණී
October 16, 2026 | Nethmi Reception Hall
