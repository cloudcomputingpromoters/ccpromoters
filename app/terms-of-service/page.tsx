export const metadata = { title: 'Terms of Service | CCPromoters', description: 'CCPromoters terms of service governing use of our civil engineering recruitment platform.' };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0D0D0D] py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Terms of Service</h1>
        <p className="text-white/60 mt-2">Last updated: January 1, 2026</p>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-slate prose-headings:text-[#0D0D0D] prose-headings:font-bold prose-p:text-[#6B6B6B] prose-li:text-[#6B6B6B]">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the CCPromoters website and platform, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          <h2>2. Services Provided</h2>
          <p>CCPromoters operates a civil engineering recruitment platform connecting job-seeking engineers (Candidates) with engineering firms and organisations (Employers). Our services are free for Candidates. Employers are subject to separate fee agreements.</p>
          <h2>3. Candidate Obligations</h2>
          <p>Candidates agree to: provide accurate and truthful information on their profiles and applications; hold any professional credentials (PE, EIT, LEED, etc.) they represent themselves as holding; not apply for roles they are clearly unqualified for; and inform CCPromoters promptly if they accept a position and are no longer available.</p>
          <h2>4. Employer Obligations</h2>
          <p>Employers agree to: provide accurate job descriptions and compensation information; not use candidate profile information for purposes other than evaluating candidates for the specific role discussed; comply with all applicable employment laws including non-discrimination requirements; and pay agreed placement fees per the terms of any signed engagement agreement.</p>
          <h2>5. Intellectual Property</h2>
          <p>All content on the CCPromoters website — including text, graphics, logos, and software — is the property of CCPromoters or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>
          <h2>6. Limitation of Liability</h2>
          <p>CCPromoters acts as an intermediary between Candidates and Employers. We are not responsible for the conduct of either party after a placement is made. Our liability for any claim arising from our services is limited to the fees paid to us in the 12 months preceding the claim.</p>
          <h2>7. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved through binding arbitration in Dallas, Texas.</p>
          <h2>8. Contact</h2>
          <p>Questions about these Terms? Contact us at legal@ccpromoters.com.</p>
        </div>
      </section>
    </div>
  );
}
