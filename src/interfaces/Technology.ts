import type { IconType } from 'react-icons'
type TechnologySize = 'primary' | 'secondary'
type Technology = {
  name: string
  category: string
  color: string
  icon?: IconType
  image?: string
  wordmark?: string
  x: number
  y: number
  size: TechnologySize
}

type MotionNode = {
  phase: number
  speed: number
}
export  type{Technology, TechnologySize, MotionNode}
