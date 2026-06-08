'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'

interface Guest {
  id: string
  name: string
  phone: string
  createdAt?: string
}

export default function AdminPage() {
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [guests, setGuests] = useState<Guest[]>([])
  const [showGuests, setShowGuests] = useState(false)

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!guestName.trim() || !guestPhone.trim()) {
      setMessage('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const guestsRef = collection(db, 'guests')
      await addDoc(guestsRef, {
        name: guestName,
        phone: guestPhone,
        createdAt: new Date().toISOString(),
      })

      setMessage(`✓ ${guestName} added successfully!`)
      setGuestName('')
      setGuestPhone('')

      // Refresh guests list
      if (showGuests) {
        loadGuests()
      }
    } catch (error) {
      console.error('Error adding guest:', error)
      setMessage('Error adding guest. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadGuests = async () => {
    try {
      const guestsRef = collection(db, 'guests')
      const querySnapshot = await getDocs(guestsRef)
      const guestsList: Guest[] = []

      querySnapshot.forEach((doc) => {
        guestsList.push({
          id: doc.id,
          ...doc.data() as Omit<Guest, 'id'>
        })
      })

      setGuests(guestsList)
    } catch (error) {
      console.error('Error loading guests:', error)
      setMessage('Error loading guests')
    }
  }

  const handleDeleteGuest = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'guests', id))
      setGuests(guests.filter(g => g.id !== id))
      setMessage('Guest deleted successfully!')
    } catch (error) {
      console.error('Error deleting guest:', error)
      setMessage('Error deleting guest')
    }
  }

  const handleShowGuests = async () => {
    setShowGuests(!showGuests)
    if (!showGuests) {
      await loadGuests()
    }
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
          <p className="text-muted-foreground">Manage wedding guest list</p>
        </div>

        {/* Add Guest Form */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Add Guest</h2>
          
          <form onSubmit={handleAddGuest} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Guest Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+94 71 234 5678"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('✓') 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : message.includes('Error')
                  ? 'bg-destructive/10 border border-destructive/20 text-destructive'
                  : 'bg-blue-50 border border-blue-200 text-blue-700'
              }`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg"
            >
              {loading ? 'Adding...' : 'Add Guest'}
            </Button>
          </form>
        </div>

        {/* Guest List */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Guest List</h2>
            <Button
              onClick={handleShowGuests}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg text-sm"
            >
              {showGuests ? 'Hide' : 'Show'} Guests ({guests.length})
            </Button>
          </div>

          {showGuests && guests.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary/30 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{guest.name}</p>
                    <p className="text-sm text-muted-foreground">{guest.phone}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteGuest(guest.id)}
                    className="text-destructive hover:text-destructive/80 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {showGuests && guests.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No guests added yet</p>
          )}
        </div>

        {/* Navigation */}
        <div className="text-center">
          <a
            href="/"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}
