// Team member images
import ursulaImage from '@/assets/team/Ursula Phot.jpg'
import danielImage from '@/assets/team/daniel-carroll.ec9a6354.jpg'
import kaelaImage from '@/assets/team/kaela-shuttleworth.ce25f590.jpg'
import michaelImage from '@/assets/team/Michael.avif'

export interface TeamMember {
  name: string
  image: string | null
  initials: string
  passions: string
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Alexander Church',
    image: null,
    initials: 'AC',
    passions: 'Business psychology, human behaviour, Brain and behaviour, helping people and organisations understand how thinking styles affect performance, communication and change.',
  },
  {
    name: 'Dr Suzanne Heywood-Everett',
    image: null,
    initials: 'SH',
    passions: 'Clinical psychology, behaviour patterns, and helping people understand neurodiversity in a clear, practical way.',
  },
  {
    name: 'Francesca Rodgers',
    image: null,
    initials: 'FR',
    passions: 'Workforce behaviour, organisational culture, and designing people-focused strategies that improve how teams work, adapt and communicate.',
  },
  {
    name: 'Ursula Philpott',
    image: ursulaImage,
    initials: 'UP',
    passions: 'Research, outcomes, and turning psychological evidence into simple guidance that improves workplace wellbeing and performance.',
  },
  {
    name: 'Daniel Carroll',
    image: danielImage,
    initials: 'DC',
    passions: 'Digital systems, data insight and making complex information easy to understand so organisations can make better decisions.',
  },
  {
    name: 'Bronlie Roe',
    image: null,
    initials: 'BR',
    passions: 'Training, behaviour change, and helping teams build confidence, clarity and psychologically safe ways of working.',
  },
  {
    name: 'Kaela Shuttleworth',
    image: kaelaImage,
    initials: 'KS',
    passions: 'Helping managers understand different thinking styles and simple workplace adjustments that help people perform at their best.',
  },
  {
    name: 'Michael Davis',
    image: michaelImage,
    initials: 'MD',
    passions: 'Digital confidence, teamwork, and helping people feel comfortable learning and using new systems and technology.',
  },
]

