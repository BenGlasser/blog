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
    title: 'Blockchain in Elixir',
    description: `A straightforward implementation of basic blockchain concepts for learning purposes.`,
    imgSrc: '/static/images/blog/20250606-elixir-blockchain/HighTeckComputer.gif',
    href: '/blog/20250606-elixir-blockchain',
  },
]

export default projectsData
