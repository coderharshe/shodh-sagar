import Link from "next/link";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";

export default function ConferencesPage() {
  const conferences = [
    { title: "International Conference on Data Science", date: "Oct 15, 2026", location: "Gurugram, India" },
    { title: "Global Summit on Sustainable Development", date: "Nov 12, 2026", location: "Virtual" },
    { title: "Symposium on Quantum Computing", date: "Jan 20, 2027", location: "New Delhi, India" },
  ];

  return (
    <main className="min-h-screen bg-brand-navy pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-gold mb-8 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <h1 className="text-5xl font-serif font-bold text-white mb-6">Seminars & Conferences</h1>
        <p className="text-xl text-gray-400 font-sans max-w-2xl mb-12">
          Join our upcoming events to network with leading researchers and industry experts.
        </p>
        
        <div className="space-y-6">
          {conferences.map((conf, i) => (
            <div key={i} className="glass-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-brand-gold transition-colors duration-300">
              <div>
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-brand-gold transition-colors">{conf.title}</h3>
                <div className="flex flex-wrap gap-6 text-gray-400 font-sans text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-brand-gold" />
                    {conf.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-brand-gold" />
                    {conf.location}
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all font-sans font-bold whitespace-nowrap">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
