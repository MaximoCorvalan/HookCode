import logo from '../../assets/HookCodeLogo-transparent.png'
import ParticleBackground from '../ParticleBackground/ParticleBackground'
import './HookCode.css'

/** Portada de pantalla completa con la identidad original del proyecto. */
export default function HookCode() {
  return <section className="hero" id="inicio" aria-label="HookCode — Soluciones Tecnológicas">
    <ParticleBackground />
    <div className="hero__identity">
      <h1><img src={logo} alt="HookCode" className="hero__logo" /></h1>
      <p>Soluciones Tecnológicas</p>
    </div>
    <a href="#servicios" className="hero__scroll"><span>Descubrí HookCode</span><span aria-hidden="true">↓</span></a>
  </section>
}

