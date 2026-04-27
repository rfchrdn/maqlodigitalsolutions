import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-4 md:mb-8"
          >
            <div className="h-[2px] w-6 md:w-8 bg-accent" />
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-accent">
              Engineering Digital Excellence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tighter uppercase"
          >
            WEB<br />
            <span className="text-accent underline decoration-white/10 decoration-2 underline-offset-[10px]">DEVELOPMENT</span><br />
            SOLUTIONS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-6 md:mt-8 text-base md:text-xl text-white/40 max-w-xl font-light leading-relaxed"
          >
            Specialists in building custom ERP systems, company profiles, and high-performance websites using Next.js, Laravel, CodeIgniter, Shopify, and WordPress.
          </motion.p>
          
          <div className="mt-10 lg:hidden">
             <a href="#projects" className="px-8 py-4 bg-accent text-[10px] uppercase tracking-widest font-bold inline-block">Explore Work</a>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-6xl md:text-8xl font-light text-white/5 mb-2 italic">2026</div>
            <div className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">
              Portfolio Collection
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background static grid lines (faint) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white" />
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white" />
      </div>
    </section>
  );
}
