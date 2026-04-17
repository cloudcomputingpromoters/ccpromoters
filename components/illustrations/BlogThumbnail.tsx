function photoForTag(tag?: string): string {
  const t = tag?.toLowerCase() ?? '';
  if (t.includes('water') || t.includes('coastal') || t.includes('environ'))
    return '/images/construction-cranes.jpg';
  if (t.includes('struct') || t.includes('geo') || t.includes('transport'))
    return '/images/workers-steel.jpg';
  if (t.includes('career') || t.includes('salary') || t.includes('plan') || t.includes('survey'))
    return '/images/blueprints-tools.jpg';
  if (t.includes('execut') || t.includes('leader') || t.includes('manage'))
    return '/images/construction-sunset.jpg';
  return '/images/engineers-site.jpg';
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
      <div className="absolute inset-0 bg-[#1A3A8F]/20" />
      {tag && (
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#D4AF37]/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {tag}
          </span>
        </div>
      )}
    </div>
  );
}
