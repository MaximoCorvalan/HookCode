import { useEffect, useRef } from 'react'
import type { IconType } from 'react-icons'

import {
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiGithub,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSharp,
  SiTypescript,
} from 'react-icons/si'

import favicon from '../../assets/Favicon.png'
import './Tecnologias.css'

type TechnologySize = 'primary' | 'secondary'

type Technology = {
  name: string
  category: string
  icon?: IconType
  wordmark?: string
  x: number
  y: number
  size: TechnologySize
}

type MotionNode = {
  phase: number
  speed: number
}

const technologies: Technology[] = [
  {
    name: 'React',
    category: 'Frontend',
    icon: SiReact,
    x: 0.10,
    y: 0.16,
    size: 'primary',
  },
  {
    name: 'Python',
    category: 'Backend & IA',
    icon: SiPython,
    x: 0.90,
    y: 0.18,
    size: 'primary',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    icon: SiNodedotjs,
    x: 0.94,
    y: 0.48,
    size: 'primary',
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    icon: SiFastapi,
    x: 0.84,
    y: 0.82,
    size: 'primary',
  },
  {
    name: '.NET',
    category: 'Backend',
    icon: SiDotnet,
    x: 0.17,
    y: 0.83,
    size: 'primary',
  },
  {
    name: 'C#',
    category: 'Backend',
    icon: SiSharp,
    x: 0.06,
    y: 0.48,
    size: 'primary',
  },

  {
    name: 'TypeScript',
    category: 'Frontend',
    icon: SiTypescript,
    x: 0.31,
    y: 0.08,
    size: 'secondary',
  },
  {
    name: 'PostgreSQL',
    category: 'Base de datos',
    icon: SiPostgresql,
    x: 0.69,
    y: 0.09,
    size: 'secondary',
  },
  {
    name: 'Docker',
    category: 'Infraestructura',
    icon: SiDocker,
    x: 0.66,
    y: 0.91,
    size: 'secondary',
  },
  {
    name: 'n8n',
    category: 'Automatización',
    wordmark: 'n8n',
    x: 0.36,
    y: 0.91,
    size: 'secondary',
  },
  {
    name: 'GitHub',
    category: 'Desarrollo',
    icon: SiGithub,
    x: 0.09,
    y: 0.69,
    size: 'secondary',
  },
  {
    name: 'Power BI',
    category: 'Datos & Analytics',
    wordmark: 'PBI',
    x: 0.91,
    y: 0.69,
    size: 'secondary',
  },
]

export default function Tecnologias() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const nodeRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    const surface = canvas?.parentElement
    const context = canvas?.getContext('2d')

    if (!canvas || !surface || !context) {
      return
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    /*
     * Mantenemos exactamente el principio del
     * movimiento original:
     *
     * x -> sin()
     * y -> cos()
     *
     * Cada nodo tiene fase y velocidad diferentes.
     */
    const motionNodes: MotionNode[] = technologies.map(
      (_, index) => ({
        phase: index * 1.4,

        speed:
          (index % 2 === 0 ? 1 : -1) *
          (0.025 + index * 0.003),
      }),
    )

    let width = 0
    let height = 0

    let frame = 0
    let previousTime = 0
    let visible = true

    /*
     * Tecnologías principales.
     *
     * Estas seis mantienen la estructura visual
     * de la versión original.
     */
    const primaryIndexes = technologies
      .map((technology, index) => ({
        technology,
        index,
      }))
      .filter(
        ({ technology }) =>
          technology.size === 'primary',
      )
      .map(({ index }) => index)

    function drawLine(
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      opacity: number,
    ) {
      context.strokeStyle =
        `rgba(24, 91, 88, ${opacity})`

      context.lineWidth = 1

      context.beginPath()
      context.moveTo(fromX, fromY)
      context.lineTo(toX, toY)
      context.stroke()
    }

    function draw(step: number) {
      context.clearRect(
        0,
        0,
        width,
        height,
      )

      const centerX = width / 2
      const centerY = height / 2

      /*
       * Calculamos UNA posición animada.
       *
       * Esa misma posición se utiliza:
       *
       * 1. para mover el globo HTML
       * 2. para dibujar las líneas
       *
       * De esta manera jamás se separan.
       */
      const positions = technologies.map(
        (technology, index) => {
          const motion = motionNodes[index]

          const offsetX =
            Math.sin(motion.phase) * 12

          const offsetY =
            Math.cos(motion.phase) * 9

          const x =
            technology.x * width +
            offsetX

          const y =
            technology.y * height +
            offsetY

          const element =
            nodeRefs.current[index]

          if (element) {
            element.style.setProperty(
              '--node-x',
              `${offsetX}px`,
            )

            element.style.setProperty(
              '--node-y',
              `${offsetY}px`,
            )
          }

          return {
            x,
            y,
          }
        },
      )

      /*
       * Avanzamos la animación después de calcular
       * las posiciones del frame actual.
       */
      if (step) {
        for (const motion of motionNodes) {
          motion.phase +=
            motion.speed * step
        }
      }

      /*
       * 1. LINEAS DEL LOGO CENTRAL
       *
       * Todas las tecnologías tienen relación
       * visual con HookCode.
       */
      positions.forEach((position, index) => {
        const opacity =
          technologies[index].size ===
          'primary'
            ? 0.22
            : 0.12

        drawLine(
          centerX,
          centerY,
          position.x,
          position.y,
          opacity,
        )
      })

      /*
       * 2. RED ORIGINAL
       *
       * Las seis tecnologías principales se
       * conectan entre sí como en la primera
       * versión.
       */
      for (
        let current = 0;
        current < primaryIndexes.length;
        current += 1
      ) {
        for (
          let next = current + 1;
          next < primaryIndexes.length;
          next += 1
        ) {
          const currentIndex =
            primaryIndexes[current]

          const nextIndex =
            primaryIndexes[next]

          const first =
            positions[currentIndex]

          const second =
            positions[nextIndex]

          const distance = Math.hypot(
            first.x - second.x,
            first.y - second.y,
          )

          const opacity = Math.max(
            0.08,
            0.20 -
              distance / 4000,
          )

          drawLine(
            first.x,
            first.y,
            second.x,
            second.y,
            opacity,
          )
        }
      }

      /*
       * 3. TECNOLOGÍAS SECUNDARIAS
       *
       * Cada una se conecta con su tecnología
       * principal más cercana.
       *
       * Así agregamos stack sin crear una
       * telaraña de 66 líneas.
       */
      technologies.forEach(
        (technology, index) => {
          if (
            technology.size !==
            'secondary'
          ) {
            return
          }

          let nearestIndex =
            primaryIndexes[0]

          let nearestDistance =
            Number.POSITIVE_INFINITY

          for (
            const primaryIndex of
            primaryIndexes
          ) {
            const distance =
              Math.hypot(
                positions[index].x -
                  positions[
                    primaryIndex
                  ].x,

                positions[index].y -
                  positions[
                    primaryIndex
                  ].y,
              )

            if (
              distance <
              nearestDistance
            ) {
              nearestDistance =
                distance

              nearestIndex =
                primaryIndex
            }
          }

          drawLine(
            positions[index].x,
            positions[index].y,

            positions[nearestIndex].x,
            positions[nearestIndex].y,

            0.13,
          )
        },
      )
    }

    function resize() {
      width = surface.clientWidth
      height = surface.clientHeight

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2,
      )

      canvas.width = Math.round(
        width * pixelRatio,
      )

      canvas.height = Math.round(
        height * pixelRatio,
      )

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0,
      )

      draw(0)
    }

    function animate(time: number) {
      const step = previousTime
        ? Math.min(
            (time - previousTime) /
              16.667,
            2,
          )
        : 1

      previousTime = time

      draw(step)

      frame =
        requestAnimationFrame(animate)
    }

    function playback() {
      cancelAnimationFrame(frame)

      previousTime = 0

      if (
        !reducedMotion.matches &&
        visible &&
        !document.hidden
      ) {
        frame =
          requestAnimationFrame(
            animate,
          )
      } else {
        draw(0)
      }
    }

    const resizeObserver =
      new ResizeObserver(resize)

    const visibilityObserver =
      new IntersectionObserver(
        ([entry]) => {
          visible =
            entry.isIntersecting

          playback()
        },
      )

    resizeObserver.observe(surface)

    visibilityObserver.observe(
      surface,
    )

    reducedMotion.addEventListener(
      'change',
      playback,
    )

    document.addEventListener(
      'visibilitychange',
      playback,
    )

    return () => {
      cancelAnimationFrame(frame)

      resizeObserver.disconnect()
      visibilityObserver.disconnect()

      reducedMotion.removeEventListener(
        'change',
        playback,
      )

      document.removeEventListener(
        'visibilitychange',
        playback,
      )
    }
  }, [])

  return (
    <section
      id="tecnologias"
      className="home-section technologies-section"
      aria-labelledby="technologies-title"
    >
      <div className="section-heading technologies-heading">
        <span
          className="section-heading__number"
          aria-hidden="true"
        >
          03 /
        </span>

        <p className="section-heading__eyebrow">
          Nuestro stack
        </p>

        <h2 id="technologies-title">
          Las herramientas detrás de cada solución.
        </h2>

        <p className="section-heading__description">
          Combinamos tecnologías modernas y confiables
          para construir automatizaciones, productos
          digitales y soluciones de inteligencia artificial.
        </p>
      </div>

      <div
        className="technology-network"
        aria-label="Tecnologías utilizadas por HookCode"
      >
        <canvas
          ref={canvasRef}
          className="technology-network__canvas"
          aria-hidden="true"
        />

        <div className="technology-network__center">
          <img
            src={favicon}
            alt="HookCode"
          />
        </div>

        {technologies.map(
          (technology, index) => {
            const Icon =
              technology.icon

            return (
              <div
                ref={(element) => {
                  nodeRefs.current[
                    index
                  ] = element
                }}
                key={technology.name}
                className="tech-node"
                style={{
                  left:
                    `${technology.x * 100}%`,
                  top:
                    `${technology.y * 100}%`,
                }}
              >
                <div
                  className={`tech-node__bubble tech-node__bubble--${technology.size}`}
                  tabIndex={0}
                  aria-label={`${technology.name}. ${technology.category}`}
                >
                  {Icon ? (
                    <Icon
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="tech-node__wordmark">
                      {
                        technology.wordmark
                      }
                    </span>
                  )}

                  <div
                    className="tech-tooltip"
                    role="tooltip"
                  >
                    <strong>
                      {technology.name}
                    </strong>

                    <span>
                      {
                        technology.category
                      }
                    </span>
                  </div>
                </div>
              </div>
            )
          },
        )}
      </div>

      <div
        className="technology-list"
        aria-label="Lista de tecnologías"
      >
        {technologies.map(
          (technology) => {
            const Icon =
              technology.icon

            return (
              <div
                className="technology-list__item"
                key={technology.name}
              >
                <div className="technology-list__icon">
                  {Icon ? (
                    <Icon
                      aria-hidden="true"
                    />
                  ) : (
                    <span>
                      {
                        technology.wordmark
                      }
                    </span>
                  )}
                </div>

                <div className="technology-list__content">
                  <strong>
                    {
                      technology.name
                    }
                  </strong>

                  <span>
                    {
                      technology.category
                    }
                  </span>
                </div>
              </div>
            )
          },
        )}
      </div>
    </section>
  )
}