import logo from '../../assets/HookCodeLogo-transparent.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
   
      <p className="site-footer__copyright">© {new Date().getFullYear()} HookCode. Todos los derechos reservados.</p>
    </footer>
  )
}
