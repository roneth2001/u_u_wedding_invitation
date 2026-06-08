import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: 'uanduweddingdb.firebaseapp.com',
  projectId: 'uanduweddingdb',
  storageBucket: 'uanduweddingdb.firebasestorage.app',
  messagingSenderId: '132818333680',
  appId: '1:132818333680:web:9d72cca65ed8335ed43735',
  measurementId: 'G-0TJLF6TCE6',
}

if (!firebaseConfig.apiKey) {
  console.warn('Firebase API key is not set. Set NEXT_PUBLIC_FIREBASE_API_KEY environment variable.')
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
