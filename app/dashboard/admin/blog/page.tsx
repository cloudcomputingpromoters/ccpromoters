'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { insforge } from '@/lib/insforge';
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react';

export default function AdminBlogPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', category: '', excerpt: '', content: '', is_published: false });
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  useEffect(() => {
    insforge.database
      .from('blog_posts')
      .select('id, title, slug, category, is_published, published_at, created_at')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setPosts(data || []); setLoading(false); });
  }, []);

  function startEdit(post: { id: string; title: string; slug: string; category?: string; excerpt?: string; content?: string; is_published: boolean }) {
    setEditId(post.id);
    setForm({ title: post.title, slug: post.slug, category: post.category || '', excerpt: post.excerpt || '', content: post.content || '', is_published: post.is_published });
    setShowForm(true);
  }

  function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  async function savePost() {
    if (!form.title) return;
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      category: form.category || null,
      excerpt: form.excerpt || null,
      content: form.content || null,
      is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
    };
    if (editId) {
      const { data } = await insforge.database.from('blog_posts').update(payload).eq('id', editId).select().single();
      if (data) setPosts(prev => prev.map(p => p.id === editId ? data : p));
    } else {
      const { data } = await insforge.database.from('blog_posts').insert(payload).select().single();
      if (data) setPosts(prev => [data, ...prev]);
    }
    setForm({ title: '', slug: '', category: '', excerpt: '', content: '', is_published: false });
    setEditId(null);
    setShowForm(false);
    setSaving(false);
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post?')) return;
    await insforge.database.from('blog_posts').delete().eq('id', id);
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Blog / Insights</h1>
          </div>
          <button onClick={() => { setEditId(null); setForm({ title: '', slug: '', category: '', excerpt: '', content: '', is_published: false }); setShowForm(true); }}
            className="flex items-center gap-2 bg-[#CC1016] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#A80D12] transition-colors">
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-8 space-y-4">
            <h3 className="font-bold text-[#0D0D0D]">{editId ? 'Edit Post' : 'New Post'}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Title</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value, slug: slugify(e.target.value)})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Slug</label>
                <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Category</label>
                <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="e.g. Hiring Tips"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Excerpt</label>
              <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows={2}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Content (HTML or plain text)</label>
              <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={10}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors resize-none font-mono text-xs" />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} className="w-4 h-4 accent-[#CC1016]" />
              <span className="text-sm text-[#0D0D0D] font-medium">Publish immediately</span>
            </label>
            <div className="flex gap-3">
              <button onClick={savePost} disabled={saving || !form.title}
                className="bg-[#CC1016] text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#A80D12] transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : editId ? 'Save Changes' : 'Create Post'}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="px-6 py-2.5 border border-[#E5E5E5] rounded-lg text-sm text-[#0D0D0D] hover:border-[#0D0D0D] transition-colors">Cancel</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F5F5] border-b border-[#E5E5E5]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-[#0D0D0D]">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0D0D0D] hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0D0D0D]">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0D0D0D]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {posts.map((post: { id: string; title: string; slug: string; category?: string; is_published: boolean; created_at: string }) => (
                  <tr key={post.id} className="hover:bg-[#F5F5F5] transition-colors">
                    <td className="px-4 py-3 font-medium text-[#0D0D0D]">{post.title}</td>
                    <td className="px-4 py-3 text-[#6B6B6B] hidden md:table-cell">{post.category || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {post.is_published && <a href={`/insights/${post.slug}`} target="_blank" rel="noreferrer" className="p-1.5 text-[#6B6B6B] hover:text-[#CC1016] transition-colors"><Eye size={15} /></a>}
                        <button onClick={() => startEdit(post)} className="p-1.5 text-[#6B6B6B] hover:text-[#CC1016] transition-colors"><Edit3 size={15} /></button>
                        <button onClick={() => deletePost(post.id)} className="p-1.5 text-[#6B6B6B] hover:text-red-600 transition-colors"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {posts.length === 0 && <div className="py-12 text-center text-[#6B6B6B] text-sm">No blog posts yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
