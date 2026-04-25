export const metadata = { title: 'Privacy Policy | CCPromoters', description: 'CCPromoters privacy policy — how we collect, use, and protect your personal data.' };

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0D0D0D] py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Privacy Policy</h1>
        <p className="text-white/60 mt-2">Last updated: January 1, 2026</p>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-slate prose-headings:text-[#0D0D0D] prose-headings:font-bold prose-p:text-[#6B6B6B] prose-li:text-[#6B6B6B]">
          <h2>1. Information We Collect</h2>
          <p>CCPromoters collects personal information that you provide directly to us when registering, submitting a resume, posting a job, or contacting us. This includes: name, email address, phone number, employment history, professional credentials (including PE license status), and resume documents.</p>
          <p>We also automatically collect certain technical information when you visit our website, including IP address, browser type, pages visited, and time spent on each page, through standard web analytics tools.</p>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to: match candidates with relevant job opportunities; present qualified candidates to hiring firms; communicate with you about your registration, applications, or job postings; send you job alerts and newsletters (with your consent); improve our website and services; and comply with legal obligations.</p>
          <p>We will never sell your personal information to third parties. We may share your profile information with potential employers only with your express consent as part of an active job search engagement.</p>
          <h2>3. Data Retention</h2>
          <p>We retain candidate profile information for up to three years from the date of last activity on your account. You may request deletion of your account and associated data at any time by contacting us at privacy@ccpromoters.com.</p>
          <h2>4. Cookies</h2>
          <p>We use essential cookies to operate the website and analytics cookies to understand usage patterns. You can control cookie preferences through our cookie banner or your browser settings. For more information, see our Cookie Policy.</p>
          <h2>5. Your Rights</h2>
          <p>Depending on your location, you may have rights to: access the personal data we hold about you; correct inaccurate data; request deletion of your data; object to certain processing activities; and data portability. To exercise these rights, contact us at privacy@ccpromoters.com.</p>
          <h2>6. Security</h2>
          <p>We implement industry-standard security measures to protect your personal information, including encrypted data transmission (TLS), secure password hashing, and access controls limiting who within CCPromoters can view candidate data.</p>
          <h2>7. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact our Data Protection Lead at: privacy@ccpromoters.com or 1400 Preston Road, Suite 400, Dallas, TX 75240.</p>
        </div>
      </section>
    </div>
  );
}
