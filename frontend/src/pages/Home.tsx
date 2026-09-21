import { useState, type FormEvent } from "react";
import { apiPost } from "@/lib/api";

const SERVICES = [
  { icon: "🌼", name: "Haldi Ceremony", description: "Traditional haldi celebration with authentic rituals and décor" },
  { icon: "💍", name: "Ring Ceremony", description: "Elegant ring ceremony arrangements with complete coordination" },
  { icon: "👰", name: "Wedding & Reception", description: "Grand wedding and reception planning with every detail covered" },
  { icon: "📸", name: "Photographer & Videographer", description: "Professional photography and cinematic videography" },
  { icon: "🎧", name: "DJ & Sound System", description: "Premium DJ and high-quality sound system for every event" },
  { icon: "🎺", name: "Live Band / Band Baja", description: "Traditional band baja and live music for baraat and ceremonies" },
  { icon: "🚘", name: "Vintage & Luxury Car", description: "Elegant vintage and luxury cars for the bride and groom" },
  { icon: "🐎", name: "Ghori / Wedding Horse", description: "Beautifully decorated wedding horse for the groom's baraat" },
  { icon: "🎨", name: "Mehndi Artist", description: "Expert mehndi artists for bridal and guest mehndi" },
  { icon: "🥁", name: "Dhol Wala", description: "Energetic dhol players to set the festive mood" },
  { icon: "✨", name: "Event Coordination", description: "Complete wedding event coordination and management" },
] as const;

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1600685890506-593fdf55949b?auto=format&fit=crop&w=1400&q=88", alt: "Wedding celebration" },
  { src: "https://images.unsplash.com/photo-1751257567128-a90534b263e6?auto=format&fit=crop&w=1200&q=85", alt: "Wedding ceremony" },
  { src: "https://images.unsplash.com/photo-1656814516314-65483701d219?auto=format&fit=crop&w=1000&q=85", alt: "Wedding décor" },
  { src: "https://images.unsplash.com/photo-1707414616417-f4c835c6a81a?auto=format&fit=crop&w=1000&q=85", alt: "Wedding festivities" },
  { src: "https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?auto=format&fit=crop&w=1000&q=85", alt: "Wedding details" },
];

interface EnquiryForm {
  full_name: string;
  phone_number: string;
  wedding_date: string;
  event_city: string;
  services_needed: string[];
  estimated_budget: string;
  message: string;
}

const EMPTY_FORM: EnquiryForm = {
  full_name: "",
  phone_number: "",
  wedding_date: "",
  event_city: "",
  services_needed: [],
  estimated_budget: "",
  message: "",
};

export default function Home() {
  const [form, setForm] = useState<EnquiryForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleService = (name: string) => {
    setForm((f) => ({
      ...f,
      services_needed: f.services_needed.includes(name)
        ? f.services_needed.filter((s) => s !== name)
        : [...f.services_needed, name],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await apiPost("/enquiries", form);
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="wedding-events-page" className="min-h-screen overflow-x-hidden bg-[#FAF6F0] text-[#1A1818]">
      <nav className="fixed top-0 z-50 w-full border-b border-[#E5D8C5] bg-[#FAF6F0]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="font-serif text-xl font-semibold tracking-tight text-[#7A1C2E] sm:text-2xl">Wedding Events</a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm font-medium text-[#655D56] transition-colors hover:text-[#7A1C2E]">Services</a>
            <a href="#gallery" className="text-sm font-medium text-[#655D56] transition-colors hover:text-[#7A1C2E]">Gallery</a>
            <a href="#contact" className="text-sm font-medium text-[#655D56] transition-colors hover:text-[#7A1C2E]">Contact</a>
          </div>
          <a href="tel:+919990018638" className="rounded-lg bg-[#7A1C2E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5A1422]">📞 Call Now</a>
        </div>
      </nav>

      <main id="top" data-testid="main-content" className="pt-[76px]">
        <section data-testid="hero-section" className="relative overflow-hidden border-b border-[#E5D8C5]">
          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#F3E5AB]/25 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:pb-24">
            <div className="relative z-10 animate-[fade-up_700ms_ease-out_both]">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Delhi NCR · Since your first yes</p>
              <h1 className="max-w-xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.03em] text-[#7A1C2E] sm:text-6xl lg:text-[5.8rem]">Every ritual,<br /><em className="font-normal text-[#1A1818]">beautifully</em> yours.</h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-[#655D56] sm:text-lg">From the first haldi bloom to the final dance, we bring every celebration, vendor and little detail together under one calm, capable roof.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="tel:+919990018638" className="rounded-lg bg-[#7A1C2E] px-6 py-3 text-center font-medium text-white transition-colors hover:bg-[#5A1422]">📞 Call 9990018638</a>
                <a href="https://wa.me/919990018638?text=Hello%2C%20I%20would%20like%20to%20plan%20my%20wedding%20celebration%20with%20you." target="_blank" rel="noreferrer" className="rounded-lg border border-[#1B4D3E] px-6 py-3 text-center font-medium text-[#1B4D3E] transition-colors hover:bg-[#1B4D3E] hover:text-white">💬 WhatsApp Us</a>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1600685890506-593fdf55949b?auto=format&fit=crop&w=1400&q=88" alt="Beautiful Indian wedding celebration" className="w-full rounded-2xl object-cover shadow-2xl" loading="eager" />
          </div>
        </section>

        <section id="services" className="border-b border-[#E5D8C5] bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">What we offer</p>
              <h2 className="font-serif text-3xl font-semibold text-[#7A1C2E] sm:text-4xl lg:text-5xl">Complete Wedding Services</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base text-[#655D56] sm:text-lg">One call, one point of contact. Every celebration detail handled with care.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <div key={s.name} className="group rounded-xl border border-[#E5D8C5] bg-[#FAF6F0] p-6 transition-all hover:border-[#D4AF37] hover:shadow-lg">
                  <span className="text-3xl">{s.icon}</span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-[#7A1C2E]">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#655D56]">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="border-b border-[#E5D8C5] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Our work</p>
              <h2 className="font-serif text-3xl font-semibold text-[#7A1C2E] sm:text-4xl lg:text-5xl">Celebration Gallery</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((img, i) => (
                <div key={i} className="group overflow-hidden rounded-xl">
                  <img src={img.src} alt={img.alt} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#E5D8C5] bg-[#7A1C2E] py-16 text-center text-white sm:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Ready to Plan Your Dream Wedding?</h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">One call is all it takes. Let us handle every detail while you enjoy every moment.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="tel:+919990018638" className="rounded-lg bg-[#D4AF37] px-8 py-3 font-medium text-[#1A1818] transition-colors hover:bg-[#C49B2F]">📞 Call 9990018638</a>
              <a href="tel:+919990018637" className="rounded-lg border border-white/30 px-8 py-3 font-medium text-white transition-colors hover:bg-white/10">📞 Call 9990018637</a>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Get in touch</p>
              <h2 className="font-serif text-3xl font-semibold text-[#7A1C2E] sm:text-4xl">Plan Your Celebration</h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-[#655D56]">Fill in your details and we'll get back to you within 24 hours.</p>
            </div>
            {submitted ? (
              <div className="rounded-xl border border-[#1B4D3E]/30 bg-[#1B4D3E]/5 p-8 text-center">
                <span className="text-4xl">🎉</span>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-[#1B4D3E]">Thank you!</h3>
                <p className="mt-2 text-[#655D56]">We've received your enquiry and will call you back soon.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 rounded-lg bg-[#7A1C2E] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5A1422]">Submit Another Enquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-[#E5D8C5] bg-white p-6 shadow-sm sm:p-8">
                {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#1A1818]">Full Name *</label>
                    <input type="text" required minLength={2} maxLength={120} value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} className="w-full rounded-lg border border-[#E5D8C5] bg-[#FAF6F0] px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#1A1818]">Phone Number *</label>
                    <input type="tel" required minLength={10} maxLength={20} value={form.phone_number} onChange={(e) => setForm((f) => ({ ...f, phone_number: e.target.value }))} className="w-full rounded-lg border border-[#E5D8C5] bg-[#FAF6F0] px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" placeholder="Your phone number" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#1A1818]">Wedding Date *</label>
                    <input type="date" required value={form.wedding_date} onChange={(e) => setForm((f) => ({ ...f, wedding_date: e.target.value }))} className="w-full rounded-lg border border-[#E5D8C5] bg-[#FAF6F0] px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#1A1818]">Event City *</label>
                    <input type="text" required minLength={2} maxLength={80} value={form.event_city} onChange={(e) => setForm((f) => ({ ...f, event_city: e.target.value }))} className="w-full rounded-lg border border-[#E5D8C5] bg-[#FAF6F0] px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" placeholder="Delhi, Noida, Gurugram..." />
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-[#1A1818]">Services Needed *</label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button key={s.name} type="button" onClick={() => toggleService(s.name)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${form.services_needed.includes(s.name) ? "border-[#7A1C2E] bg-[#7A1C2E] text-white" : "border-[#E5D8C5] bg-[#FAF6F0] text-[#655D56] hover:border-[#D4AF37]"}`}>{s.icon} {s.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1A1818]">Estimated Budget</label>
                  <input type="text" value={form.estimated_budget} onChange={(e) => setForm((f) => ({ ...f, estimated_budget: e.target.value }))} className="w-full rounded-lg border border-[#E5D8C5] bg-[#FAF6F0] px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" placeholder="Optional — e.g. ₹5-10 Lakhs" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1A1818]">Message</label>
                  <textarea rows={3} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="w-full resize-none rounded-lg border border-[#E5D8C5] bg-[#FAF6F0] px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" placeholder="Tell us about your dream celebration..." />
                </div>
                <button type="submit" disabled={submitting || form.services_needed.length === 0} className="w-full rounded-lg bg-[#7A1C2E] py-3 font-medium text-white transition-colors hover:bg-[#5A1422] disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Sending..." : "Send Enquiry"}</button>
              </form>
            )}
          </div>
        </section>

        <footer className="border-t border-[#E5D8C5] bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 text-center">
              <h3 className="font-serif text-xl font-semibold text-[#7A1C2E]">Wedding Events</h3>
              <p className="max-w-md text-sm text-[#655D56]">One point of contact for beautiful, stress-free celebrations across Delhi NCR and nearby areas.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+919990018638" className="text-sm font-medium text-[#7A1C2E] hover:underline">📞 9990018638</a>
                <a href="tel:+919990018637" className="text-sm font-medium text-[#7A1C2E] hover:underline">📞 9990018637</a>
                <a href="https://wa.me/919990018638" target="_blank" rel="noreferrer" className="text-sm font-medium text-[#1B4D3E] hover:underline">💬 WhatsApp</a>
              </div>
              <p className="text-xs text-[#655D56]/60">© 2026 Wedding Events. All rights reserved. · Delhi NCR</p>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E5D8C5] bg-white p-3 shadow-lg md:hidden">
        <div className="flex gap-2">
          <a href="tel:+919990018638" className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#7A1C2E] py-2.5 text-sm font-medium text-white">📞 Call</a>
          <a href="https://wa.me/919990018638?text=Hello%2C%20I%20would%20like%20to%20plan%20my%20wedding%20celebration%20with%20you." target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1B4D3E] py-2.5 text-sm font-medium text-white">💬 WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
