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
]

export default projectsData
