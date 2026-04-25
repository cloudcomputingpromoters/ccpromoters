'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled — no action needed
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex-1 flex items-center justify-center gap-2 border border-[#E5E5E5] rounded-lg py-2.5 text-sm transition-colors hover:border-[#CC1016] hover:text-[#CC1016]"
      style={{ color: copied ? '#CC1016' : '#6B6B6B' }}
    >
      {copied ? <><Check size={15} /> Copied!</> : <><Share2 size={15} /> Share</>}
    </button>
  );
}
