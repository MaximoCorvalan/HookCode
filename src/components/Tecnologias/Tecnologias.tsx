import { useEffect, useRef } from 'react'
import { SiDotnet, SiNodedotjs, SiPython, SiReact, SiSharp, SiTypescript } from 'react-icons/si'
import favicon from '../../assets/Favicon.png'
import './Tecnologias.css'

const technologies = [
  { name: 'React', className: 'tech-node--react', icon: SiReact },
  { name: 'Python', className: 'tech-node--python', icon: SiPython },
  { name: '.NET', className: 'tech-node--dotnet', icon: SiDotnet },
  { name: 'C#', className: 'tech-node--csharp', icon: SiSharp },
  { name: 'Node.js', className: 'tech-node--node', icon: SiNodedotjs },
  { name: 'TypeScript', className: 'tech-node--typescript', icon: SiTypescript },
]

export default function Tecnologias()
{
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const surface = canvas?.parentElement
    const context = canvas?.getContext('2d')
    if (!canvas || !surface || !context) return
    const drawingCanvas = canvas
    const networkSurface = surface
    const drawingContext = context

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let frame = 0
    let previous = 0
    let visible = true
    let nodes: Array<{ x: number; y: number; phase: number; speed: number }> = []

    function draw(step: number) {
      drawingContext.clearRect(0, 0, width, height)
      const centerX = width / 2
      const centerY = height / 2

      const positions = nodes.map((node) => ({
        x: node.x * width + Math.sin(node.phase) * 12,
        y: node.y * height + Math.cos(node.phase) * 9,
      }))

      for (const node of nodes) {
        if (step) node.phase += node.speed * step
      }

      for (let index = 0; index < positions.length; index += 1) {
        for (let nextIndex = index + 1; nextIndex < positions.length; nextIndex += 1) {
          const node = positions[index]
          const next = positions[nextIndex]
          const distance = Math.hypot(node.x - next.x, node.y - next.y)
          drawingContext.strokeStyle = `rgba(24, 91, 88, ${Math.max(0.14, 0.38 - distance / 1800)})`
          drawingContext.lineWidth = 1
          drawingContext.beginPath()
          drawingContext.moveTo(node.x, node.y)
          drawingContext.lineTo(next.x, next.y)
          drawingContext.stroke()
        }

        const node = positions[index]
        drawingContext.strokeStyle = 'rgba(24, 91, 88, 0.34)'
        drawingContext.beginPath()
        drawingContext.moveTo(centerX, centerY)
        drawingContext.lineTo(node.x, node.y)
        drawingContext.stroke()

        drawingContext.fillStyle = 'rgba(0, 156, 140, 0.68)'
        drawingContext.beginPath()
        drawingContext.arc(node.x, node.y, 2.2, 0, Math.PI * 2)
        drawingContext.fill()
      }
    }

    function resize() {
      width = networkSurface.clientWidth
      height = networkSurface.clientHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      drawingCanvas.width = Math.round(width * ratio)
      drawingCanvas.height = Math.round(height * ratio)
      drawingContext.setTransform(ratio, 0, 0, ratio, 0, 0)
      const anchors = [
        [0.09, 0.12], [0.93, 0.17], [0.91, 0.72],
        [0.11, 0.75], [0.02, 0.34], [0.98, 0.40],
      ]
      nodes = anchors.map(([x, y], index) => ({
        x,
        y,
        phase: index * 1.4,
        speed: (index % 2 ? -1 : 1) * (0.025 + index * 0.003),
      }))
      draw(0)
    }

    function animate(time: number) {
      const step = previous ? Math.min((time - previous) / 16.667, 2) : 1
      previous = time
      draw(step)
      frame = requestAnimationFrame(animate)
    }

    function playback() {
      cancelAnimationFrame(frame)
      previous = 0
      if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(animate)
      else draw(0)
    }

    const resizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      playback()
    })
    resizeObserver.observe(surface)
    visibilityObserver.observe(surface)
    motion.addEventListener('change', playback)
    document.addEventListener('visibilitychange', playback)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      motion.removeEventListener('change', playback)
      document.removeEventListener('visibilitychange', playback)
    }
  }, [])

  return (
    <section id="tecnologias" className="home-section technologies-section" aria-labelledby="technologies-title">
      <div className="section-heading technologies-heading">
        <span className="section-heading__number" aria-hidden="true">02 /</span>
        <p className="section-heading__eyebrow">Nuestro stack</p>
        <h2 id="technologies-title">Las herramientas detrás de cada solución.</h2>
        <p className="section-heading__description">
          Combinamos tecnologías confiables para construir productos sólidos, escalables y preparados para crecer.
        </p>
      </div>

      <div className="technology-network" aria-label="Tecnologías que utiliza HookCode">
        <canvas ref={canvasRef} className="technology-network__canvas" aria-hidden="true" />

        <div className="technology-network__center">
          <img src={favicon} alt="Símbolo de HookCode" />
        </div>

        {technologies.map((technology, index) => (
          <span
            className={`tech-node tech-node--${index + 1} ${technology.className}`}
            aria-label={technology.name}
            title={technology.name}
            key={technology.name}
          >
            <technology.icon aria-hidden="true" />
          </span>
        ))}

      </div>

      <div className="technology-list" aria-label="Lista de tecnologías">
        {technologies.map((technology) => (
          <span key={technology.name} title={technology.name} aria-label={technology.name}>
            <technology.icon aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  )
}