
import { FaLinkedinIn } from 'react-icons/fa6'
import { FiCompass, FiCrosshair, FiLayers, FiTarget, FiUsers } from 'react-icons/fi'
import team from '../../MockData/teamMember'

import './Nosotros.css'



const values = [
  {
    number: '01',
    icon: FiCrosshair,
    title: 'Impacto antes que tecnología',
    description:
      'Elegimos herramientas según el problema que queremos resolver, no por tendencia.',
  },
  {
    number: '02',
    icon: FiLayers,
    title: 'Construir con criterio',
    description:
      'Buscamos soluciones simples, mantenibles y preparadas para evolucionar.',
  },
  {
    number: '03',
    icon: FiUsers,
    title: 'Cercanía y transparencia',
    description:
      'Trabajamos de forma colaborativa, mostrando avances, decisiones y próximos pasos durante todo el proyecto.',
  },
]


export default function Nosotros() {
  return (
    <>
      <section
        id="nosotros"
        className="home-section about-section"
        aria-labelledby="about-title"
      >
        <div className="about-intro">
          <div className="about-intro__heading">
            <h2 id="about-title">
              Tecnología con criterio.
              <span>Un equipo cerca.</span>
            </h2>
          </div>

          <div className="about-intro__copy">
            <p>
              Transformamos los desafíos de tu negocio en soluciones digitales.
              Combinamos distintas especialidades y trabajamos con vos, desde
              la primera idea hasta una solución que funciona.
            </p>
   
          </div>
        </div>

        <div className="about-purpose">
          <article className="purpose-card purpose-card--mission">
            <div className="purpose-card__heading">
              <span className="purpose-card__icon" aria-hidden="true"><FiTarget /></span>
              <p className="about-eyebrow">Nuestra misión</p>
            </div>
            <h3>Hacer simple lo complejo.</h3>
            <p className="purpose-card__description">
              Transformar procesos y necesidades reales en soluciones simples,
              eficientes y escalables con automatización, software e inteligencia
              artificial.
            </p>
          </article>

          <article className="purpose-card purpose-card--vision">
            <div className="purpose-card__heading">
              <span className="purpose-card__icon" aria-hidden="true"><FiCompass /></span>
              <p className="about-eyebrow">Nuestra visión</p>
            </div>
            <h3>Crecer con tu negocio.</h3>
            <p className="purpose-card__description">
              Acompañar a las organizaciones en su evolución digital, haciendo que
              la tecnología sea útil, cercana y aplicable a su negocio.
            </p>
          </article>
        </div>

        <div className="about-values" aria-labelledby="about-values-title">
          <div className="about-values__intro">
            <p className="about-eyebrow">Nuestros valores</p>
            <h3 id="about-values-title">Lo que podés esperar de nosotros.</h3>
          </div>

          <ul className="values-list">
            {values.map((value) => {
              const Icon = value.icon

              return (
                <li className="value-item" key={value.number}>
                  <span className="value-item__icon" aria-hidden="true"><Icon /></span>
                  <div className="value-item__content">
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ========================================
          TEAM
      ======================================== */}

      <section className="about-team" aria-labelledby="team-title">
        <div className="about-subheading">
          <p>Nuestro equipo</p>

          <h3 id="team-title">
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
      </section>
    </>
  )
}
