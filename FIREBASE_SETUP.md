# Firebase Firestore Setup Guide

## Overview
This wedding invitation website uses Firebase Firestore to store guest information. You need to configure Firestore security rules to enable read/write access.

## Current Configuration
- **Project ID**: `uanduweddingdb`
- **API Key**: Set via `NEXT_PUBLIC_FIREBASE_API_KEY` environment variable
- **Collection**: `guests`
- **Document Structure**: Each guest document uses phone number as the document ID with fields:
  - `name`: Guest name (string)
  - `phone`: Phone number (string)
  - `createdAt`: Timestamp (ISO string)

## Firebase Console Setup

### 1. Go to Firebase Console
- Visit: https://console.firebase.google.com/
- Select the project: `uanduweddingdb`

### 2. Enable Firestore Database
- Go to **Build** → **Firestore Database**
- Click **Create Database**
- Choose a location (closest to your users)
- Select **Start in Test Mode** (for development) or **Production Mode** with custom rules

### 3. Update Firestore Security Rules

**For Development (Test Mode):**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guests/{document=**} {
      allow read, write: if request.auth != null || true;
    }
  }
}
```

**For Production (Recommended):**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guests/{document=**} {
      allow read, write: if request.ip == '0.0.0.0';
    }
  }
}
```

Replace `'0.0.0.0'` with your actual server IP or add proper authentication.

### 4. Publish Rules
- Click **Publish** to apply the rules

## Environment Variables

### Local Development (`.env.local`)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
```

### Vercel Deployment
1. Go to **Settings** → **Environment Variables** in Vercel
2. Add: `NEXT_PUBLIC_FIREBASE_API_KEY` with your Firebase API Key

## Testing

### Via Admin Panel
1. Navigate to `/admin`
2. Enter a guest name and phone number
3. Click "Add Guest"
4. Check "Show Guests" to see the list

### Via Landing Page
1. Go to home page `/`
2. Enter a phone number that you added via admin panel
3. Click "View My Invitation"
4. You should see your personalized invitation

## Troubleshooting

### "Error adding guest"
- **Cause**: Firestore security rules don't allow writes
- **Solution**: Update Firestore rules (see step 3 above)

### "Phone number not found"
- **Cause**: Guest hasn't been added to the database
- **Solution**: Add the guest via the admin panel (`/admin`)

### Firebase API Key not found
- **Cause**: Environment variable not set
- **Solution**: Set `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local` or Vercel Settings

## Project Structure

```
app/
├── page.tsx                 # Landing page (phone lookup)
├── invitation/
│   └── page.tsx            # Personalized invitation page
├── admin/
│   └── page.tsx            # Admin panel to add guests
├── layout.tsx              # Root layout with metadata
└── globals.css             # Theme with light pink & white colors

lib/
└── firebase.ts             # Firebase configuration & initialization
```

## Feature Summary

✨ **Landing Page**
- Modern, animated design with light pink & white theme
- Phone number input to lookup invitations
- Beautiful Sinhala text rendering

📝 **Invitation Page**
- Personalized greeting with guest name
- Full ceremony details (date, time, venue)
- Google Maps embed for directions
- Smooth animations and transitions

👨‍💼 **Admin Panel**
- Add guests manually with name and phone
- View all guests in the database
- Delete guests if needed
- Real-time guest count

## Mobile Responsive
All pages are fully responsive and optimized for mobile devices with smooth animations and fast load times.

## Next Steps
1. Open Firebase Console: https://console.firebase.google.com/
2. Select your project: `uanduweddingdb`
3. Set up Firestore with appropriate security rules
4. Add `NEXT_PUBLIC_FIREBASE_API_KEY` to your environment variables
5. Start adding guests via `/admin`
6. Share the landing page (`/`) with your guests!
