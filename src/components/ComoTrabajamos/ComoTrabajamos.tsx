import './ComoTrabajamos.css'

type ProcessStep = {
  number: string
  title: string
  description: string
  deliverable: string
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Descubrimiento',
    description:
      'Entendemos el problema, el proceso actual, los objetivos y las restricciones antes de proponer una solución.',
    deliverable: 'Alcance inicial y prioridades',
  },
  {
    number: '02',
    title: 'Diseño de solución',
    description:
      'Definimos el enfoque, la arquitectura, las integraciones y el flujo que mejor se adapta al proyecto.',
    deliverable: 'Propuesta técnica y plan de trabajo',
  },
  {
    number: '03',
    title: 'Construcción',
    description:
      'Desarrollamos de forma iterativa, compartiendo avances y ajustando la solución con feedback frecuente.',
    deliverable: 'Incrementos funcionales',
  },
  {
    number: '04',
    title: 'Validación',
    description:
      'Probamos funcionalidades, integraciones y escenarios reales para asegurar que la solución responda correctamente.',
    deliverable: 'Solución validada',
  },
  {
    number: '05',
    title: 'Lanzamiento & evolución',
    description:
      'Llevamos la solución a producción, documentamos lo necesario y acompañamos su evolución.',
    deliverable: 'Implementación y próximos pasos',
  },
]

export default function ComoTrabajamos() {
  return (
    <section
      id="como-trabajamos"
      className="home-section process-section"
      aria-labelledby="process-title"
    >
      <div className="section-heading process-heading">
      

        <p className="section-heading__eyebrow">
          Cómo trabajamos
        </p>

        <h2 id="process-title">
          De un problema a una solución que funciona.
        </h2>

        <p className="section-heading__description">
          No empezamos por una tecnología. Primero entendemos
          qué necesitás resolver y diseñamos el camino adecuado
          para construirlo.
        </p>
      </div>

      <div className="process-flow">
        {processSteps.map((step) => (
          <article
            className="process-card"
            key={step.number}
          >
            <div className="process-card__top">
              <span
                className="process-card__number"
                aria-hidden="true"
              >
                {step.number}
              </span>

            </div>

            <div className="process-card__content">
              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>

            <div className="process-card__deliverable">
              <span>Resultado</span>

              <strong>
                {step.deliverable}
              </strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}