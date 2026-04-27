import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Github, Twitter, Linkedin, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSendMessage = async () => {
    setIsSending(true);
    setStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.details || data.error || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again later.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-white/10 border border-white/10">
        <div className="bg-brand-primary p-8 md:p-12 lg:p-20">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 uppercase leading-[0.9]">
            LET'S BUILD <br />
            SOMETHING <br />
            <span className="text-accent underline decoration-white/10 decoration-2 underline-offset-8">EXCEPTIONAL.</span>
          </h2>
          
          <div className="flex flex-col gap-8 mt-12">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center text-accent">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Direct Line</span>
                <a href="mailto:riofchrdn@gmail.com" className="text-lg md:text-xl font-medium hover:text-accent transition-colors underline-offset-8 underline decoration-accent/30 lowercase">
                  riofchrdn@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center text-accent">
                <MessageCircle size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">WhatsApp</span>
                <a 
                  href="https://wa.me/6288210421792" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg md:text-xl font-medium hover:text-accent transition-colors underline-offset-8 underline decoration-accent/30 lowercase"
                >
                  0882 1042 1792
                </a>
              </div>
            </div>
            
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 border border-white/5 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-brand-primary p-8 md:p-12 lg:p-20 border-t lg:border-t-0 lg:border-l border-white/10"
        >
          <form className="space-y-6 md:space-y-8" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 p-3 md:p-4 focus:border-accent outline-none transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 p-3 md:p-4 focus:border-accent outline-none transition-colors text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Project Summary</label>
              <textarea 
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-3 md:p-4 focus:border-accent outline-none transition-colors resize-none text-sm"
                placeholder="Tell us about your project..."
              />
            </div>
            
            <div className="pt-4">
              {status && (
                <div className={`p-4 text-xs uppercase tracking-widest font-bold mb-4 ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {status.message}
                </div>
              )}
              
              <button 
                type="submit"
                disabled={isSending}
                className="w-full py-4 md:py-5 bg-accent text-white font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? 'SENDING...' : 'SEND MESSAGE'} <ArrowRight size={16} md:size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
