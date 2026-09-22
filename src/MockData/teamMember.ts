import type { TeamMember } from '../interfaces/TeamMember'
import lucasPhoto from '../assets/team/lucas-caceres.jpg'
import maximoPhoto from '../assets/team/maximo-corvalan.jpg'


const team: TeamMember[] = [
  {
    name: 'Lucas Caceres',
    role: 'Co-Founder · Automation, Data & AI',
    description:
      'Combina desarrollo, automatización, datos e inteligencia artificial para construir soluciones aplicadas a procesos reales.',
    photo: lucasPhoto,
    linkedin:
      'https://www.linkedin.com/in/lucas-caceres-898b35275',

  },
  {
    name: 'Máximo Corvalán',
    role: 'Co-Founder · Software Engineering',
    description:
      'Desarrollador de software enfocado en aplicaciones, APIs e integraciones, con experiencia en soluciones para automatización industrial.',
      photo: maximoPhoto  ,
      linkedin:
        'https://github.com/MaximoCorvalan',

  },
  {
    name: 'Juan Pablo Coceres',
    role: 'Co-Founder',
    description:
      'Forma parte del equipo fundador de HookCode y participa en el desarrollo de soluciones tecnológicas.',
  },
]


export default team
