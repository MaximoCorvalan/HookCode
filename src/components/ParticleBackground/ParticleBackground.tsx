import { useEffect, useRef } from 'react'
import type { Particle, ParticlePointer } from '../../interfaces/Particle'
import './ParticleBackground.css'

/** Canvas decorativo: anima sin provocar un render de React por cuadro. */
export default function ParticleBackground() {
  // Referencia al canvas real: permite dibujar sin almacenar cada cuadro en estado React.
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Inicializa la simulación después del montaje y libera todos sus recursos al salir.
  useEffect(() => {
    const canvas = canvasRef.current
    const surface = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !surface || !ctx) return
    // La preferencia del sistema afecta únicamente a la animación de las partículas.
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer: ParticlePointer = { x: 0, y: 0, active: false }
    // Datos mutables de la simulación; frame guarda la solicitud de animación pendiente.
    let nodes: Particle[] = []
    let width = 0, height = 0, frame = 0, previous = 0
    let visible = true

    /** Avanza la simulación y dibuja nodos y conexiones. step=0 dibuja sin mover. */
    function draw(step: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const node of nodes) {
        if (!step) continue
        node.x += node.vx * step
        node.y += node.vy * step
        // La repulsión pierde intensidad con la distancia al puntero.
        const dx = node.x - pointer.x, dy = node.y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (pointer.active && distance > 0 && distance < 150) {
          const force = (1 - distance / 150) * 1.8 * step
          node.x += dx / distance * force
          node.y += dy / distance * force
        }
        // Invierte la velocidad al tocar un borde y mantiene el nodo dentro del canvas.
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))
      }
      // Compara cada par una sola vez; une nodos hasta 150 px y atenúa según distancia.
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const next = nodes[j]
          const distance = Math.hypot(node.x - next.x, node.y - next.y)
          if (distance > 150) continue
          ctx.strokeStyle = `rgba(0,151,135,${(1 - distance / 175) * 0.28})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(next.x, next.y)
          ctx.stroke()
        }
        // Dibuja el punto sobre las conexiones ya trazadas para este nodo.
        ctx.fillStyle = 'rgba(0,156,140,0.5)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    /** Ajusta resolución y escala al contenedor y vuelve a generar la red. */
    function resize() {
      if (!canvas || !ctx || !surface) return
      width = surface.clientWidth
      height = surface.clientHeight
      // Limitar resolución y cantidad de nodos reduce el costo en móviles.
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      // Cantidad proporcional al área: entre 24 y el límite móvil/escritorio.
      const maxParticles = width <= 600 ? 85 : 425
      nodes = Array.from({ length: Math.min(maxParticles, Math.max(24, Math.floor(width * height / 3000))) }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.36, vy: (Math.random() - 0.5) * 0.36,
        radius: 1.5 + Math.random() * 2,
      }))
      draw(0)
    }
    /** Bucle requestAnimationFrame; time es la marca temporal del navegador en ms. */
    function animate(time: number) {
      // Velocidad independiente de la frecuencia de actualización de la pantalla.
      const step = previous ? Math.min((time - previous) / 16.667, 2) : 1
      previous = time
      draw(step)
      frame = requestAnimationFrame(animate)
    }
    /** Detiene el cuadro pendiente y reinicia solo si la portada puede animarse. */
    function playback() {
      cancelAnimationFrame(frame)
      previous = 0
      // Respetar accesibilidad y pausar cuando la portada no está visible.
      if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(animate)
      else draw(0)
    }
    /** Convierte el puntero a coordenadas locales; el tacto no activa la repulsión. */
    function move(event: PointerEvent) {
      if (!surface) return
      const bounds = surface.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = event.pointerType !== 'touch'
    }
    /** Desactiva la fuerza del cursor cuando abandona la portada. */
    function leave() { pointer.active = false }
    // Observa tamaño y visibilidad sin medir continuamente durante el render de React.
    const resizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; playback() })
    resizeObserver.observe(surface)
    visibilityObserver.observe(surface)
    // Registra la interacción y los cambios de visibilidad/preferencias.
    surface.addEventListener('pointermove', move)
    surface.addEventListener('pointerleave', leave)
    motion.addEventListener('change', playback)
    document.addEventListener('visibilitychange', playback)
    // Liberar recursos al desmontar; también evita duplicados en StrictMode.
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      surface.removeEventListener('pointermove', move)
      surface.removeEventListener('pointerleave', leave)
      motion.removeEventListener('change', playback)
      document.removeEventListener('visibilitychange', playback)
    }
  }, [])
  // Es decorativo: aria-hidden evita anunciar el canvas a lectores de pantalla.
  return <canvas ref={canvasRef} className="particle-background" aria-hidden="true" />
}
