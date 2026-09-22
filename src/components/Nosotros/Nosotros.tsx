
import { FaLinkedinIn } from 'react-icons/fa6'
import team from '../../MockData/teamMember'

import './Nosotros.css'



const values = [
  {
    number: '01',
    title: 'Impacto antes que tecnología',
    description:
      'Elegimos herramientas según el problema que queremos resolver, no por tendencia.',
  },
  {
    number: '02',
    title: 'Construir con criterio',
    description:
      'Buscamos soluciones simples, mantenibles y preparadas para evolucionar.',
  },
  {
    number: '03',
    title: 'Cercanía y transparencia',
    description:
      'Trabajamos de forma colaborativa, mostrando avances, decisiones y próximos pasos durante todo el proyecto.',
  },
]


export default function Nosotros() {
  return (
    <section
      id="nosotros"
      className="home-section about-section"
      aria-labelledby="about-title"
    >
      {/* ========================================
          INTRO
      ======================================== */}

      <div className="section-heading about-heading">
        <span
          className="section-heading__number"
          aria-hidden="true"
        >
          04 /
        </span>

        <p className="section-heading__eyebrow">
          Nosotros
        </p>

        <h2 id="about-title">
          Personas que entienden problemas y construyen soluciones.
        </h2>

        <p className="section-heading__description">
          Somos un equipo de desarrollo enfocado en automatización,
          software e inteligencia artificial. Combinamos distintas
          especialidades para transformar procesos, ideas y necesidades
          de negocio en soluciones digitales concretas.
        </p>
      </div>

      {/* ========================================
          MISSION & VISION
      ======================================== */}

      <div className="about-purpose">
        <article className="purpose-card">
          <span
            className="purpose-card__label"
            aria-hidden="true"
          >
            01
          </span>

          <h3>Nuestra misión</h3>

          <p>
            Transformar procesos y necesidades reales en
            soluciones digitales simples, eficientes y
            escalables mediante automatización, software e
            inteligencia artificial.
          </p>
        </article>

        <article className="purpose-card">
          <span
            className="purpose-card__label"
            aria-hidden="true"
          >
            02
          </span>

          <h3>Nuestra visión</h3>

          <p>
            Construir una empresa tecnológica capaz de
            acompañar a organizaciones en su evolución digital,
            haciendo que tecnologías avanzadas sean realmente
            útiles y aplicables a su negocio.
          </p>
        </article>
      </div>

      {/* ========================================
          VALUES
      ======================================== */}

      <div className="about-values">
        <div className="about-subheading">
          <p>Nuestros valores</p>

          <h3>
            La forma en la que elegimos construir.
          </h3>
        </div>

        <div className="values-grid">
          {values.map((value) => (
            <article
              className="value-item"
              key={value.number}
            >
              <span
                className="value-item__number"
                aria-hidden="true"
              >
                {value.number}
              </span>

              <h4>
                {value.title}
              </h4>

              <p>
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* ========================================
          TEAM
      ======================================== */}

      <div className="about-team">
        <div className="about-subheading">
          <p>Nuestro equipo</p>

          <h3>
            El equipo detrás de HookCode.
          </h3>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <article
              className="team-card"
              key={member.name}
            >
              <div className="team-card__image">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                  />
                ) : (
                  <div
                    className="team-card__placeholder"
                    aria-hidden="true"
                  >
                    <span>
                      {member.name
                        .split(' ')
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                  </div>
                )}
              </div>

              <div className="team-card__content">
                <h4>
                  {member.name}
                </h4>

                <p className="team-card__role">
                  {member.role}
                </p>

                <p className="team-card__description">
                  {member.description}
                </p>

                {(member.linkedin ) && (
                  <div
                    className="team-card__socials"
                    aria-label={`Redes de ${member.name}`}
                  >
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <FaLinkedinIn aria-hidden="true" />
                      </a>
                    )}

                
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}