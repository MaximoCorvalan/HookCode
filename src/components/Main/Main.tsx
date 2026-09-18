import './Main.css'

const services = [
  {
    number: '01',
    title: 'Automatización de procesos',
    description:
      'Transformamos tareas repetitivas y procesos manuales en flujos automáticos, integrados y eficientes.',
    features: [
      'Automatización de tareas',
      'RPA y workflows',
      'Integración entre sistemas',
      'Procesamiento automático de datos',
    ],
  },
  {
    number: '02',
    title: 'Software a medida',
    description:
      'Diseñamos y desarrollamos soluciones adaptadas a los procesos y necesidades reales de cada negocio.',
    features: [
      'Aplicaciones web',
      'Sistemas internos',
      'APIs e integraciones',
      'Plataformas empresariales',
    ],
  },
  {
    number: '03',
    title: 'Inteligencia Artificial',
    description:
      'Integramos inteligencia artificial en procesos y productos para automatizar tareas, analizar información y crear nuevas experiencias.',
    features: [
      'Agentes de IA',
      'Chatbots y asistentes',
      'IA generativa',
      'Machine Learning',
    ],
  },
]

export default function Main() {
  return (
    <main className="home-content">
      <section
        id="servicios"
        className="home-section services-section"
        aria-labelledby="services-title"
      >
        <div className="section-heading">
          <span className="section-heading__number" aria-hidden="true">
            01 /
          </span>

          <p className="section-heading__eyebrow">Nuestros servicios</p>

          <h2 id="services-title">Tecnología aplicada a problemas reales.</h2>

          <p className="section-heading__description">
            Diseñamos soluciones para automatizar procesos, desarrollar software e
            integrar inteligencia artificial en operaciones reales.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span className="service-card__number" aria-hidden="true">
                {service.number}
              </span>

              <div className="service-card__content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <span className="service-card__arrow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section id="nosotros" className="home-section" aria-labelledby="about-title">
        <span aria-hidden="true">02 /</span>
        <h2 id="about-title">Nosotros</h2>
      </section>

      <section id="contacto" className="home-section" aria-labelledby="contact-title">
        <span aria-hidden="true">03 /</span>
        <h2 id="contact-title">Contacto</h2>
      </section>
    </main>
  )
}
