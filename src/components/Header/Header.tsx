import type { NavigationItem } from '../../interfaces/NavigationItem'
import './Header.css'
// Fuente de los enlaces: cada id debe coincidir con el id de una sección de Home.
const links: NavigationItem[] = [ { id: 'contacto', label: 'Contacto' }, { id: 'servicios', label: 'Servicios' }, { id: 'nosotros', label: 'Nosotros' }, { id: 'clientes', label: 'Clientes' } ]

/** Aparece después de la portada y permanece arriba mediante position: sticky. */
export default function Header() {
  return <header className="site-header">
    {/* Nombre de marca en texto; el enlace permite regresar al inicio. */}
    <a className="site-header__brand" href="#inicio" aria-label="HookCode, volver al inicio">
      Hook<span>Code</span>
    </a>
    {/* Genera un enlace por destino; key identifica cada elemento para React. */}
    <nav aria-label="Navegación principal">{links.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
  </header>
}
