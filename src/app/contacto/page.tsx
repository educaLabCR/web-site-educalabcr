'use client';
import { motion, Variants } from 'framer-motion';
import { 
  Smartphone, Globe, MessageSquare, Send, MapPin, 
  HelpCircle, Clock, CheckCircle, ArrowRight, ShieldCheck,
  Instagram, Facebook, Linkedin
} from 'lucide-react';
import { useState } from 'react';

export default function Contacto() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <main className="w-full bg-[#fcfcfc] overflow-hidden font-sans pb-24">
      
      {/* 1. Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 relative">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none -z-10" />

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="max-w-3xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/12 text-accent font-bold text-xs uppercase tracking-widest mb-6">
             <MessageSquare className="w-4 h-4" />
             Atención 24/7
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.05] mb-6 tracking-tight">
             <span className="text-primary-bright">Conecta</span> con <br/>
             <span className="relative inline-block text-slate-900">
                EducaLab
                <svg className="absolute -bottom-2 -left-2 w-[110%] h-4 text-neon -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor"/>
                </svg>
             </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium mb-12">
             ¿Tienes dudas sobre nuestros cursos, necesitas asesoría o quieres colaborar? Escríbenos y nuestro equipo te responderá de inmediato.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Contact Matrix Section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info Glass Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             
             {/* WhatsApp Card Premium */}
             <div className="bg-[#1A1F36] rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/10">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary opacity-20 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex justify-between items-start mb-10">
                   <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-neon border border-white/10 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                      <Smartphone className="w-8 h-8" />
                   </div>
                   <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-neon animate-pulse"></div>
                      <span className="text-xs font-bold text-neon uppercase tracking-widest">En Línea</span>
                   </div>
                </div>

                <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-2 uppercase">Canal Principal</p>
                <h3 className="text-3xl font-black mb-1">WhatsApp</h3>
                <p className="text-white/60 font-medium mb-8 leading-relaxed">Directo a nuestro equipo de asesoría.</p>
                
                <div className="font-bold text-2xl text-neon mb-10 tracking-tight">+(506) 7014-7031</div>
                
                <a 
                  href="https://wa.me/message/4C7ONIA7WR5ZF1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-[#427FE1] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all gap-2 shadow-lg shadow-blue-500/30 group/btn"
                >
                  Abrir Chat <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
             </div>

             {/* Secondary info cards */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                   <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-4">
                      <Globe className="w-6 h-6" />
                   </div>
                   <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase tracking-widest">Plataforma</h4>
                   <p className="text-slate-500 text-xs font-semibold uppercase">educalabcr.com</p>
                </div>
                <div className="glass p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                   <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
                      <HelpCircle className="w-6 h-6" />
                   </div>
                   <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase tracking-widest">Soporte</h4>
                   <p className="text-slate-500 text-xs font-semibold uppercase">Centro de Ayuda</p>
                </div>
             </div>

             {/* Social Bar */}
             <div className="flex gap-4 mt-4">
                {[
                  { Icon: Instagram, color: 'hover:text-pink-600 hover:bg-pink-50' },
                  { Icon: Facebook, color: 'hover:text-blue-600 hover:bg-blue-50' },
                  { Icon: Linkedin, color: 'hover:text-cyan-600 hover:bg-cyan-50' }
                ].map(({Icon, color}, i) => (
                  <div key={i} className={`w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 cursor-pointer shadow-sm transition-all duration-300 ${color}`}>
                     <Icon className="w-6 h-6" />
                  </div>
                ))}
             </div>
          </div>

          {/* Right: Modern Contact Form */}
          <div className="lg:col-span-7">
             <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl border border-slate-100 relative overflow-hidden group">
                
                {/* Form Header */}
                <div className="mb-12">
                   <h2 className="text-3xl font-black text-slate-900 leading-tight mb-3">Envíenos un <span className="text-accent underline decoration-neon/50 underline-offset-8">mensaje</span></h2>
                   <p className="text-slate-500 font-medium">Llene el formulario y le contactaremos en un máximo de 24 horas.</p>
                </div>

                <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2 relative">
                         <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1">Nombre Completo</label>
                         <input 
                            type="text" 
                            className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold placeholder:text-slate-300"
                            placeholder="Ej. María Quesada"
                         />
                      </div>
                      <div className="flex flex-col gap-2 relative">
                         <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1">Correo Electrónico</label>
                         <input 
                            type="email" 
                            className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold placeholder:text-slate-300"
                            placeholder="maria@correo.com"
                         />
                      </div>
                   </div>

                   <div className="flex flex-col gap-2 relative">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1">Asunto de interés</label>
                      <select className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none shadow-sm focus:border-primary focus:bg-white transition-all text-slate-900 font-bold appearance-none cursor-pointer">
                         <option>Inscripción a Cursos</option>
                         <option>Asesoría Pedagógica</option>
                         <option>Empresas & Convenios</option>
                         <option>Otro motivo</option>
                      </select>
                      {/* Custom select arrow snippet */}
                      <div className="absolute right-6 bottom-4.5 pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 rotate-90" />
                      </div>
                   </div>

                   <div className="flex flex-col gap-2 relative">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1">Mensaje</label>
                      <textarea 
                         rows={5}
                         className="bg-slate-50 border border-slate-100 rounded-[1.8rem] px-6 py-6 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold placeholder:text-slate-300 resize-none"
                         placeholder="Cuéntanos un poco más sobre lo que necesitas..."
                      />
                   </div>

                   <div className="pt-4">
                      <button className="flex items-center justify-center w-full bg-primary text-white px-8 py-5 rounded-[1.8rem] font-black text-lg hover:bg-primary-bright hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 gap-3 group/submit">
                         Enviar Mensaje 
                         <Send className="w-5 h-5 group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform" />
                      </button>
                      <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6 opacity-60">
                         Seguridad protegida por encriptación avanzada de datos.
                      </p>
                   </div>
                </form>

                {/* Decorative shapes behind form */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon opacity-5 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
             </div>
          </div>

        </div>
      </section>

      {/* 3. Global Reach Section (3 items) */}
      <section className="bg-slate-50 py-24 mb-10 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10 shadow-sm uppercase">
              Presencia Local · Visión Global
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              <div className="flex flex-col items-center md:items-start">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary mb-6 shadow-xl border border-slate-50">
                    <MapPin className="w-7 h-7" />
                 </div>
                 <h4 className="font-bold text-slate-900 text-lg mb-3">Costa Rica</h4>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4">"Nuestra base estratégica en el corazón de la educación costarricense."</p>
              </div>

              <div className="flex flex-col items-center md:items-start">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent mb-6 shadow-xl border border-slate-50">
                    <Clock className="w-7 h-7" />
                 </div>
                 <h4 className="font-bold text-slate-900 text-lg mb-3">Horario</h4>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed pl-4 border-l-2 border-accent/20">Lunes a Viernes · 8am - 6pm (CST) <br/>Plataforma disponible 24/7/365.</p>
              </div>

              <div className="flex flex-col items-center md:items-start">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-bright mb-6 shadow-xl border border-slate-50">
                    <ShieldCheck className="w-7 h-7" />
                 </div>
                 <h4 className="font-bold text-slate-900 text-lg mb-3">Certificación</h4>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed pl-4 border-l-2 border-primary-bright/20">Respaldo legal y académico en cada una de nuestras gestiones.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. Bottom Support CTA */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 pb-32">
         <div className="bg-[#1A1F36] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl z-0">
            <div className="w-full md:w-6/12 relative z-20">
              <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                 ¿Necesitas <span className="text-neon inline-block shadow-neon/40 shadow-sm border-b-4 border-neon/30 pb-1">Soporte Técnico</span> inmediato?
              </h3>
              <p className="text-slate-400 font-medium mb-10 leading-relaxed text-lg">
                 Nuestros ingenieros de plataforma están listos para ayudarte con cualquier inconveniente técnico en un santiamén.
              </p>
              <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-4 rounded-[2rem] border border-white/10 transition-colors inline-flex">
                 <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-neon font-black">ST</div>
                 <div>
                    <p className="text-white font-bold leading-tight uppercase tracking-tighter text-sm mb-1 uppercase">Soporte Tecnológico</p>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-1 uppercase">Resolución Ágil</p>
                 </div>
              </div>
            </div>

            <div className="w-full md:w-5/12 relative h-80 flex items-center justify-center overflow-hidden h-96">
               {/* Abstract floating shapes for tech feel */}
               <div className="absolute w-[80%] h-[80%] border-2 border-white/10 rounded-full animate-spin-slow"></div>
               <div className="absolute w-[60%] h-[60%] border-2 border-neon/5 rounded-full animate-reverse-spin-slow"></div>
               <div className="w-24 h-24 bg-neon rounded-3xl shadow-2xl shadow-neon/30 flex items-center justify-center z-20 hover:scale-110 transition-transform">
                  <CheckCircle className="w-12 h-12 text-primary" />
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
