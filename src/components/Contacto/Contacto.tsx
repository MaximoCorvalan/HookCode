import './Contacto.css'

export default function Contacto()
{
  return (
    <section id="contacto" className="home-section contact-section" aria-labelledby="contact-title">
      <div className="contact-section__intro">
        <span aria-hidden="true">03 /</span>
        <h2 id="contact-title">Contacto</h2>
        <p>
          Contanos qué necesitás y diseñemos juntos una solución para tu negocio.
        </p>
      </div>

      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <div className="contact-form__field">
          <label htmlFor="contact-name">Nombre</label>
          <input id="contact-name" name="name" type="text" placeholder="Tu nombre" required />
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" placeholder="tu@email.com" required />
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-phone">Número de teléfono</label>
          <input id="contact-phone" name="phone" type="tel" placeholder="+54 11 1234 5678" required />
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-subject">Asunto</label>
          <input id="contact-subject" name="subject" type="text" placeholder="¿En qué podemos ayudarte?" required />
        </div>

        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="contact-description">Descripción</label>
          <textarea
            id="contact-description"
            name="description"
            placeholder="Contanos brevemente sobre tu proyecto o necesidad"
            required
          />
        </div>

        <button className="contact-form__submit" type="submit">Enviar consulta</button>
      </form>
    </section>
  )
}