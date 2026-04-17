'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { MessageSquare, Send } from 'lucide-react';

export default function EmployerMessagesPage() {
  const [userId, setUserId] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [threads, setThreads] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const user = userData.user;
      setUserId(user.id);
      insforge.database
      .from('message_threads')
      .select('*, messages(id, body, sender_role, created_at)')
      .eq('employer_id', user.id)
      .order('updated_at', { ascending: false })
      .then(({ data }) => { setThreads(data || []); setLoading(false); });
    }
    load();
  }, []);

  function openThread(thread: { id: string; messages?: { id: string; body: string; sender_role: string; created_at: string }[] }) {
    setSelectedThread(thread.id);
    setMessages(thread.messages || []);
  }

  async function sendReply() {
    if (!reply.trim() || !selectedThread || !userId) return;
    setSending(true);
    const { data } = await insforge.database
      .from('messages')
      .insert({ thread_id: selectedThread, body: reply.trim(), sender_id: userId, sender_role: 'employer' })
      .select()
      .single();
    if (data) setMessages(prev => [...prev, data]);
    setReply('');
    setSending(false);
  }

  const active = threads.find((t: { id: string }) => t.id === selectedThread);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/dashboard/employer" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Messages</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <div className="h-96 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />
        ) : threads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-16 text-center">
            <MessageSquare size={48} className="text-[#D4AF37]/30 mx-auto mb-4" />
            <h3 className="font-bold text-[#1A3A8F] text-xl mb-2">No Messages Yet</h3>
            <p className="text-[#4A5568] text-sm">Candidate conversations will appear here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-4 h-[600px]">
            <div className="md:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] overflow-y-auto">
              {threads.map((thread: { id: string; subject?: string; updated_at: string; candidate_name?: string }) => (
                <button key={thread.id} onClick={() => openThread(thread)}
                  className={`w-full text-left px-4 py-4 border-b border-[#E2E8F0] hover:bg-[#F7F9FC] transition-colors ${selectedThread === thread.id ? 'bg-[#F7F9FC] border-l-2 border-l-[#D4AF37]' : ''}`}>
                  <p className="font-semibold text-[#1A3A8F] text-sm truncate">{thread.candidate_name || 'Candidate'}</p>
                  <p className="text-xs text-[#4A5568] mt-0.5 truncate">{thread.subject || 'Conversation'}</p>
                  <p className="text-xs text-[#4A5568] mt-0.5">{new Date(thread.updated_at).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
            <div className="md:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] flex flex-col">
              {!selectedThread ? (
                <div className="flex-1 flex items-center justify-center text-[#4A5568] text-sm">Select a conversation</div>
              ) : (
                <>
                  <div className="p-4 border-b border-[#E2E8F0]">
                    <p className="font-bold text-[#1A3A8F]">{active?.candidate_name || 'Candidate'}</p>
                    <p className="text-xs text-[#4A5568]">{active?.subject || 'Conversation'}</p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg: { id: string; body: string; sender_role: string; created_at: string }) => (
                      <div key={msg.id} className={`flex ${msg.sender_role === 'employer' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender_role === 'employer' ? 'bg-[#D4AF37] text-white' : 'bg-[#F7F9FC] border border-[#E2E8F0] text-[#1A3A8F]'}`}>
                          <p>{msg.body}</p>
                          <p className={`text-xs mt-1 ${msg.sender_role === 'employer' ? 'text-white/70' : 'text-[#4A5568]'}`}>
                            {new Date(msg.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-[#E2E8F0] flex gap-2">
                    <input value={reply} onChange={e => setReply(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendReply()}
                      placeholder="Type a message..."
                      className="flex-1 border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#1A3A8F] focus:outline-none focus:border-[#D4AF37] transition-colors" />
                    <button onClick={sendReply} disabled={sending || !reply.trim()}
                      className="bg-[#D4AF37] text-white p-2.5 rounded-lg hover:bg-[#B8960C] transition-colors disabled:opacity-50">
                      <Send size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
