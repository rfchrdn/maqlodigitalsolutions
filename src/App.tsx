import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import { Link } from 'react-router-dom';
import rioPhoto from './components/foto-rio.jpg';

function HomePage() {
  return (
    <main>
      <Hero />
      <Projects />
      <Services />
      <section id="about" className="py-12 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-[1px] bg-white/10 border border-white/10 overflow-hidden">
          <div className="lg:w-1/2 bg-brand-primary p-2">
            <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] overflow-hidden group">
              <img 
                src={rioPhoto} 
                alt="Rio Fachrudin" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-accent/10 pointer-events-none" />
              <div className="absolute top-4 left-4 md:top-8 md:left-8 border-l border-t border-accent w-8 h-8 md:w-12 md:h-12" />
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 border-r border-b border-accent w-8 h-8 md:w-12 md:h-12" />
            </div>
          </div>
          <div className="lg:w-1/2 bg-brand-primary p-8 md:p-12 lg:p-20 flex flex-col justify-center gap-6 md:gap-8 text-center lg:text-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">
                / THE VISIONARY BEHIND MAQLO
              </span>
              <h2 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.9] mt-4">
                Rio Fachrudin <br />
                <span className="text-accent underline decoration-white/10 decoration-2 underline-offset-[10px]">CEO & FOUNDER</span>
              </h2>
            </div>
            
            <p className="text-base md:text-lg text-white/40 leading-relaxed font-light mx-auto lg:mx-0 max-w-xl">
              Expert in problem identification and high-scale technical systems. With a professional background at PT. Aplikanusa Lintasarta, Rio brings engineering discipline to creative digital products.
            </p>
            
            <div className="grid grid-cols-2 gap-[1px] bg-white/10 bg-opacity-20 mt-2 md:mt-4">
              <div className="bg-brand-primary py-6 md:py-8">
                <h4 className="text-2xl md:text-4xl font-bold text-white tracking-tighter uppercase">Expert</h4>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 mt-1 md:mt-2">Data Pipelines</p>
              </div>
              <div className="bg-brand-primary py-6 md:py-8">
                <h4 className="text-2xl md:text-4xl font-bold text-white tracking-tighter uppercase">50+</h4>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 mt-1 md:mt-2">Projects</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 md:pt-6">
              <Link 
                to="/about" 
                className="px-8 py-4 md:py-5 bg-accent text-white text-center font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(37,99,235,0.15)]"
              >
                Read Detailed CV
              </Link>
              <a 
                href="https://wa.me/6288210421792" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 md:py-5 border border-white/20 text-white text-center font-bold uppercase tracking-widest text-[10px] md:text-xs hover:border-accent hover:text-accent transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
