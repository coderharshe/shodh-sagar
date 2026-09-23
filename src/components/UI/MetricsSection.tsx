export default function MetricsSection() {
  const metrics = [
    { value: "50+", label: "International Journals" },
    { value: "10k+", label: "Published Papers" },
    { value: "15k+", label: "Global Researchers" },
    { value: "24/7", label: "Open Access" },
  ];

  return (
    <section className="relative w-full py-20 bg-brand-navy-light/80 backdrop-blur-md border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((metric, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 glass rounded-2xl hover:scale-105 transition-transform">
              <span className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 drop-shadow-lg">
                {metric.value}
              </span>
              <span className="text-brand-gold font-sans uppercase tracking-wider text-sm font-semibold">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
