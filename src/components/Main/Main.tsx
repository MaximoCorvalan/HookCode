import './Main.css'

import { services } from '../../MockData/servicesdata'
import Contacto from '../Contacto/Contacto'
import ComoTrabajamos from '../ComoTrabajamos/ComoTrabajamos'
import Nosotros from '../Nosotros/Nosotros'
import ServicesCard from '../ServicesCard/ServicesCard'
import Tecnologias from '../Tecnologias/Tecnologias'

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
            <ServicesCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <ComoTrabajamos />
      <Tecnologias />
      <Nosotros />
      <Contacto />
    </main>
  )
}
