import { useEffect, useState } from 'react'
import logo from '../../assets/HookCodeLogo-transparent.png'
import ParticleBackground from '../ParticleBackground/ParticleBackground'
import './HookCode.css'

/** Portada de pantalla completa con la identidad original del proyecto. */
export default function HookCode() {
  const [isLeaving, setIsLeaving] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) return
    const timer = window.setTimeout(() => setIsLeaving(true), 3400)
    return () => window.clearTimeout(timer)
  }, [])

  return <section className={`hero${isLeaving ? ' hero--leaving' : ''}`} id="inicio" aria-label="HookCode — Automatizaciones y Desarrollo de Software">
    <ParticleBackground />
    <div className="hero__identity">
      <h1><img src={logo} alt="HookCode" className="hero__logo" /></h1>
      <p>Automatizaciones y Desarrollo de Software</p>
    </div>
    <a href="#servicios" className="hero__scroll" onClick={() => setIsLeaving(true)}><span>Descubrí HookCode</span><span aria-hidden="true">↓</span></a>
  </section>
}

