import { motion } from 'motion/react';
import { Code, Layout, Smartphone, PieChart } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '1',
    title: 'Custom Web & ERP',
    description: 'Bespoke enterprise resource planning systems and complex web applications built with Next.js, Laravel, or CodeIgniter.',
    iconName: 'Code'
  },
  {
    id: '2',
    title: 'Company Profiles',
    description: 'Immersive and professional digital identities designed to present your brand with technical and aesthetic excellence.',
    iconName: 'Layout'
  },
  {
    id: '3',
    title: 'E-commerce Solutions',
    description: 'High-converting online stores built on Shopify, WordPress, or custom-engineered solutions for maximum scale.',
    iconName: 'Smartphone'
  },
  {
    id: '4',
    title: 'Technical Consulting',
    description: 'Strategic guidance on tech stack selection and digital architecture to ensure long-term scalability and security.',
    iconName: 'PieChart'
  }
];

const IconMap = {
  Code,
  Layout,
  Smartphone,
  PieChart
};

export default function Services() {
  return (
    <section id="services" className="py-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 border-l-2 border-accent pl-6 md:pl-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase lg:sticky lg:top-32">
              Technical <br /><span className="text-accent-light">Expertise</span>
            </h2>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-[1px] bg-white/10 border border-white/5">
            {services.map((service, i) => {
              const Icon = IconMap[service.iconName as keyof typeof IconMap];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group py-8 md:py-12 bg-brand-primary flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:bg-white/5 transition-colors px-6 md:px-8"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Icon size={20} md:size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/40 max-w-xl group-hover:text-white/60 transition-colors font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <span className="text-2xl font-bold text-white/5 group-hover:text-accent/20 transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
