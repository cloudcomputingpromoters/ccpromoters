export const dynamic = 'force-dynamic';

import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import AudienceCards from '@/components/home/AudienceCards';
import DisciplinesSection from '@/components/home/DisciplinesSection';
import StatsSection from '@/components/home/StatsSection';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturedJobs from '@/components/home/FeaturedJobs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import { insforge } from '@/lib/insforge';
import Link from 'next/link';
import { ArrowRight, BookOpen, TrendingUp } from 'lucide-react';

async function getTestimonials() {
  const { data } = await insforge.database
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  return data || [];
}

async function getBlogPosts() {
  const { data } = await insforge.database
    .from('blog_posts')
    .select('id, title, slug, excerpt, discipline_tag, author, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3);
  return data || [];
}

export default async function HomePage() {
  const [testimonials, blogPosts] = await Promise.all([getTestimonials(), getBlogPosts()]);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <AudienceCards />
      <DisciplinesSection />
      <StatsSection />
      <HowItWorks />
      <FeaturedJobs />

      {/* Salary Guide Teaser */}
      <section className="py-20 bg-gradient-to-br from-[#E91E8C] to-[#0B1F3A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-white max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
              <TrendingUp size={16} />
              <span className="text-sm font-semibold">2025 Salary Data</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              What Should a Civil Engineer Earn in 2025?
            </h2>
            <p className="text-white/80 text-lg mb-6">
              Our annual salary guide covers every discipline, experience level, and region — with real placement data from thousands of successful hires.
            </p>
            <Link href="/salary-guide"
              className="inline-flex items-center gap-2 bg-white text-[#0B1F3A] font-semibold px-7 py-4 rounded-lg hover:bg-white/90 transition-colors">
              Download the Free Salary Guide <ArrowRight size={18} />
            </Link>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 w-full max-w-sm">
            <h3 className="text-white font-bold text-lg mb-5">Salary Ranges by Discipline</h3>
            {[
              { label: 'Structural (PE)', range: '$95k–$185k' },
              { label: 'Transportation', range: '$75k–$130k' },
              { label: 'Geotechnical', range: '$80k–$140k' },
              { label: 'Environmental', range: '$70k–$120k' },
              { label: 'Construction Mgmt', range: '$90k–$155k' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                <span className="text-white/70 text-sm">{item.label}</span>
                <span className="text-white font-semibold text-sm">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      {/* Blog / Insights */}
      {blogPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Industry <span className="text-[#E91E8C]">Insights</span>
                </h2>
                <p className="text-[#4A5568] mt-2">Salary data, hiring trends, and career advice for civil engineers.</p>
              </div>
              <Link href="/insights" className="text-[#E91E8C] font-semibold hover:underline shrink-0">
                Visit Our Insights Hub →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map(post => (
                <Link key={post.id} href={`/insights/${post.slug}`}
                  className="group border border-[#E2E8F0] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#E91E8C] transition-all duration-300 hover:-translate-y-1">
                  <div className="h-44 bg-gradient-to-br from-[#0B1F3A] to-[#112850] flex items-center justify-center">
                    <BookOpen size={48} className="text-[#E91E8C]/60" />
                  </div>
                  <div className="p-6">
                    <span className="discipline-tag bg-pink-100 text-pink-700 mb-3 inline-block">
                      {post.discipline_tag}
                    </span>
                    <h3 className="font-bold text-[#0B1F3A] text-base leading-snug mb-2 group-hover:text-[#E91E8C] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[#4A5568] text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <span className="text-[#E91E8C] text-sm font-semibold">Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />

      {/* Services overview */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            More Than Recruitment —{' '}
            <span className="text-[#E91E8C]">A True Talent Partner</span>
          </h2>
          <p className="text-[#4A5568] text-lg mb-12 max-w-2xl mx-auto">
            From executive search to career coaching, CCPromoters supports engineering firms and professionals at every stage.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Permanent Placement', desc: 'Pre-screened PE-verified engineers on a contingent or retained basis.', href: '/services/permanent-placement', icon: '🏢' },
              { title: 'Contract Staffing', desc: 'Flexible project-based engineers deployed within 48 hours.', href: '/services/contract-staffing', icon: '⏱️' },
              { title: 'Executive Search', desc: 'Confidential Director, VP & C-suite engineering leadership placement.', href: '/services/executive-search', icon: '⭐' },
              { title: 'Career Coaching', desc: 'Interview prep, salary negotiation, and PE roadmap support for candidates.', href: '/services/career-roadmap', icon: '🎯' },
            ].map(s => (
              <Link key={s.href} href={s.href}
                className="bg-white rounded-xl p-7 border border-[#E2E8F0] hover:border-[#E91E8C] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group text-left">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-[#0B1F3A] mb-2 group-hover:text-[#E91E8C] transition-colors">{s.title}</h3>
                <p className="text-[#4A5568] text-sm mb-4">{s.desc}</p>
                <span className="text-[#E91E8C] text-sm font-semibold">Learn More →</span>
              </Link>
            ))}
          </div>
          <Link href="/services" className="inline-block mt-10 border-2 border-[#0B1F3A] text-[#0B1F3A] font-semibold px-8 py-3 rounded-lg hover:bg-[#0B1F3A] hover:text-white transition-all">
            View All Services
          </Link>
        </div>
      </section>
    </>
  );
}
