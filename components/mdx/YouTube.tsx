//components/mdx/YouTube.tsx
export default function YouTube({ id }: { id: string }) {
  return (
    <div>
      <iframe
        className="aspect-video w-full"
        src={'https://www.youtube.com/embed/' + id}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  )
}
{
  /* <iframe width="560" height="315" src="https://www.youtube.com/embed/ds9UhMriTRY?si=GKIuoD3rpTTWVdpV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */
}
