interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Audio-Reactive Starfield Visualizer in Unity',
    description: `A deep dive into the development of a real-time audio visualization project in Unity, 
    featuring custom HLSL shaders and ripple effects.`,
    imgSrc: '/static/images/blog/starfield.gif',
    href: '/blog/20250516-StarfieldVisualizer',
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

export default projectsData
