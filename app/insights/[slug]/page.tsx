export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, BookOpen } from 'lucide-react';
import { insforge } from '@/lib/insforge';

async function getPost(slug: string) {
  const { data } = await insforge.database
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();
  return data;
}

async function getRelatedPosts(currentSlug: string) {
  const { data } = await insforge.database
    .from('blog_posts')
    .select('id, title, slug, excerpt, discipline_tag, published_at')
    .eq('is_published', true)
    .neq('slug', currentSlug)
    .limit(3);
  return data || [];
}

export default async function InsightPostPage({ params }: { params: { slug: string } }) {
  const [post, related] = await Promise.all([getPost(params.slug), getRelatedPosts(params.slug)]);
  if (!post) notFound();

  const p = post as {
    id: string; title: string; slug: string; excerpt?: string; content: string;
    discipline_tag?: string; author?: string; image_url?: string; published_at?: string;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1A3A8F] to-[#163298] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-6 transition-colors">← All Insights</Link>
          {p.discipline_tag && (
            <span className="inline-block discipline-tag bg-[#D4AF37]/20 text-[#D4AF37] mb-4">{p.discipline_tag}</span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug" style={{ fontFamily: 'Manrope, sans-serif' }}>{p.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm">
            {p.author && <span className="flex items-center gap-2"><User size={15} />{p.author}</span>}
            {p.published_at && (
              <span className="flex items-center gap-2">
                <Calendar size={15} />
                {new Date(p.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Hero image */}
      {p.image_url && (
        <div className="max-w-4xl mx-auto px-4 -mt-8 mb-0 relative z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image_url} alt={p.title} className="w-full h-64 object-cover rounded-2xl shadow-xl" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2">
            {p.excerpt && (
              <p className="text-xl text-[#4A5568] leading-relaxed mb-8 border-l-4 border-[#D4AF37] pl-5 italic">{p.excerpt}</p>
            )}
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#1A3A8F] prose-p:text-[#4A5568] prose-p:leading-relaxed prose-li:text-[#4A5568] prose-a:text-[#D4AF37]"
              dangerouslySetInnerHTML={{ __html: p.content }}
            />

            {/* Share / CTA */}
            <div className="mt-12 p-8 bg-[#F7F9FC] rounded-2xl border border-[#E2E8F0]">
              <h3 className="font-bold text-[#1A3A8F] text-xl mb-2">Found This Useful?</h3>
              <p className="text-[#4A5568] mb-5">If you are a civil engineer looking for your next role, or a firm looking to hire, our team is ready to help.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/register/candidate" className="btn-pink">Submit Your Resume</Link>
                <Link href="/register/employer" className="btn-outline-navy">Post a Job</Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Related */}
            {related.length > 0 && (
              <div className="bg-[#F7F9FC] rounded-xl p-6 border border-[#E2E8F0]">
                <h3 className="font-bold text-[#1A3A8F] mb-4">More Insights</h3>
                <div className="space-y-4">
                  {(related as Array<{ id: string; title: string; slug: string; excerpt?: string; discipline_tag?: string; published_at?: string }>).map(r => (
                    <Link key={r.id} href={`/insights/${r.slug}`}
                      className="block group pb-4 border-b border-[#E2E8F0] last:border-0 last:pb-0">
                      {r.discipline_tag && <span className="discipline-tag bg-pink-100 text-pink-700 mb-1.5 inline-block text-[10px]">{r.discipline_tag}</span>}
                      <p className="text-sm font-semibold text-[#1A3A8F] group-hover:text-[#D4AF37] transition-colors leading-snug">{r.title}</p>
                    </Link>
                  ))}
                </div>
                <Link href="/insights" className="block text-center text-[#D4AF37] font-semibold text-sm mt-4 hover:underline">View All Insights →</Link>
              </div>
            )}

            {/* Salary CTA */}
            <div className="bg-[#1A3A8F] rounded-xl p-6 text-white">
              <BookOpen size={24} className="text-[#D4AF37] mb-3" />
              <h3 className="font-bold text-lg mb-2">2026 Salary Guide</h3>
              <p className="text-white/70 text-sm mb-4">See what civil engineers in your discipline are actually earning.</p>
              <Link href="/salary-guide" className="block w-full text-center bg-[#D4AF37] text-white font-bold py-2.5 rounded-lg hover:bg-[#B8960C] transition-colors text-sm">View Salary Data</Link>
            </div>

            {/* Job alerts CTA */}
            <div className="border-2 border-[#D4AF37] rounded-xl p-6">
              <h3 className="font-bold text-[#1A3A8F] text-lg mb-2">Browse Open Roles</h3>
              <p className="text-[#4A5568] text-sm mb-4">15+ active civil engineering positions across all disciplines.</p>
              <Link href="/jobs" className="block w-full text-center bg-[#D4AF37] text-white font-bold py-2.5 rounded-lg hover:bg-[#B8960C] transition-colors text-sm">View Jobs</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
