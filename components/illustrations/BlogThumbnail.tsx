function photoForTag(tag?: string): string {
  const t = tag?.toLowerCase() ?? '';
  if (t.includes('water') || t.includes('coastal') || t.includes('environ'))
    return '/images/construction-cranes.jpg';
  if (t.includes('struct'))
    return '/images/workers-steel.jpg';
  if (t.includes('geo'))
    return '/images/workers-concrete.webp';
  if (t.includes('transport'))
    return '/images/city-construction.jpg';
  if (t.includes('construct') || t.includes('land'))
    return '/images/construction-labor.jpg';
  if (t.includes('career') || t.includes('salary') || t.includes('plan') || t.includes('survey'))
    return '/images/blueprints-tools.jpg';
  if (t.includes('execut') || t.includes('leader') || t.includes('manage'))
    return '/images/workers-steel.jpg';
  return '/images/engineer-portrait.jpg';
}

export default function BlogThumbnail({ tag }: { tag?: string }) {
  const photo = photoForTag(tag);
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt={tag ? `${tag} — civil engineering industry insights and career advice` : 'Civil engineering construction site — industry insights'}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#0D0D0D]/20" />
      {tag && (
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#CC1016]/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {tag}
          </span>
        </div>
      )}
    </div>
  );
}
