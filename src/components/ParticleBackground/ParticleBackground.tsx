import { useEffect, useRef } from 'react'
import type { Particle, ParticlePointer } from '../../interfaces/Particle'
import './ParticleBackground.css'

/** Canvas decorativo: anima sin provocar un render de React por cuadro. */
export default function ParticleBackground({ connectLogos = false }: { connectLogos?: boolean }) {
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
    let restingPositions: Array<{ x: number; y: number }> = []
    let elapsed = 0
    let anchors: Array<{ x: number; y: number; radius: number }> = []
    let width = 0, height = 0, frame = 0, previous = 0
    let visible = true

    /** Avanza la simulación y dibuja nodos y conexiones. step=0 dibuja sin mover. */
    function draw(step: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      elapsed += step
      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index]
        if (!step) continue
        if (connectLogos) {
          const origin = restingPositions[index]
          const targetX = origin.x + Math.sin(elapsed * 0.006 + index * 2.4) * 12
          const targetY = origin.y + Math.cos(elapsed * 0.005 + index * 1.7) * 12
          node.x += (targetX - node.x) * 0.025 * step
          node.y += (targetY - node.y) * 0.025 * step
        }
        node.x += node.vx * step
        node.y += node.vy * step
        // La repulsión pierde intensidad con la distancia al puntero.
        const dx = node.x - pointer.x, dy = node.y - pointer.y
        const distance = Math.hypot(dx, dy)
        const pointerRange = connectLogos ? 90 : 150
        if (pointer.active && distance > 0 && distance < pointerRange) {
          const force = (1 - distance / pointerRange) * (connectLogos ? 0.35 : 1.8) * step
          node.x += dx / distance * force
          node.y += dy / distance * force
        }
        // Invierte la velocidad al tocar un borde y mantiene el nodo dentro del canvas.
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))
      }
      // Separacion suave entre particulas para evitar grupos demasiado apretados.
      if (connectLogos && step) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const first = nodes[i], second = nodes[j]
            const dx = second.x - first.x, dy = second.y - first.y
            const distance = Math.hypot(dx, dy)
            if (distance >= 42 || distance === 0) continue
            const force = (1 - distance / 42) * 0.3 * step
            const offsetX = dx / distance * force, offsetY = dy / distance * force
            first.x = Math.max(0, Math.min(width, first.x - offsetX))
            first.y = Math.max(0, Math.min(height, first.y - offsetY))
            second.x = Math.max(0, Math.min(width, second.x + offsetX))
            second.y = Math.max(0, Math.min(height, second.y + offsetY))
          }
        }
      }
      // Los logos son v?rtices de la misma red: participan en las conexiones locales.
      const points = [...nodes, ...anchors]
      // Atenuar al acercarse a un logo evita que puntos y lineas desaparezcan de golpe.
      const visibility = points.map((point, index) => index >= nodes.length ? 1 : anchors.reduce(
        (opacity, anchor) => Math.min(opacity, Math.max(0, Math.min(1,
          (Math.hypot(point.x - anchor.x, point.y - anchor.y) - anchor.radius - 3) / 18,
        ))), 1,
      ))
      for (let i = 0; i < points.length; i++) {
        const node = points[i]
        const isLogo = i >= nodes.length
        if (visibility[i] === 0) continue
        for (let j = i + 1; j < points.length; j++) {
          const next = points[j]
          const nextIsLogo = j >= nodes.length
          if (visibility[j] === 0) continue
          const dx = next.x - node.x, dy = next.y - node.y
          const distance = Math.hypot(dx, dy)
          const fromRadius = isLogo ? node.radius : 0
          const toRadius = nextIsLogo ? next.radius : 0
          const gap = distance - fromRadius - toRadius
          const connectionRange = connectLogos ? 200 : 150
          if (gap > connectionRange || gap <= 0 || distance === 0) continue
          const fade = connectLogos ? Math.min(1, (connectionRange - gap) / 75) : 1 - gap / 175
          ctx.strokeStyle = `rgba(0,151,135,${fade * (isLogo || nextIsLogo ? 0.32 : 0.28) * visibility[i] * visibility[j]})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(node.x + dx / distance * fromRadius, node.y + dy / distance * fromRadius)
          ctx.lineTo(next.x - dx / distance * toRadius, next.y - dy / distance * toRadius)
          ctx.stroke()
        }
        if (isLogo) continue
        ctx.fillStyle = `rgba(0,156,140,${0.5 * visibility[i]})`
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
      const bounds = surface.getBoundingClientRect()
      anchors = connectLogos
        ? Array.from(surface.querySelectorAll<HTMLElement>('[data-network-anchor]'), element => {
          const rect = element.getBoundingClientRect()
          return { x: rect.left - bounds.left + rect.width / 2, y: rect.top - bounds.top + rect.height / 2, radius: element.offsetWidth / 2 }
        })
        : []
      // Limitar resolución y cantidad de nodos reduce el costo en móviles.
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      // Cantidad proporcional al área: entre 24 y el límite móvil/escritorio.
      const maxParticles = connectLogos ? (width <= 600 ? 38 : 105) : (width <= 600 ? 85 : 425)
      const areaPerParticle = connectLogos ? 7500 : 3000
      const count = Math.min(maxParticles, Math.max(24, Math.floor(width * height / areaPerParticle)))
      nodes = []
      elapsed = 0
      for (let index = 0; index < count; index++) {
        let position = { x: Math.random() * width, y: Math.random() * height }
        if (connectLogos) {
          // Elegir el espacio mas libre mantiene una red organica sin grandes huecos.
          let bestClearance = -Infinity
          for (let attempt = 0; attempt < 60; attempt++) {
            const candidate = { x: 8 + Math.random() * Math.max(0, width - 16), y: 8 + Math.random() * Math.max(0, height - 16) }
            const clearance = Math.min(
              ...nodes.map(node => Math.hypot(candidate.x - node.x, candidate.y - node.y)),
              ...anchors.map(anchor => Math.hypot(candidate.x - anchor.x, candidate.y - anchor.y) - anchor.radius - 18),
            )
            if (clearance > bestClearance) {
              bestClearance = clearance
              position = candidate
            }
          }
        }
        nodes.push({
          ...position,
          vx: (Math.random() - 0.5) * 0.36, vy: (Math.random() - 0.5) * 0.36,
          radius: 1.5 + Math.random() * 2,
        })
      }
      restingPositions = nodes.map(({ x, y }) => ({ x, y }))
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
  }, [connectLogos])
  // Es decorativo: aria-hidden evita anunciar el canvas a lectores de pantalla.
  return <canvas ref={canvasRef} className="particle-background" aria-hidden="true" />
}
