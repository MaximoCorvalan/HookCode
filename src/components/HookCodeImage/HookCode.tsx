import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/HookCodeLogo-transparent.png'
import ParticleBackground from '../ParticleBackground/ParticleBackground'
import './HookCode.css'

/** La entrada comienza cuando el logo está decodificado, incluso si viene de caché. */
export default function HookCode() {
  // Referencia de imagen y estados que activan las clases CSS de entrada y salida.
  const imageRef = useRef<HTMLImageElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  // Espera la decodificación y evita actualizar estado si se desmonta el componente.
  useEffect(() => {
    const image = imageRef.current
    if (!image) return
    let cancelled = false
    // decode espera tanto la descarga como la preparación de los píxeles.
    // Si falla, liberamos la portada igualmente para no bloquear la navegación.
    /** Desbloquea las animaciones cuando termina la preparación de la imagen. */
    const ready = () => { if (!cancelled) setIsReady(true) }
    image.decode().then(ready, ready)
    // Cancela lógicamente la promesa: decode no ofrece una operación de aborto.
    return () => { cancelled = true }
  }, [])

  // Programa la salida automática una vez que el logo está listo.
  useEffect(() => {
    if (!isReady) return
    // Contar la permanencia desde la entrada visible, no desde el montaje de React.
    const timer = window.setTimeout(() => setIsLeaving(true), 3400)
    return () => window.clearTimeout(timer)
  }, [isReady])

  // ready libera la entrada CSS; leaving dispara el cierre de la portada.
  return <section className={`hero${isReady ? ' hero--ready' : ''}${isLeaving ? ' hero--leaving' : ''}`} id="inicio" aria-label="HookCode — Automatizaciones y Desarrollo de Software">
    <ParticleBackground />
    {/* Las dimensiones reservan la proporción del logo antes de su descarga. */}
    <div className="hero__identity">
      <h1><img ref={imageRef} src={logo} alt="HookCode" className="hero__logo" loading='lazy' width={2048} height={768} fetchPriority="high" /></h1>
      <p>Automatizaciones y Desarrollo de Software</p>
    </div>
    {/* Permite adelantar el cierre y navegar a Servicios mediante un enlace nativo. */}
    <a href="#servicios" className="hero__scroll" onClick={() => setIsLeaving(true)}><span>Descubrí HookCode</span><span aria-hidden="true">↓</span></a>
  </section>
}
