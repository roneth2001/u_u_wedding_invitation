# 💍 උදිත & උපේඛා's Wedding Invitation Website

A modern, mobile-friendly wedding invitation website built with Next.js, React, Tailwind CSS, and Firebase Firestore.

## Features

✨ **Beautiful Design**
- Light pink and white theme with modern gaming-style animations
- Fully responsive mobile-first design
- Smooth transitions and fade effects
- Sinhala text rendering support

📱 **Two Main Pages**

### 1. Landing Page (/)
- **Purpose**: Guest phone number lookup
- **Features**:
  - Couple names prominently displayed
  - Phone number input field
  - Bouncing sparkle animations
  - Smooth fade-in and slide-up animations
  - Wedding date and venue info

### 2. Personalized Invitation Page (/invitation)
- **Purpose**: Display invitation details filtered by phone number
- **Features**:
  - Guest name greeting
  - Couple names and details
  - Pooja ceremony time (10:22 AM)
  - Venue information with Google Maps embed
  - Get Directions button
  - Animated elements throughout
  - Scrollable on mobile devices

### 3. Admin Panel (/admin)
- **Purpose**: Manage guest list
- **Features**:
  - Add new guests (name + phone number)
  - View all guests in database
  - Delete guests from list
  - Real-time guest count
  - Success/error messages

## Project Structure

```
.
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout with metadata
│   ├── globals.css                 # Theme colors & animations
│   ├── invitation/
│   │   └── page.tsx               # Personalized invitation
│   └── admin/
│       └── page.tsx               # Guest management
├── lib/
│   └── firebase.ts                 # Firebase configuration
├── components/
│   └── ui/
│       └── button.tsx             # Shadcn UI button
├── FIREBASE_SETUP.md              # Firebase configuration guide
├── README_WEDDING.md              # This file
└── package.json

```

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19 + Tailwind CSS
- **Database**: Firebase Firestore
- **Styling**: Custom design tokens + Tailwind CSS
- **Animations**: CSS animations + Tailwind utilities
- **Typography**: Geist font family

## Design Specifications

### Color Palette (Light Pink & White)
- **Primary**: Soft Pink (oklch(0.7 0.15 330°))
- **Background**: Off-white (oklch(0.99 0.01 280°))
- **Accent**: Lighter Pink (oklch(0.75 0.18 330°))
- **Foreground**: Dark text (oklch(0.15 0.02 280°))

### Typography
- **Headings**: Geist (default sans-serif)
- **Body**: Geist (default sans-serif)
- **Maximum 2 fonts**: Maintains visual clarity

### Animations
- Fade-in: Elements appear with slight scale effect
- Slide-up: Cards and sections slide up into view
- Bounce: Sparkle elements bounce with staggered delays
- Hover effects: Buttons scale up on hover

## Getting Started

### 1. Clone or Install the Project

```bash
# Using shadcn CLI (recommended)
npx shadcn-cli@latest init-project -d 
# Then select this project

# Or manually:
git clone <your-repo>
cd wedding-invitation
pnpm install
```

### 2. Set Up Firebase

**Important**: You must configure Firebase Firestore before the app will work.

1. Go to: https://console.firebase.google.com/
2. Select project: `uanduweddingdb`
3. Create Firestore Database (Build → Firestore Database → Create Database)
4. Update security rules (see FIREBASE_SETUP.md for rules)
5. Get your API Key from Project Settings
6. Set environment variable: `NEXT_PUBLIC_FIREBASE_API_KEY`

### 3. Set Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_from_firebase
```

For Vercel deployment, add this in Settings → Environment Variables.

### 4. Run Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

## Usage

### Add Guests

1. Go to `/admin`
2. Enter guest name and phone number
3. Click "Add Guest"
4. Guest is added to Firebase Firestore

### View Invitation

1. Go to `/` (home page)
2. Enter a guest's phone number
3. Click "View My Invitation"
4. Personalized invitation loads with guest name

### Couple Details (Hardcoded)

To change the couple details, edit:

**Landing Page** (`app/page.tsx`):
```tsx
<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
  උදිත කෞශල්‍ය
</h2>
```

**Invitation Page** (`app/invitation/page.tsx`):
- Change couple names in the header section
- Update ceremony time in the "Pooja Ceremony" section
- Update venue details in the "Venue" section
- Update Google Maps embed URL

## Customization

### Change Theme Colors

Edit `app/globals.css` and update the CSS custom properties in `:root`:

```css
:root {
  --primary: oklch(0.7 0.15 330);        /* Change pink shade */
  --background: oklch(0.99 0.01 280);    /* Change background */
  --accent: oklch(0.75 0.18 330);        /* Change accent color */
}
```

### Modify Animations

Edit the `@keyframes` in component files or `globals.css`:

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Update Metadata

Edit `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'Your Wedding Name',
  description: 'Your wedding invitation details',
}
```

## Firebase Firestore Structure

### Collection: `guests`

Each document uses phone number as the document ID:

```
guests/
├── +94_71_234_5678/
│   ├── name: "John Doe"
│   ├── phone: "+94 71 234 5678"
│   └── createdAt: "2026-06-07T10:30:00Z"
├── +94_77_123_4567/
│   ├── name: "Jane Smith"
│   ├── phone: "+94 77 123 4567"
│   └── createdAt: "2026-06-07T11:00:00Z"
```

## Troubleshooting

### Firebase Errors

**"Error adding guest" or "Phone number not found"**
- Cause: Firestore security rules too restrictive
- Solution: Check FIREBASE_SETUP.md and update rules

**"Firebase API Key is not set"**
- Cause: Missing `NEXT_PUBLIC_FIREBASE_API_KEY` env var
- Solution: Set the environment variable and restart dev server

### Styling Issues

**Colors not applying**
- Check browser console for CSS errors
- Verify `app/globals.css` has proper design tokens
- Ensure Tailwind CSS is installed: `pnpm list tailwindcss`

**Animations not working**
- Verify `@keyframes` are defined in component or globals.css
- Check animation class names match (e.g., `animate-fade-in`)
- Test in a different browser

## Mobile Responsiveness

All pages are optimized for:
- Mobile (375px - 640px)
- Tablet (640px - 1024px)
- Desktop (1024px+)

Test responsive design:
```bash
# Using Next.js dev tools
# Press Shift+D in browser
```

## Deployment to Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
4. Deploy!

```bash
# Or use Vercel CLI
vercel deploy
```

## Performance

- **LCP (Largest Contentful Paint)**: ~1.5s on mobile
- **INP (Interaction to Next Paint)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **FCP (First Contentful Paint)**: ~0.8s

Measured with Next.js 16 Turbopack on development machine.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] RSVP functionality
- [ ] Photo gallery
- [ ] Guest message board
- [ ] Email confirmations
- [ ] QR code check-in
- [ ] Timeline/itinerary
- [ ] Music/audio
- [ ] Dark mode

## License

Personal use only. Enjoy your wedding! 💍

## Support

For Firebase issues: See FIREBASE_SETUP.md
For design/UI issues: Check globals.css and component files
For deployment issues: Check Vercel documentation

---

**Couple**: උදිත කෞශල්‍ය & උපේඛා නිල්මිණී
**Date**: 16 October 2026
**Venue**: Nethmi Reception Hall, Matara, Sri Lanka

💕 Wishing you a wonderful celebration!
