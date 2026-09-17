import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Al recargar se repite la portada desde arriba. Las visitas mediante enlaces
// a secciones y la navegación atrás/adelante conservan su comportamiento normal.
const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
if (navigation?.type === 'reload') {
  // Evita recuperar una posición anterior durante esta recarga.
  history.scrollRestoration = 'manual'
  // Quita el destino interno sin recargar ni crear otra entrada en el historial.
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search)
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  // Al mostrarse el documento, reafirma el inicio y restaura el manejo normal del historial.
  window.addEventListener('pageshow', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    history.scrollRestoration = 'auto'
  }, { once: true })
}

// Monta la aplicación. StrictMode detecta problemas de efectos en desarrollo.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
