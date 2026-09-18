import type Service from '../../interfaces/Service'
interface ServicesCardProps
{
  service: Service
}

export default function ServicesCard({ service }: ServicesCardProps)
{
  return (
    <article className="service-card">
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
  )
}