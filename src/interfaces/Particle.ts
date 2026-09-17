/** Nodo de la red animada; las distancias se expresan en píxeles CSS. */
export interface Particle {
  /** Posición horizontal dentro de la portada. */
  x: number
  /** Posición vertical dentro de la portada. */
  y: number
  /** Desplazamiento horizontal por paso base de animación. */
  vx: number
  /** Desplazamiento vertical por paso base de animación. */
  vy: number
  /** Radio del círculo que representa el nodo. */
  radius: number
}
/** Cursor utilizado para calcular la repulsión de los nodos. */
export interface ParticlePointer {
  /** Coordenada horizontal relativa a la portada. */
  x: number
  /** Coordenada vertical relativa a la portada. */
  y: number
  /** Indica si el puntero está dentro y debe ejercer fuerza. */
  active: boolean
}
