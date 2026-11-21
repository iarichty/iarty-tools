import { useEffect } from 'react'
import html from './landing.html?raw'
import './landing.css'
import { initLanding } from './landing'

/** Landing page IARTY Tools. Markup di landing.html, logika animasi di landing.ts. */
export default function Landing() {
  useEffect(() => initLanding(), [])
  return <div className="landing-root" dangerouslySetInnerHTML={{ __html: html }} />
}
