import Header from '../../components/Header/Header'
import HookCode from '../../components/HookCodeImage/HookCode'
import Main from '../../components/Main/Main'
import './Home.css'

/** Composición de la página. Los destinos quedan listos para las próximas etapas. */
export default function Home() {
  return <>
    {/* Acceso por teclado para evitar recorrer toda la portada. */}
    <a className="skip-link" href="#servicios">Saltar la portada</a>
    {/* El orden coloca el encabezado después de la presentación dentro del flujo. */}
    <HookCode />
    <Header />
    <Main />
  </>
}
