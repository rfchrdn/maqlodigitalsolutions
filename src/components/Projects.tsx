import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight, Loader2, X, Globe, Github as GithubIcon } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-accent" size={32} />
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-4"
            >
              Selected <span className="text-accent underline decoration-white/10 decoration-2 underline-offset-8">Work</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/40 max-w-sm font-light text-sm md:text-base"
            >
              Building digital excellence through custom web development, ERP systems, and high-performance solutions.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 hidden md:block"
          >
            / Case Studies
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 border border-white/10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-brand-primary aspect-video md:aspect-[4/5] overflow-hidden flex flex-col justify-between p-6 md:p-10 cursor-pointer"
              onClick={() => {
                setSelectedProject(project);
                setActiveMediaIndex(0);
              }}
            >
              {/* Background with higher opacity on mobile for readability */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/80 md:bg-brand-primary/95 group-hover:bg-brand-primary/40 transition-colors duration-700 z-10" />
                {project.media && project.media[0] ? (
                  project.media[0].type === 'image' ? (
                    <img 
                      src={project.media[0].url} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale md:grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    />
                  ) : (
                    <video 
                      src={project.media[0].url} 
                      muted 
                      loop 
                      autoPlay 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                    />
                  )
                ) : project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale md:grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                ) : null}
              </div>

              {/* Title Section */}
              <div className="relative z-10">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-3 block">
                  0{i + 1} // {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight leading-none group-hover:text-white transition-colors duration-500">
                  {project.title}
                </h3>
              </div>
              
              {/* Info Section - Now always visible or semi-visible on mobile */}
              <div className="relative z-20 mt-8">
                <div className="flex justify-between items-end gap-4 translate-y-2 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs md:text-sm text-white/60 font-light max-w-[75%] line-clamp-3 md:line-clamp-none md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.description}
                  </p>
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-accent group-hover:border-accent transition-all duration-500 rounded-full md:rounded-none">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
              
              {/* Reveal Overlay effect for desktop */}
              <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/20 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Popup/Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-primary/95 backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-brand-primary border border-white/10 flex flex-col lg:flex-row overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] max-h-[90vh]"
            >
              {/* Close Icon */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-3 text-white/40 hover:text-white hover:rotate-90 transition-all duration-500"
              >
                <X size={32} />
              </button>

              {/* Photo/Video Area */}
              <div className="w-full lg:w-3/5 h-[300px] md:h-[400px] lg:h-auto overflow-hidden relative flex flex-col group/media">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMediaIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    {selectedProject.media && selectedProject.media[activeMediaIndex]?.type === 'video' ? (
                      <video 
                        src={selectedProject.media[activeMediaIndex].url} 
                        controls 
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={selectedProject.media ? selectedProject.media[activeMediaIndex]?.url : selectedProject.imageUrl} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent lg:hidden pointer-events-none" />
                
                {/* Media Thumbnails if multiple */}
                {selectedProject.media && selectedProject.media.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {selectedProject.media.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMediaIndex(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${idx === activeMediaIndex ? 'bg-accent w-6' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Text Area */}
              <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-14 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-accent font-bold block mb-4">
                      Project Details / {selectedProject.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.95] mb-6">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="w-12 h-1 bg-accent/30" />

                  <div className="space-y-6">
                    <p className="text-white/60 text-sm md:text-base font-light leading-relaxed whitespace-pre-wrap">
                      {selectedProject.description}
                    </p>
                    
                    {/* Tech Stack display */}
                    {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4">
                        {selectedProject.techStack.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 text-[9px] uppercase tracking-widest text-white/40 font-bold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5">
                  {selectedProject.link && (
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 px-8 py-4 bg-accent text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-2 group"
                    >
                      <Globe size={14} className="group-hover:rotate-12 transition-transform" /> 
                      Live Preview
                    </a>
                  )}
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 px-8 py-4 border border-white/10 text-white/60 font-bold text-[10px] uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all duration-500 flex items-center justify-center gap-2 group"
                    >
                      <GithubIcon size={14} className="group-hover:scale-110 transition-transform" /> 
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
