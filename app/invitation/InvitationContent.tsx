'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

interface Guest {
  id: string
  phone: string
  name: string
  createdAt?: string
}

export default function InvitationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [guest, setGuest] = useState<Guest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState({ d: '--', h: '--', m: '--', s: '--' })

  useEffect(() => {
    const fetchGuest = async () => {
      const phone = searchParams.get('phone')
      if (!phone) { setError('Phone number not provided'); setLoading(false); return }
      try {
        const guestsRef = collection(db, 'guests')
        const q = query(guestsRef, where('phone', '==', phone))
        const snap = await getDocs(q)
        if (snap.empty) {
          setError('Phone number not found in our guest list. Please check and try again.')
        } else {
          const doc = snap.docs[0]
          setGuest({ id: doc.id, ...doc.data() as Omit<Guest, 'id'> })
        }
      } catch (err) {
        console.error(err)
        setError('An error occurred. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchGuest()
  }, [searchParams])

  useEffect(() => {
    const target = new Date('2026-10-16T10:22:00')
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now())
      setCountdown({
        d: String(Math.floor(diff / 864e5)).padStart(2, '0'),
        h: String(Math.floor((diff % 864e5) / 36e5)).padStart(2, '0'),
        m: String(Math.floor((diff % 36e5) / 6e4)).padStart(2, '0'),
        s: String(Math.floor((diff % 6e4) / 1e3)).padStart(2, '0'),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (loading) return (
    <main className="inv-page">
      <div className="inv-loading">
        <div className="inv-spinner" />
        <p className="inv-loading-txt">Loading your invitation…</p>
      </div>
      <InvStyles />
    </main>
  )

  if (error) return (
    <main className="inv-page">
      <div className="inv-error">
        <div className="inv-error-orn">✦</div>
        <p className="inv-error-msg">{error}</p>
        <button className="btn-gold" onClick={() => router.push('/')}>Go Back</button>
      </div>
      <InvStyles />
    </main>
  )

  if (!guest) return null

  return (
    <main className="inv-page">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="bokeh" aria-hidden>
          {[1,2,3,4,5,6].map(n => <div key={n} className={`bk b${n}`} />)}
        </div>
        <FloralSVG className="floral-tl" />
        <FloralSVG className="floral-tr" flip="x" />
        <FloralSVG className="floral-bl" flip="y" />
        <FloralSVG className="floral-br" flip="xy" />
        <p className="hero-subtitle">Wedding Invitation</p>
        <Ornament />
        <div className="hero-names">
          <h1 className="hero-name">උදිත කෞශල්‍ය</h1>
          <span className="hero-amp">&amp;</span>
          <h1 className="hero-name">උපේඛා නිල්මිණී</h1>
        </div>
        <Ornament style={{ marginTop: 16 }} />
      </section>

      {/* ── DIVIDER ── */}
      <div className="divider-sec">
        <Ornament />
        <h2 className="div-title">Meet the Happy Couple</h2>
        <p className="div-sub">Two souls, one journey — celebrating love in the most beautiful way</p>
      </div>

      {/* ── COUPLE CARD ── */}
      <div className="couple-card">
        <div className="cc-img-wrap">
          <span className="cc-label">A Love Story</span>
          <svg width="160" height="100" viewBox="0 0 160 100" aria-hidden="true">
            <circle cx="60" cy="50" r="38" fill="none" stroke="#e8c97a" strokeWidth="2" opacity=".5"/>
            <circle cx="100" cy="50" r="38" fill="none" stroke="#e8c97a" strokeWidth="2" opacity=".5"/>
            <circle cx="60" cy="50" r="28" fill="rgba(252,232,208,.4)" stroke="#c9973a" strokeWidth="1"/>
            <circle cx="100" cy="50" r="28" fill="rgba(252,224,232,.4)" stroke="#d4537e" strokeWidth="1"/>
            <text x="60" y="55" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fill="#c9973a" opacity=".7">U</text>
            <text x="100" y="55" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fill="#d4537e" opacity=".7">U</text>
          </svg>
        </div>
        <div className="cc-body">
          <p className="cc-about">About</p>
          <h3 className="cc-heading">Our Love Story</h3>
          <p className="cc-text">What began as a chance meeting blossomed into a love that fills every corner of our lives. We are overjoyed to begin this new chapter together, surrounded by those we cherish most.</p>
        </div>
      </div>

      {/* ── DIAMOND INVITATION ── */}
      <section className="diamond-section">
        <div className="bokeh" aria-hidden>
          <div className="bk b1" /><div className="bk b3" /><div className="bk b5" />
        </div>
        <SmallFloral className="ds-fl ds-fl-tl" />
        <SmallFloral className="ds-fl ds-fl-tr" flip="x" />
        <SmallFloral className="ds-fl ds-fl-bl" flip="y" />
        <SmallFloral className="ds-fl ds-fl-br" flip="xy" />
        <div className="diamond-wrap">
          <div className="diamond-outer" />
          <div className="diamond-inner" />
          <div className="diamond-content">
            <div className="di-script">උදිත</div>
            <span className="di-amp">&amp;</span>
            <div className="di-script">උපේඛා</div>
            <div className="di-venue">Nethmi Reception Hall</div>
            <div className="di-addr">Matara, Sri Lanka</div>
          </div>
        </div>
      </section>

      {/* ── GUEST ── */}
      <div className="guest-sec">
        <p className="gs-label">Dear Guest</p>
        <p className="gs-name">{guest.name}</p>
        <p className="gs-copy">
          Together with our families, we joyfully request the honour of your presence
          to witness and celebrate our union.
        </p>
      </div>

      {/* ── COUNTDOWN ── */}
      <div className="countdown-sec">
        <div className="cd-title-wrap">
          <Ornament />
          <h2 className="cd-heading">Count Down</h2>
          <p className="cd-sub">The big day is almost here — we can&apos;t wait to see you!</p>
        </div>
        <div className="cd-grid">
          {[
            { val: countdown.d, lbl: 'Days' },
            { val: countdown.h, lbl: 'Hours' },
            { val: countdown.m, lbl: 'Minutes' },
            { val: countdown.s, lbl: 'Seconds' },
          ].map(({ val, lbl }) => (
            <div className="cd-cell" key={lbl}>
              <span className="cd-num">{val}</span>
              <span className="cd-lbl">{lbl}</span>
            </div>
          ))}
        </div>
        <div className="cd-meta">
          <span className="cd-loc"><span className="cd-dot" />Nethmi Reception Hall, Matara</span>
          <span className="cd-date"><span className="cd-dot" />16th October 2026 — 10:22 AM</span>
        </div>
      </div>

      {/* ── MAP ── */}
      <div className="map-wrap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.052661980399!2d80.0247909!3d7.234833899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e3e43d2f112d%3A0xfda3d9365c110e56!2sNethmi%20Reception%20Hall!5e0!3m2!1sen!2slk!4v1780824371366!5m2!1sen!2slk"
          loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
          title="Venue map" style={{ width:'100%',height:'100%',border:0,display:'block',pointerEvents:'none' }}
        />
        <div className="map-overlay">
          <a className="map-pill" href="https://maps.google.com/?q=7.234833,80.024790" target="_blank" rel="noopener noreferrer">
            Open in Maps
          </a>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="inv-footer">
        <p className="footer-msg">Your presence and blessings will make our day truly complete.<br />We look forward to celebrating with you.</p>
        <p className="footer-sig">With Love</p>
        <div className="footer-hearts">
          <span className="fh-line" /><span className="fh-heart">♥</span>
          <span className="fh-heart">♥</span><span className="fh-heart">♥</span>
          <span className="fh-line" />
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-wrap">
        <button className="btn-gold" onClick={() => router.push('/')}>Check Another Invitation</button>
        <p className="cta-note">Thank you for being part of our special day</p>
      </div>

      <InvStyles />
    </main>
  )
}

function Ornament({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="gold-ornament" style={style}>
      <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
    </div>
  )
}

function FloralSVG({ className, flip }: { className: string; flip?: string }) {
  const tx = flip?.includes('x') ? 'scaleX(-1)' : ''
  const ty = flip?.includes('y') ? ' scaleY(-1)' : ''
  return (
    <svg className={className} viewBox="0 0 90 90" fill="none" style={{ transform: tx + ty }} aria-hidden="true">
      <path d="M5 85 Q5 5 85 5" stroke="#c9973a" strokeWidth="0.8" fill="none" opacity=".4"/>
      <path d="M5 70 Q5 5 70 5" stroke="#c9973a" strokeWidth="0.5" fill="none" opacity=".3"/>
      <ellipse cx="28" cy="28" rx="14" ry="8" fill="#fce8d0" stroke="#c9973a" strokeWidth="0.6" opacity=".6" transform="rotate(-45 28 28)"/>
      <ellipse cx="14" cy="42" rx="10" ry="6" fill="#fce8d0" stroke="#c9973a" strokeWidth="0.6" opacity=".5" transform="rotate(-60 14 42)"/>
      <circle cx="28" cy="28" r="3" fill="#c9973a" opacity=".6"/>
      <ellipse cx="46" cy="18" rx="8" ry="5" fill="#fce0e8" stroke="#d4537e" strokeWidth="0.5" opacity=".5" transform="rotate(-30 46 18)"/>
      <circle cx="46" cy="18" r="2" fill="#d4537e" opacity=".5"/>
    </svg>
  )
}

function SmallFloral({ className, flip }: { className: string; flip?: string }) {
  const tx = flip?.includes('x') ? 'scaleX(-1)' : ''
  const ty = flip?.includes('y') ? ' scaleY(-1)' : ''
  return (
    <svg className={className} width="70" height="70" viewBox="0 0 70 70" style={{ transform: tx + ty }} aria-hidden="true">
      <ellipse cx="20" cy="20" rx="16" ry="9" fill="#fce8d0" stroke="#c9973a" strokeWidth="0.7" opacity=".7" transform="rotate(-40 20 20)"/>
      <circle cx="20" cy="20" r="3.5" fill="#c9973a" opacity=".7"/>
      <ellipse cx="38" cy="10" rx="10" ry="6" fill="#fce0e8" stroke="#d4537e" strokeWidth="0.6" opacity=".6" transform="rotate(-20 38 10)"/>
      <path d="M5 60 Q8 30 35 8" stroke="#c9973a" strokeWidth="0.7" fill="none" opacity=".4"/>
    </svg>
  )
}

function InvStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap');
      :root {
        --gold:#c9973a;--gold2:#e8c97a;--gold3:#f5e8cc;
        --rose:#d4537e;--ink:#1a1210;--inkm:#4a3828;--inks:#8a7060;--cream:#fefcf8;
      }
      *{box-sizing:border-box;margin:0;padding:0}
      .inv-page{display:flex;flex-direction:column;align-items:stretch;background:var(--cream);font-family:'Jost',sans-serif;min-height:100svh}

      /* Hero */
      .hero{position:relative;min-height:400px;background:linear-gradient(175deg,#deeef8 0%,#eaf4fa 40%,#f5eef8 70%,#fce8ee 100%);overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 24px 50px}
      .bokeh{position:absolute;inset:0;pointer-events:none}
      .bk{position:absolute;border-radius:50%;background:rgba(255,255,255,.55)}
      .b1{width:120px;height:120px;top:-30px;left:-40px;animation:float1 7s ease-in-out infinite}
      .b2{width:80px;height:80px;top:20px;right:10px;animation:float2 9s ease-in-out infinite}
      .b3{width:160px;height:160px;top:60px;left:20px;animation:float1 11s ease-in-out infinite .5s}
      .b4{width:60px;height:60px;bottom:60px;right:30px;animation:float2 8s ease-in-out infinite 1s}
      .b5{width:100px;height:100px;bottom:20px;left:-20px;animation:float1 10s ease-in-out infinite 2s}
      .b6{width:50px;height:50px;top:50%;right:-10px;animation:float2 6s ease-in-out infinite .3s}
      @keyframes float1{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-18px) scale(1.05)}}
      @keyframes float2{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(14px) scale(.95)}}
      .floral-tl,.floral-tr,.floral-bl,.floral-br{position:absolute;width:90px;height:90px;pointer-events:none}
      .floral-tl{top:0;left:0}.floral-tr{top:0;right:0}.floral-bl{bottom:0;left:0}.floral-br{bottom:0;right:0}
      .hero-subtitle{font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:var(--inks);margin-bottom:8px;animation:fadeDown .9s .15s both}
      @keyframes fadeDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
      .gold-ornament{display:flex;align-items:center;gap:8px;margin:6px 0;animation:fadeIn .9s .25s both}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      .orn-line{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--gold2),transparent)}
      .orn-diamond{width:6px;height:6px;background:var(--gold);transform:rotate(45deg)}
      .hero-names{text-align:center;animation:fadeUp .9s .2s both}
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      .hero-name{font-family:'Cormorant Garamond',serif;font-size:clamp(24px,7vw,34px);font-weight:300;color:var(--ink);line-height:1.25}
      .hero-amp{font-family:'Great Vibes',cursive;font-size:32px;color:var(--rose);display:block;margin:4px 0}

      /* Divider */
      .divider-sec{display:flex;flex-direction:column;align-items:center;padding:28px 24px 20px;background:#fff;gap:8px}
      .div-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:var(--ink);text-align:center}
      .div-sub{font-size:12px;color:var(--inks);text-align:center;line-height:1.7;font-weight:300;max-width:280px}

      /* Couple card */
      .couple-card{margin:0 16px 8px;background:#fff;border:1px solid rgba(201,151,58,.2);border-radius:16px;overflow:hidden;animation:fadeUp .8s .3s both}
      .cc-img-wrap{height:180px;background:linear-gradient(135deg,#f0e0e8 0%,#e8d8f0 50%,#d8e8f0 100%);display:flex;align-items:center;justify-content:center;position:relative}
      .cc-label{position:absolute;top:12px;left:12px;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:500}
      .cc-body{padding:18px 20px}
      .cc-about{font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--rose);margin-bottom:6px;font-weight:500}
      .cc-heading{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:var(--ink);margin-bottom:10px}
      .cc-text{font-size:12px;color:var(--inks);line-height:1.8;font-weight:300}

      /* Diamond */
      .diamond-section{position:relative;padding:50px 24px;background:linear-gradient(175deg,#deeef8 0%,#eaf4fa 40%,#f0eaf8 70%,#fce8ee 100%);overflow:hidden;display:flex;align-items:center;justify-content:center}
      .ds-fl{position:absolute;pointer-events:none;z-index:1}
      .ds-fl-tl{top:8px;left:8px}.ds-fl-tr{top:8px;right:8px}.ds-fl-bl{bottom:8px;left:8px}.ds-fl-br{bottom:8px;right:8px}
      .diamond-wrap{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;width:260px;height:260px;animation:spinIn .9s .4s both}
      @keyframes spinIn{from{opacity:0;transform:rotate(-10deg) scale(.8)}to{opacity:1;transform:rotate(0) scale(1)}}
      .diamond-outer{position:absolute;inset:0;border:2px solid var(--gold);transform:rotate(45deg);border-radius:8px}
      .diamond-inner{position:absolute;inset:14px;border:1px solid rgba(201,151,58,.4);transform:rotate(45deg);border-radius:4px}
      .diamond-content{position:relative;text-align:center;padding:20px}
      .di-script{font-family:'Cormorant Garamond',serif;font-size:clamp(24px,8vw,36px);font-weight:300;font-style:italic;color:var(--ink);line-height:1.1}
      .di-amp{font-family:'Great Vibes',cursive;font-size:24px;color:var(--gold);display:block;margin:2px 0}
      .di-venue{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--inkm);margin-top:12px;font-weight:500}
      .di-addr{font-size:11px;color:var(--inks);font-weight:300;margin-top:3px}

      /* Guest */
      .guest-sec{padding:28px 24px 24px;background:#fff;text-align:center;border-top:1px solid rgba(201,151,58,.1)}
      .gs-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--inks);margin-bottom:8px;font-weight:500}
      .gs-name{font-family:'Great Vibes',cursive;font-size:clamp(32px,10vw,44px);color:var(--rose);margin-bottom:10px;animation:fadeUp .8s .5s both}
      .gs-copy{font-size:12px;color:var(--inks);line-height:1.8;font-weight:300;max-width:300px;margin:0 auto}

      /* Countdown */
      .countdown-sec{padding:32px 24px;background:var(--cream);text-align:center;border-top:1px solid rgba(201,151,58,.1)}
      .cd-title-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;margin-bottom:24px}
      .cd-heading{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--ink);font-weight:400}
      .cd-sub{font-size:11px;color:var(--inks);font-weight:300;max-width:260px}
      .cd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:340px;margin:0 auto 20px}
      .cd-cell{background:#fff;border:1px solid rgba(201,151,58,.25);border-radius:12px;padding:14px 6px 10px;display:flex;flex-direction:column;align-items:center;gap:4px;animation:pulse 2s ease-in-out infinite}
      @keyframes pulse{0%,100%{border-color:rgba(201,151,58,.25)}50%{border-color:rgba(201,151,58,.65)}}
      .cd-cell:nth-child(2){animation-delay:.3s}.cd-cell:nth-child(3){animation-delay:.6s}.cd-cell:nth-child(4){animation-delay:.9s}
      .cd-num{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;color:var(--gold);line-height:1}
      .cd-lbl{font-family:'Great Vibes',cursive;font-size:13px;color:var(--inks)}
      .cd-meta{display:flex;flex-direction:column;align-items:center;gap:5px;margin-top:4px}
      .cd-loc,.cd-date{font-size:11px;color:var(--inks);font-weight:300;display:flex;align-items:center;gap:5px}
      .cd-dot{width:4px;height:4px;background:var(--gold);border-radius:50%;display:inline-block;flex-shrink:0}

      /* Map */
      .map-wrap{position:relative;height:165px;overflow:hidden;border-top:1px solid rgba(201,151,58,.1)}
      .map-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(26,18,16,.55) 0%,transparent 55%);display:flex;align-items:flex-end;justify-content:center;padding-bottom:14px}
      .map-pill{background:var(--gold);border-radius:20px;padding:7px 20px;font-size:11px;font-weight:500;color:#fff;letter-spacing:.1em;text-transform:uppercase;text-decoration:none}

      /* Footer */
      .inv-footer{padding:24px;background:#fff;text-align:center;border-top:1px solid rgba(201,151,58,.1)}
      .footer-msg{font-size:12px;color:var(--inks);line-height:1.8;font-weight:300;margin-bottom:14px}
      .footer-sig{font-family:'Great Vibes',cursive;font-size:24px;color:var(--rose)}
      .footer-hearts{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:12px}
      .fh-line{flex:1;max-width:50px;height:1px;background:linear-gradient(90deg,transparent,rgba(201,151,58,.3),transparent)}
      .fh-heart{font-size:11px;color:var(--rose)}

      /* CTA */
      .cta-wrap{padding:20px 16px 48px;background:var(--cream);display:flex;flex-direction:column;align-items:center;gap:10px}
      .btn-gold{width:100%;max-width:400px;padding:15px 24px;background:var(--gold);border:none;border-radius:14px;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#fff;cursor:pointer;transition:background .2s,transform .1s}
      .btn-gold:hover{background:#a87a28}.btn-gold:active{transform:scale(.98)}
      .cta-note{font-size:12px;color:var(--inks);font-weight:300}

      /* Loading / Error */
      .inv-loading,.inv-error{min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px 24px;text-align:center}
      .inv-spinner{width:32px;height:32px;border:2px solid var(--gold3);border-top-color:var(--gold);border-radius:50%;animation:spin .9s linear infinite}
      @keyframes spin{to{transform:rotate(360deg)}}
      .inv-loading-txt,.cta-note{font-size:12px;color:var(--inks);font-weight:300;letter-spacing:.06em}
      .inv-error-orn{font-size:22px;color:var(--gold)}
      .inv-error-msg{font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--ink);line-height:1.5;max-width:300px}

      /* Responsive */
      @media(max-width:340px){
        .cd-grid{grid-template-columns:repeat(2,1fr)}
      }
    `}</style>
  )
}