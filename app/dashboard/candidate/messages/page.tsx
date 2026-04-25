'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { MessageSquare, Send } from 'lucide-react';

interface MsgThread {
  id: string; subject?: string; employer_name?: string; updated_at: string;
  messages?: MsgItem[];
}
interface MsgItem { id: string; body: string; sender_role: string; created_at: string }

export default function CandidateMessagesPage() {
  const [threads, setThreads] = useState<MsgThread[]>([]);
  const [messages, setMessages] = useState<MsgItem[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      setUserId(userData.user.id);
      const { data } = await insforge.database
        .from('message_threads')
        .select('id, subject, employer_name, updated_at, messages(id, body, sender_role, created_at)')
        .eq('candidate_id', userData.user.id)
        .order('updated_at', { ascending: false });
      setThreads((data || []) as MsgThread[]); setLoading(false);
    }
    load();
  }, []);

  function openThread(thread: MsgThread) {
    setSelectedThread(thread.id);
    setMessages(thread.messages || []);
  }

  async function sendReply() {
    if (!reply.trim() || !selectedThread || !userId) return;
    setSending(true);
    const { data } = await insforge.database
      .from('messages')
      .insert({ thread_id: selectedThread, body: reply.trim(), sender_id: userId, sender_role: 'candidate' })
      .select()
      .single();
    if (data) setMessages(prev => [...prev, data as MsgItem]);
    setReply('');
    setSending(false);
  }

  const active = threads.find(t => t.id === selectedThread);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/dashboard/candidate" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Messages</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
        ) : threads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-16 text-center">
            <MessageSquare size={48} className="text-[#CC1016]/30 mx-auto mb-4" />
            <h3 className="font-bold text-[#0D0D0D] text-xl mb-2">No Messages Yet</h3>
            <p className="text-[#6B6B6B] text-sm">When a recruiter reaches out, your conversations will appear here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-4 h-[600px]">
            <div className="md:col-span-2 bg-white rounded-2xl border border-[#E5E5E5] overflow-y-auto">
              {threads.map(thread => (
                <button key={thread.id} onClick={() => openThread(thread)}
                  className={`w-full text-left px-4 py-4 border-b border-[#E5E5E5] hover:bg-[#F5F5F5] transition-colors ${selectedThread === thread.id ? 'bg-[#F5F5F5] border-l-2 border-l-[#CC1016]' : ''}`}>
                  <p className="font-semibold text-[#0D0D0D] text-sm truncate">{thread.subject || 'New Message'}</p>
                  <p className="text-xs text-[#6B6B6B] mt-0.5 truncate">{thread.employer_name || 'CCP Recruiter'}</p>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">{new Date(thread.updated_at).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
            <div className="md:col-span-3 bg-white rounded-2xl border border-[#E5E5E5] flex flex-col">
              {!selectedThread ? (
                <div className="flex-1 flex items-center justify-center text-[#6B6B6B] text-sm">Select a conversation</div>
              ) : (
                <>
                  <div className="p-4 border-b border-[#E5E5E5]">
                    <p className="font-bold text-[#0D0D0D]">{active?.subject || 'Conversation'}</p>
                    <p className="text-xs text-[#6B6B6B]">{active?.employer_name || 'CCP Recruiter'}</p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender_role === 'candidate' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender_role === 'candidate' ? 'bg-[#CC1016] text-white' : 'bg-[#F5F5F5] border border-[#E5E5E5] text-[#0D0D0D]'}`}>
                          <p>{msg.body}</p>
                          <p className={`text-xs mt-1 ${msg.sender_role === 'candidate' ? 'text-white/70' : 'text-[#6B6B6B]'}`}>
                            {new Date(msg.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-[#E5E5E5] flex gap-2">
                    <input value={reply} onChange={e => setReply(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendReply()}
                      placeholder="Type a message..."
                      className="flex-1 border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
                    <button onClick={sendReply} disabled={sending || !reply.trim()}
                      className="bg-[#CC1016] text-white p-2.5 rounded-lg hover:bg-[#A80D12] transition-colors disabled:opacity-50">
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
