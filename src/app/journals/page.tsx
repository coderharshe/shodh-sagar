import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import SceneWrapper from "@/components/Canvas/SceneWrapper";

const journals = [
  { title: "Shodh Sagar Journal of Inspiration and Psychology", url: "https://joi.shodhsagar.org/index.php/SSJOI" },
  { title: "Shodh Sagar Journal of Artificial Intelligence and Machine Learning", url: "https://jaiml.shodhsagar.org/index.php/j" },
  { title: "Shodh Sagar Journal of Language, Arts, Culture and Film", url: "https://jlacf.shodhsagar.org/index.php/j" },
  { title: "Shodh Sagar Journal of Electric Vehicles", url: "https://jev.shodhsagar.org/index.php/ssjev" },
  { title: "Indian Journal of Ayurveda & Alternative Medicines", url: "https://jaam.shodhsagar.org/index.php/j" },
  { title: "International Journal for Research Publication and Seminar", url: "https://jrpsjournal.in/index.php/j" },
  { title: "Universal Research Reports", url: "https://urr.shodhsagar.com/index.php/j" },
  { title: "Innovative Research Thought", url: "https://irt.shodhsagar.com" },
  { title: "Global International Research Thoughts", url: "http://girt.shodhsagar.com" },
  { title: "Darpan International Research Analysis", url: "https://dira.shodhsagar.com" },
  { title: "Indian Journal of Law", url: "https://law.shodhsagar.com/index.php/j" },
  { title: "Scientific Journal of Metaverse and Blockchain Technologies", url: "https://sjmbt.com/index.php/j" },
  { title: "Shodh Sagar Journal for Medical Research Advancement", url: "https://mra.shodhsagar.com/index.php/j" },
  { title: "Shodh Sagar Journal of Commerce & Economics", url: "https://jce.shodhsagar.co.in/index.php/ssjce" },
  { title: "Indian Journal of Renewable Energy", url: "https://energy.shodhsagar.co.in/index.php/ijre/index" },
  { title: "Indian Journal of Astrology and Occult", url: "https://ijastro.shodhsagar.co.in/index.php/ijao/index" },
  { title: "Indian Journal of Fashion Technology", url: "https://ijft.darpanonline.org/index.php/ijft" },
  { title: "Innovations in Sports Science", url: "https://iss.darpanonline.org/index.php/iss" },
  { title: "Modern Dynamics: Mathematical Progressions", url: "https://mathematics.moderndynamics.in/index.php/mdmp" },
  { title: "Modern Dynamics: Journal of Physics", url: "https://physics.moderndynamics.in" },
  { title: "Modern Dynamics: Journal of Chemistry", url: "https://chemistry.moderndynamics.in" },
  { title: "Journal of Quantum Science and Technology", url: "https://jqst.mindsynk.org/index.php/j" },
  { title: "Journal of Sustainable Solutions", url: "https://jss.thewriters.in/index.php/jss/index" },
  { title: "Journal of Advanced Management Studies", url: "https://jams.datatablets.com/index.php/j" },
  { title: "Journal of Multidisciplinary Knowledge", url: "https://jmk.datatablets.com/index.php/j" }
];

export default function JournalsPage() {
  return (
    <main className="w-full relative">
      <SceneWrapper />
      <div className="min-h-screen pt-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-brand-gold mb-8 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-5xl font-serif font-bold text-white mb-6 drop-shadow-lg">Our Journals</h1>
          <p className="text-xl text-gray-200 font-sans max-w-2xl mb-12">
            Explore our collection of peer-reviewed, multidisciplinary research journals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {journals.map((journal, i) => (
              <a 
                key={i} 
                href={journal.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-card p-8 min-h-[16rem] flex flex-col justify-between group hover:-translate-y-2 hover:border-brand-gold/50 transition-all duration-300 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-xl"
              >
                <div>
                  <h3 className="text-xl font-serif text-white mb-2 leading-tight group-hover:text-brand-gold transition-colors">{journal.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-brand-gold font-sans text-sm tracking-wide font-semibold mt-4">
                  Visit Journal <ExternalLink size={16} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
