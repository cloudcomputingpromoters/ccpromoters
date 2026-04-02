import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "CCPromoters | Civil Engineering Staffing & Recruitment",
  description: "Building the Future, One Engineer at a Time. CCPromoters connects civil engineering professionals with top engineering firms, government agencies, and construction companies across all disciplines.",
  keywords: "civil engineering jobs, structural engineer jobs, transportation engineer, geotechnical engineer, civil engineering recruitment, PE licensed engineer",
  openGraph: {
    title: "CCPromoters | Civil Engineering Staffing & Recruitment",
    description: "The civil engineering talent partner that speaks your language. 200+ active roles across all disciplines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        <div id="scroll-progress" />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('scroll', function() {
                var el = document.getElementById('scroll-progress');
                if (el) {
                  var scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                  el.style.width = scrolled + '%';
                }
                var btn = document.getElementById('back-to-top');
                if (btn) {
                  btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
