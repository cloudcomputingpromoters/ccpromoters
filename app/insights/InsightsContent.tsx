'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import BlogThumbnail from '@/components/illustrations/BlogThumbnail';
import { insforge } from '@/lib/insforge';

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  discipline_tag?: string;
  author?: string;
  image_url?: string;
  published_at?: string;
};

export default function InsightsContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    insforge.database
      .from('blog_posts')
      .select('id, title, slug, excerpt, discipline_tag, author, image_url, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setPosts((data as Post[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0D0D0D] py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-[#CC1016]/20 text-[#CC1016] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Insights Hub</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Civil Engineering <span className="text-[#CC1016]">Insights</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              Salary data, market trends, career advice, and hiring intelligence from the specialists who know civil engineering best.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ height: '240px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/house-blueprints.jpg"
              alt="Civil engineering blueprints"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#0D0D0D]/25" />
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden animate-pulse">
                  <div className="h-44 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E5E5] mb-8" style={{ width: '480px', maxWidth: '100%', height: '260px' }}>
                <Image src="/images/house-blueprints.jpg" alt="Insights coming soon" fill className="object-cover" sizes="480px" />
              </div>
              <h3 className="font-bold text-[#0D0D0D] text-xl mb-2">Articles Coming Soon</h3>
              <p className="text-[#6B6B6B]">Our team is preparing in-depth civil engineering career content. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              <Link href={`/insights/${posts[0].slug}`}
                className="group block bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-xl hover:border-[#CC1016] transition-all mb-8">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto overflow-hidden relative">
                    {posts[0].image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={posts[0].image_url} alt={posts[0].title} className="w-full h-full object-cover opacity-60" />
                    ) : (
                      <Image src="/images/engineers-site.jpg" alt={posts[0].title}
                        fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#CC1016] text-white text-xs font-bold px-3 py-1.5 rounded-full">Featured</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    {posts[0].discipline_tag && (
                      <span className="discipline-tag mb-3 inline-block w-fit">{posts[0].discipline_tag}</span>
                    )}
                    <h2 className="font-bold text-[#0D0D0D] text-2xl leading-snug mb-3 group-hover:text-[#CC1016] transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {posts[0].title}
                    </h2>
                    <p className="text-[#6B6B6B] mb-4 line-clamp-3">{posts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-[#6B6B6B]">
                      <span>{posts[0].author || 'CCPromoters Team'}</span>
                      {posts[0].published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(posts[0].published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              {/* Rest */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(1).map(post => (
                  <Link key={post.id} href={`/insights/${post.slug}`}
                    className="group bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-xl hover:border-[#CC1016] transition-all hover:-translate-y-1">
                    <div className="h-44 overflow-hidden relative">
                      {post.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover opacity-50" />
                      ) : (
                        <BlogThumbnail tag={post.discipline_tag} />
                      )}
                    </div>
                    <div className="p-6">
                      {post.discipline_tag && (
                        <span className="discipline-tag mb-3 inline-block">{post.discipline_tag}</span>
                      )}
                      <h3 className="font-bold text-[#0D0D0D] text-lg leading-snug mb-2 group-hover:text-[#CC1016] transition-colors">{post.title}</h3>
                      <p className="text-[#6B6B6B] text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E5]">
                        <span className="text-xs text-[#6B6B6B]">{post.author || 'CCPromoters Team'}</span>
                        <span className="text-[#CC1016] text-sm font-semibold">Read →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-[#0D0D0D] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Get the Latest Insights by Email</h2>
        <p className="text-white/70 mb-8">Monthly salary data, job market intelligence, and career advice for civil engineers.</p>
        <Link href="/#newsletter" className="btn-pink">Subscribe Free</Link>
      </section>
    </div>
  );
}
