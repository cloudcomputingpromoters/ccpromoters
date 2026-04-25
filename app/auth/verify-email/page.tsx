import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-[#CC1016] rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Verify Your Email</h1>
        <p className="text-[#6B6B6B] mb-3">We have sent a 6-digit verification code to your email address.</p>
        <p className="text-[#6B6B6B] text-sm mb-8">Enter the code on the registration page to activate your account. The code expires in 15 minutes.</p>
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6 text-left">
          <h3 className="font-bold text-[#0D0D0D] mb-2">Didn&apos;t receive the email?</h3>
          <ul className="text-[#6B6B6B] text-sm space-y-1.5">
            <li>• Check your spam or junk mail folder</li>
            <li>• Make sure you entered the correct email address</li>
            <li>• Allow 1–2 minutes for delivery</li>
          </ul>
        </div>
        <Link href="/register" className="btn-outline-navy block text-center mb-3">Back to Registration</Link>
        <Link href="/contact" className="text-[#CC1016] hover:underline text-sm">Contact support if you continue to have issues</Link>
      </div>
    </div>
  );
}
