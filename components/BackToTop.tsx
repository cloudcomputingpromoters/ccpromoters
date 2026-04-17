'use client';

export default function BackToTop() {
  return (
    <button
      id="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-12 h-12 bg-[#D4AF37] text-white rounded-full shadow-lg items-center justify-center z-50 hover:bg-[#B8960C] transition-all hidden"
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="mx-auto">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
