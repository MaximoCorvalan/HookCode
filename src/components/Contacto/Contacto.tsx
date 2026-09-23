import { FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import './Contacto.css'

export default function Contacto() {
  return (
    <section id="contacto" className="home-section contact-section" aria-labelledby="contact-title">
      <div className="contact-section__intro">
   
        <h2 id="contact-title">Contacto</h2>
        <p className="contact-section__description">
          ¿Listo para dar el próximo paso? Contanos tu idea y veamos cómo podemos
          ayudarte a convertirla en una solución para tu negocio.
        </p>

        <div className="contact-details">
          <div className="contact-details__item">
            <span className="contact-details__icon" aria-hidden="true"><FiMail /></span>
            <div className="contact-details__content">
              <span className="contact-details__label">Email</span>
              <a href="mailto:HookCode@gmail.com">HookCode@gmail.com</a>
            </div>
          </div>
          <div className="contact-details__item">
            <span className="contact-details__icon" aria-hidden="true"><FiMapPin /></span>
            <div className="contact-details__content">
              <span className="contact-details__label">Ubicación</span>
              <strong>Buenos Aires, Argentina</strong>
            </div>
          </div>
        </div>
      </div>

      <form className="contact-form" aria-label="Formulario de contacto" onSubmit={(event) => event.preventDefault()}>
        <div className="contact-form__field">
          <label htmlFor="contact-subject">Asunto</label>
          <input id="contact-subject" name="subject" type="text" placeholder="¿En qué podemos ayudarte?" required />
        </div>
        <div className="contact-form__field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="tu@email.com" required />
        </div>
        <div className="contact-form__field">
          <label htmlFor="contact-message">Mensaje</label>
          <textarea id="contact-message" name="message" placeholder="Contanos sobre tu proyecto" required />
        </div>
        <button className="contact-form__submit" type="submit">
          Enviar mensaje <FiSend aria-hidden="true" />
        </button>
      </form>
    </section>
  )
}
