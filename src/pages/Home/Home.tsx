import Header from '../../components/Header/Header'
import HookCode from '../../components/HookCodeImage/HookCode'
import './Home.css'

/** Composición de la página. Los destinos quedan listos para las próximas etapas. */
export default function Home() {
  return <>
    <a className="skip-link" href="#servicios">Saltar la portada</a>
    <HookCode />
    <Header />
    <main className="home-content">
      {/* Solo títulos por ahora: no adelantamos el contenido de las próximas secciones. */}
      <section id="servicios" className="home-section" aria-labelledby="services-title"><span aria-hidden="true">01 /</span><h2 id="services-title">Servicios</h2></section>
      <section id="nosotros" className="home-section" aria-labelledby="about-title"><span aria-hidden="true">02 /</span><h2 id="about-title">Nosotros</h2></section>
      <section id="contacto" className="home-section" aria-labelledby="contact-title"><span aria-hidden="true">03 /</span><h2 id="contact-title">Contacto</h2></section>
    </main>
  </>
}
