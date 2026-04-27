import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/5 py-12 lg:h-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
        <div className="flex flex-col sm:flex-row gap-10 lg:gap-20 w-full lg:w-auto text-center sm:text-left">
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Local Time</p>
            <p className="text-sm font-medium uppercase">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} GMT+7</p>
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Status</p>
            <p className="text-sm font-medium flex items-center justify-center sm:justify-start gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
              </span>
              ACTIVE & READY
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-16 w-full lg:w-auto justify-center lg:justify-end">
          <div className="text-center sm:text-right">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Navigation</p>
            <p className="text-sm font-medium flex gap-4 justify-center sm:justify-end">
              <span className="hover:text-accent cursor-pointer transition-colors uppercase">LinkedIn</span>
              <span className="text-white/10">|</span>
              <span className="hover:text-accent cursor-pointer transition-colors uppercase">Github</span>
            </p>
          </div>
          <div className="w-full sm:w-auto flex flex-col items-center sm:items-end gap-2">
            <button className="w-full sm:w-auto px-8 py-4 md:py-3 bg-white text-black font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
              © 2026 MAQLO
            </button>
            <Link to="/admin" className="text-[8px] uppercase tracking-widest text-white/5 hover:text-white/20 transition-colors">CMS Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
