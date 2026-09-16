import type { NavigationItem } from '../../interfaces/NavigationItem'
import './Header.css'
const links: NavigationItem[] = [ { id: 'contacto', label: 'Contacto' }, { id: 'servicios', label: 'Servicios' }, { id: 'nosotros', label: 'Nosotros' } ]

/** Aparece después de la portada y permanece arriba mediante position: sticky. */
export default function Header() {
  return <header className="site-header">
    <a className="site-header__brand" href="#inicio" aria-label="HookCode, volver al inicio">Hook<span>Code</span></a>
    <nav aria-label="Navegación principal">{links.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
  </header>
}
