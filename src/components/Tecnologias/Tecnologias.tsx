import ParticleBackground from '../ParticleBackground/ParticleBackground'
import favicon from '../../assets/Favicon.png'
import { technologiesData } from '../../MockData/technologydata'
import './Tecnologias.css'

export default function Tecnologias() {
  return (
    <section
      id="tecnologias"
      className="home-section technologies-section"
      aria-labelledby="technologies-title"
    >
      <div className="section-heading technologies-heading">
    

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
        <ParticleBackground connectLogos />

        <div className="technology-network__center" data-network-anchor>
          <img
            src={favicon}
            alt="HookCode"
          />
        </div>

        {technologiesData.map(
          (technology) => {
            const Icon =
              technology.icon

            return (
              <div
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
                  style={{ color: technology.color }}
                  data-network-anchor
                  tabIndex={0}
                  aria-label={`${technology.name}. ${technology.category}`}
                >
                  {technology.image ? (
                    <img src={technology.image} alt="" aria-hidden="true" />
                  ) : Icon ? (
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
                <span className="tech-node__name" aria-hidden="true">
                  {technology.name}
                </span>
              </div>
            )
          },
        )}
      </div>

      <div
        className="technology-list"
        aria-label="Lista de tecnologías"
      >
        {technologiesData.map(
          (technology) => {
            const Icon =
              technology.icon

            return (
              <div
                className="technology-list__item"
                key={technology.name}
              >
                <div className="technology-list__icon" style={{ color: technology.color }}>
                  {technology.image ? (
                    <img src={technology.image} alt="" aria-hidden="true" />
                  ) : Icon ? (
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
