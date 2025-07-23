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
    imgSrc: '/static/images/blog/20250606-creating-exblock/HighTechComputer.gif',
    href: '/blog/20250606-creating-exblock',
  },
  {
    title: 'Time with me',
    description: `A simple web app that searches your calendars for blocks of contiguous free time.  One of the motivations for creating this was to explore serverless archetecture, specifically, realtime databases. I want to know how much I can getaway with when I don't have a server to depend one. Conversly, how much do I gain by not having to deal with servers.`,
    imgSrc: '/static/images/blog/20250715-time-with-me/timewithme.gif',
    href: '/blog/20250715-time-with-me',
  },
]

export default projectsData
