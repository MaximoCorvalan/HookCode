import type { NavigationItem } from '../../interfaces/NavigationItem'
import logo from '../../assets/HookCodeLogo-transparent.png'
import ParticleBackground from '../ParticleBackground/ParticleBackground'
import './Header.css'
// Fuente de los enlaces: cada id debe coincidir con el id de una sección de Home.
const links: NavigationItem[] = [ { id: 'servicios', label: 'Servicios' }, { id: 'tecnologias', label: 'Tecnologías' }, { id: 'nosotros', label: 'Nosotros' }, { id: 'contacto', label: 'Contacto' }, ]

/** Aparece después de la portada y permanece arriba mediante position: sticky. */
export default function Header() {
  return <header className="site-header">
    <ParticleBackground />
    {/* Logotipo completo con sus colores originales y fondo transparente. */}
    <a className="site-header__brand" href="#inicio" aria-label="HookCode, volver al inicio">
      <img src={logo} alt="HookCode" width={2048} height={768} />
    </a>
    {/* Genera un enlace por destino; key identifica cada elemento para React. */}
    <nav aria-label="Navegación principal">{links.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
  </header>
}
