import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-[#D4AF37] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>404</div>
        <h1 className="text-2xl font-bold text-[#1A3A8F] mb-3">Page Not Found</h1>
        <p className="text-[#4A5568] mb-8">The page you are looking for does not exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-pink">Go to Homepage</Link>
          <Link href="/jobs" className="btn-outline-navy">Browse Jobs</Link>
        </div>
      </div>
    </div>
  );
}
