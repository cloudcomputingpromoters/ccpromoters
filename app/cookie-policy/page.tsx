export const metadata = { title: 'Cookie Policy | CCPromoters', description: 'How CCPromoters uses cookies and similar technologies on our website.' };

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0D0D0D] py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Cookie Policy</h1>
        <p className="text-white/60 mt-2">Last updated: January 1, 2026</p>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-slate prose-headings:text-[#0D0D0D] prose-headings:font-bold prose-p:text-[#6B6B6B] prose-li:text-[#6B6B6B]">
          <h2>What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how visitors use the site.</p>
          <h2>Cookies We Use</h2>
          <h3>Essential Cookies</h3>
          <p>These cookies are necessary for the website to function. They include session cookies that keep you logged into your account, CSRF protection tokens, and authentication state cookies. You cannot opt out of essential cookies while using the site.</p>
          <h3>Analytics Cookies</h3>
          <p>We use analytics cookies to understand how visitors interact with our website — which pages are most visited, how long sessions last, and where visitors come from. This data is aggregated and anonymous. You can opt out of analytics cookies at any time.</p>
          <h3>Preference Cookies</h3>
          <p>These cookies remember your preferences — such as saved job searches, filter settings, and display preferences — so you do not have to re-enter them on each visit.</p>
          <h2>Managing Cookies</h2>
          <p>You can control and manage cookies in several ways: through the cookie preference centre on our website; through your browser settings (most browsers allow you to block or delete cookies); and through opt-out tools provided by analytics providers.</p>
          <p>Note that blocking all cookies may affect the functionality of certain features of our website, including the ability to stay logged in.</p>
          <h2>Third-Party Cookies</h2>
          <p>Our website may include content from third parties (such as embedded maps or video players) that may set their own cookies. We do not control these cookies. Please review the privacy policies of these third parties for more information.</p>
          <h2>Contact</h2>
          <p>Questions about our use of cookies? Contact us at privacy@ccpromoters.com.</p>
        </div>
      </section>
    </div>
  );
}
