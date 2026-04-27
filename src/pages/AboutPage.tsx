import { motion } from 'motion/react';
import { Mail, MessageSquare, Download, ArrowLeft, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import rioPhoto from '../components/foto-rio.jpg';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-primary text-white pt-32 pb-24 selection:bg-accent selection:text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-accent transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to Home</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Header & Image Area */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative group">
              <div className="absolute -inset-1 bg-accent/20 blur pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-white/5 border border-white/10 overflow-hidden">
                {/* Profile Photo of Rio Fachrudin */}
                <img 
                  src={rioPhoto} 
                  alt="Rio Fachrudin" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
              </div>
              
              <div className="mt-8 text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-2">
                  Rio Fachrudin
                </h1>
                <p className="text-accent uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold font-mono">
                  CEO & Founder
                </p>
                <div className="h-[2px] w-20 bg-accent mt-4 mx-auto lg:mx-0" />
              </div>

              <div className="mt-10 md:mt-12 flex flex-col gap-4">
                <a 
                  href="https://wa.me/6288210421792" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-accent text-white font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                >
                  <MessageSquare size={16} /> Contact Me (WhatsApp)
                </a>
                <a 
                  href="#" 
                  className="w-full py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-500"
                >
                  <Download size={16} /> Download CV (PDF)
                </a>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-7 space-y-12 md:space-y-16">
            <section>
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/30 block mb-6">/ Professional Statement</span>
              <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-light italic">
               "My experience in problem identification and technology-based solution design has contributed to enhancing operational efficiency. I take pride in building essential applications that advance modern service infrastructures."
              </p>
            </section>

            <section className="bg-white/3 border border-white/10 p-6 md:p-12">
              <h3 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-accent mb-8">Technical Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-4">Development Stack</h4>
                  <ul className="space-y-3 text-sm font-light text-white/60">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent" /> Next.js & React</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent" /> Laravel & CodeIgniter</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent" /> WordPress & Shopify</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-4">Logic & Systems</h4>
                  <ul className="space-y-3 text-sm font-light text-white/60">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent" /> ERP Business Logic</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent" /> Custom Web Architecture</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent" /> Problem Identification</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-white/30 mb-8 underline underline-offset-8 decoration-accent/50">Experience Highlights</h3>
              <div className="space-y-10">
                <div className="relative pl-6 md:pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] bg-accent rotate-45" />
                  <span className="text-[10px] text-accent font-bold font-mono">Present</span>
                  <h4 className="text-lg md:text-xl font-bold uppercase mt-1">CEO & Founder · Maqlo Digital Solutions</h4>
                  <p className="text-xs md:text-sm text-white/40 mt-2 font-light">Leading creative and technical strategy to deliver high-end digital products for global clients.</p>
                </div>
                
                <div className="relative pl-6 md:pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] bg-white/20 rotate-45" />
                  <span className="text-[10px] text-white/40 font-bold font-mono">Jan 2022 — Present</span>
                  <h4 className="text-lg md:text-xl font-bold uppercase mt-1">Engineer · PT. Aplikanusa Lintasarta</h4>
                  <p className="text-xs md:text-sm text-white/40 mt-2 font-light">Building and maintaining end-to-end data pipelines for billing and internal applications. Specialized in SQL optimization and high-volume data processing.</p>
                </div>

                <div className="relative pl-6 md:pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] bg-white/20 rotate-45" />
                  <span className="text-[10px] text-white/40 font-bold font-mono">Jan 2020 — Dec 2021</span>
                  <h4 className="text-lg md:text-xl font-bold uppercase mt-1">Senior Programmer · PT. Aplikanusa Lintasarta</h4>
                  <p className="text-xs md:text-sm text-white/40 mt-2 font-light">Owned end-to-end incident handling for billing systems. Delivered accurate data reporting and technical investigations.</p>
                </div>
              </div>
            </section>

            <section className="pt-8 flex gap-6 justify-center lg:justify-start">
              <a href="mailto:riofchrdn@gmail.com" className="hover:text-accent transition-colors"><Mail size={20}/></a>
              <a href="#" className="hover:text-accent transition-colors"><Linkedin size={20}/></a>
              <a href="#" className="hover:text-accent transition-colors"><Github size={20}/></a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
