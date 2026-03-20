'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, PlayCircle, BookOpen, Building2, Star, Zap, MonitorPlay } from 'lucide-react';
import Link from 'next/link';

export default function HomeClasses() {
  return (
    <section className="px-6 md:px-12 py-24 bg-white/50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-pastel-green rounded-full blur-[100px] pointer-events-none -z-10 opacity-60"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-neon/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto border border-slate-200/60 bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Nuestras Modalidades
          </h2>
          <p className="text-lg text-slate-500 max-w-sm leading-relaxed font-medium">
            Estas son nuestras alternativas de estudio diseñadas para adaptarse a tu ritmo y objetivos profesionales.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Card 1 - Asincrónico */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="group rounded-4xl border-2 border-slate-100 p-6 flex flex-col justify-between bg-white shadow-xl shadow-slate-100/50 transition-all duration-300 hover:border-primary group-hover:bg-primary hover:bg-primary hover:shadow-primary/20 relative overflow-hidden"
          >
            {/* Background noise/pattern for hover state */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dots-left" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#ffffff" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots-left)" /></svg>
            </div>

            <div className="mb-6 flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 transition-colors duration-300 group-hover:text-white">Asincrónico</h3>
                <p className="text-slate-500 font-medium text-sm transition-colors duration-300 group-hover:text-white/70">Para quienes aprenden de manera autodidacta y a su propio ritmo.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-neon group-hover:text-primary group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-pastel-green rounded-3xl p-6 h-48 relative overflow-hidden flex items-center justify-center border border-primary/5 transition-colors duration-300 group-hover:bg-neon group-hover:border-transparent group-hover:shadow-inner z-10">
              <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center transition-colors duration-300 group-hover:bg-primary group-hover:shadow-lg">
                <BookOpen className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-neon" />
              </div>
              {/* Blur effect on hover */}
              <div className="absolute top-6 right-8 bg-pastel-green w-16 h-16 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm transition-all duration-300 group-hover:bg-white/90 group-hover:text-primary group-hover:shadow-md">
                24/7 Acceso
              </div>
              <MonitorPlay className="w-20 h-20 text-primary opacity-20 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
            </div>
          </motion.div>

          {/* Card 2 - En Vivo */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="group rounded-4xl border-2 border-transparent p-6 flex flex-col justify-between bg-primary shadow-2xl transition-all duration-300 shadow-primary/20 hover:bg-white hover:border-slate-100 hover:shadow-xl hover:shadow-slate-100/50 relative overflow-hidden"
          >
            {/* Background noise/pattern for un-hovered state */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dots-center" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#ffffff" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots-center)" /></svg>
            </div>

            <div className="mb-6 flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-slate-900">Clases en Vivo</h3>
                <p className="text-white/70 font-medium text-sm transition-colors duration-300 group-hover:text-slate-500">Para quienes buscan interacción en tiempo real y asesoría directa.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-neon text-primary flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-slate-100 group-hover:text-slate-900 group-hover:scale-100">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-neon rounded-3xl p-6 h-48 overflow-hidden flex items-center justify-center shadow-inner relative z-10 transition-colors duration-300 group-hover:bg-pastel-green group-hover:shadow-none border border-transparent group-hover:border-primary/5">
              <div className="absolute top-4 left-4 w-12 h-12 bg-primary rounded-xl shadow-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-white group-hover:shadow-sm">
                <PlayCircle className="w-6 h-6 text-neon transition-colors duration-300 group-hover:text-primary" />
              </div>
              <div className="absolute top-6 right-8 bg-pastel-green w-16 h-16 rounded-full blur-[20px] transition-opacity duration-300 group-hover:opacity-0"></div>
              <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 rounded-lg text-xs font-bold text-primary shadow-md transition-all duration-300 group-hover:bg-white/80 group-hover:text-slate-700 group-hover:shadow-sm">
                Interactivo
              </div>
              <Zap className="w-20 h-20 text-primary transition-all duration-500 group-hover:scale-95 group-hover:opacity-20" />
            </div>
          </motion.div>

          {/* Card 3 - Institucional */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="group rounded-4xl border-2 border-slate-100 p-6 flex flex-col justify-between bg-white shadow-xl shadow-slate-100/50 transition-all duration-300 hover:border-primary hover:bg-primary hover:shadow-primary/20 relative overflow-hidden"
          >
            {/* Background noise/pattern for hover state */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dots-right" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#ffffff" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots-right)" /></svg>
            </div>

            <div className="mb-6 flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 transition-colors duration-300 group-hover:text-white">Institucional</h3>
                <p className="text-slate-500 font-medium text-sm transition-colors duration-300 group-hover:text-white/70">Para organizaciones que necesitan capacitar a su personal eficientemente.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-neon group-hover:text-primary group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-pastel-green rounded-3xl p-6 h-48 relative overflow-hidden flex items-center justify-center border border-primary/5 transition-colors duration-300 group-hover:bg-neon group-hover:border-transparent group-hover:shadow-inner z-10">
              <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center transition-colors duration-300 group-hover:bg-primary group-hover:shadow-lg">
                <Building2 className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-neon" />
              </div>
              {/* Blur effect on hover */}
              <div className="absolute top-6 right-8 bg-pastel-green w-16 h-16 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5 transition-all duration-300 group-hover:bg-white/90 group-hover:text-primary group-hover:shadow-md">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> B2B
              </div>
              <UsersIcon className="w-20 h-20 text-primary opacity-20 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
            </div>
          </motion.div>

        </div>

        {/* Footer Text Area */}
        <div className="flex flex-col items-center justify-center text-center relative py-12">
          {/* Decorative shapes resembling the stars in the image */}
          <div className="absolute left-[10%] top-[20%] text-primary-bright opacity-60">
            <Sparkles className="w-12 h-12" strokeWidth={1.5} />
          </div>
          <div className="absolute right-[15%] bottom-[30%] text-neon">
            <div className="absolute inset-0 text-yellow-500 w-10 h-10">
              <Star className="w-full h-full fill-current" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
            Sigue <span className="text-primary">aprendiendo</span> hasta<br className="hidden md:block"/> 
            alcanzar tu <span className="text-primary">mejor versión.</span>
          </h2>

          <div className="flex flex-col items-center">
            <h4 className="font-bold text-slate-800 text-lg">EducaLab Costa Rica</h4>
            <p className="text-slate-500 text-sm">Plataforma de Educación Inteligente</p>
          </div>
        </div>

        {/* Footer Separator & Copyright Line */}
        <div className="mt-8 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
          <p>Copyright EducaLab.</p>
          
          <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm bg-slate-50">
            EL
          </div>
          
          <p>Innovación Educativa . 2026</p>
        </div>

      </div>
    </section>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
