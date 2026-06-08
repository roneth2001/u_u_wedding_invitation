'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!phone.trim()) {
      setError('Please enter your phone number')
      return
    }

    setLoading(true)
    
    try {
      // Navigate to invitation page with phone number
      router.push(`/invitation?phone=${encodeURIComponent(phone)}`)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Animated Header */}
        <div className="mb-12 text-center animate-fade-in space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            💍
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            උදිත කෞශල්‍ය
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-primary">
            &
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            උපේඛා නිල්මිණී
          </h2>
          <p className="text-sm md:text-base text-muted-foreground pt-4">
            are getting married!
          </p>
        </div>

        {/* Divider */}
        <div className="mb-8 h-1 w-16 mx-auto bg-gradient-to-r from-primary via-accent to-primary rounded-full"></div>

        {/* Form Section */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg animate-slide-up">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Find Your Invitation
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Enter Your Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="e.g. 0771234567"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setError('')
                }}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              />
            </div>

            {error && (
              <div className="animate-pulse p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {loading ? 'Loading...' : 'View My Invitation'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            <p>16 October 2026</p>
            <p className="mt-1">Nethmi Reception Hall</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 text-center space-y-3 text-primary/30">
          <div className="flex justify-center gap-2 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>
            ✨
          </div>
          <div className="flex justify-center gap-2 text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
            ✨
          </div>
          <div className="flex justify-center gap-2 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>
            ✨
          </div>
        </div>
      </div>

      <style jsx>{`
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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.7s ease-out 0.2s both;
        }
      `}</style>
    </main>
  )
}
