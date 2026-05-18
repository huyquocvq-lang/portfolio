export default function BannerEmbed({ src, title, className = '' }) {
  return (
    <iframe
      src={src}
      title={title}
      className={`banner-embed ${className}`.trim()}
      scrolling="no"
      loading="lazy"
      referrerPolicy="no-referrer"
      sandbox="allow-scripts allow-same-origin"
    />
  )
}
