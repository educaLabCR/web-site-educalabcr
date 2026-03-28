'use client';
import { motion, Variants } from 'framer-motion';
import { 
  Users, Target, Heart, Award, Sparkles, BookOpen, 
  MessageSquare, Lightbulb, GraduationCap, CheckCircle,
  TrendingUp, Globe, ShieldCheck, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function AcercaDeNosotros() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const team = [
    {
      name: 'MSc. Jesús Real',
      role: 'Fundador & Especialista en Estudios Sociales',
      desc: 'Lic en evaluación, Máster en Administración Educativa y en Estudios Sociales y Educación Cívica.',
      initials: 'JR'
    },
    {
      name: 'MSc. Jorge Pérez',
      role: 'Fundador & Arquitecto Pedagógico',
      desc: 'MSc. En Administración Educativa y Licenciado en Educación y en Arquitectura.',
      initials: 'JP'
    },
    {
      name: 'Dr. Salomón Fernando Chaves',
      role: 'Estratega de IA & Innovación',
      desc: 'Académico experto en inteligencia artificial y tecnologías educativas aplicadas.',
      initials: 'SC'
    },
    {
      name: 'Lic. Fernando Xavier Alfaro Bonilla',
      role: 'Experto en evaluación de los aprendizajes y Enseñanza de los Estudios Sociales.',
      desc: 'Director de Investigación y Desarrollo de Tecnologías EducaLab.',
      initials: 'FA'
    },
    {
      name: 'Yolanda Patricia Quesada Quesada',
      role: 'Encargada del departamento de creaciones digitales, publicidad y atención al cliente.',
      desc: 'Gestión de comunicación integral y experiencia de usuario en entornos digitales.',
      initials: 'YQ'
    },
    {
      name: 'Yosuan Damian Maciel Multineddu',
      role: 'Desarrollador de Software & Arquitecto Full-Stack',
      desc: 'Experto en el desarrollo de infraestructuras escalables, diseño de interfaces dinámicas y soluciones tecnológicas avanzadas para educación.',
      initials: 'DM'
    },
    {
      name: 'Juan Manuel Rivera González',
      role: 'Estratega Digital',
      desc: 'Experto en el área de comunicación, publicidad y mercadeo de EducaLab.',
      initials: 'JM'
    }
  ];

  return (
    <main className="w-full bg-[#fcfcfc] overflow-hidden font-sans pb-24">
      
      {/* 1. Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-20 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-neon" />
            Conoce nuestra historia
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Transformando la <br/>
            <span className="text-primary-bright relative inline-block">
              Educación Virtual
              <svg className="absolute -bottom-2 -left-2 w-[110%] h-4 text-neon -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor"/>
              </svg>
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium mb-12">
            Somos una empresa 100% costarricense comprometida con facilitar el acceso a formación profesional de alta calidad para docentes y líderes del futuro.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Who We Are Section (Premium Mockup Style) */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative h-[450px]">
             {/* Decorative background elements */}
             <div className="absolute inset-0 bg-slate-100 rounded-[3rem] -z-10 transform rotate-3 scale-95 opacity-50"></div>
             
             {/* Main Graphic Card */}
             <div className="absolute inset-0 glass rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-8 p-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg"><Globe className="w-5 h-5"/></div>
                    <span className="font-bold text-slate-800">Impacto Regional</span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-neon/20 text-primary font-bold text-[10px] uppercase tracking-widest border border-neon/30">Costa Rica</div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Nuestro DNA</p>
                   <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6 italic">
                     "Innovación con <br/>propósito pedagógico"
                   </h3>
                   <div className="flex gap-4">
                      <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-50 flex-1">
                         <TrendingUp className="w-6 h-6 text-accent mb-2" />
                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Crecimiento</p>
                         <p className="font-bold text-slate-800 text-lg">+1000 Estudiantes</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-primary text-white shadow-lg flex-1">
                         <div className="flex -space-x-3 mb-2">
                           {[1,2,3].map(i => (
                             <div key={i} className="w-6 h-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"></div>
                           ))}
                         </div>
                         <p className="text-[10px] font-bold text-white/50 uppercase mb-1">Red Global</p>
                         <p className="font-bold text-white text-lg">LATAM Unido</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Floating elements */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-6 bg-white p-5 rounded-3xl shadow-2xl border border-slate-100 flex gap-4 items-center z-20"
             >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent"><Heart className="w-6 h-6 fill-current"/></div>
                <div>
                   <p className="font-black text-slate-900 text-lg leading-none">Calidad</p>
                   <p className="text-xs font-bold text-slate-400 uppercase mt-1">Garantizada</p>
                </div>
             </motion.div>

             <motion.div 
               animate={{ x: [0, 15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-6 -left-8 bg-primary rounded-2xl p-5 shadow-2xl shadow-primary/30 z-20"
             >
                <Award className="w-8 h-8 text-neon" />
             </motion.div>
          </div>

          <div>
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
               ¿Quiénes <span className="text-accent underline decoration-neon/50 underline-offset-8">somos</span>?
             </h2>
             <p className="text-slate-500 font-medium leading-relaxed mb-8 text-lg">
                EducaLabCR es una iniciativa educativa fundada por el MSc. Jesús Real y el MSc. Jorge Pérez, ambos comprometidos con la transformación de la educación virtual en nuestro país.
             </p>
             <p className="text-slate-500 font-medium leading-relaxed mb-10">
                A este equipo se suma el Dr. Salomón Fernando Chaves Cascante, experto en inteligencia artificial, quien fortalece nuestra propuesta con visión estratégica e innovación de vanguardia.
             </p>
             <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4 group cursor-default">
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <GraduationCap className="w-6 h-6" />
                   </div>
                   <span className="font-bold text-slate-800 text-lg">Visión Académica Sólida</span>
                </div>
                <div className="flex items-center gap-4 group cursor-default">
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ShieldCheck className="w-6 h-6" />
                   </div>
                   <span className="font-bold text-slate-800 text-lg">Compromiso con la Excelencia</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Objective & Commitment (2-Column Large Cards) */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            <div className="bg-white rounded-[3rem] p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
               <div className="absolute top-0 right-0 p-8">
                  <Target className="w-16 h-16 text-primary/5 group-hover:text-primary/10 transition-colors" />
               </div>
               <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 border border-primary/10">
                  <Target className="w-8 h-8" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 mb-6">Nuestro Objetivo</h3>
               <p className="text-slate-500 font-medium leading-relaxed text-lg italic">
                  "Impulsar tu crecimiento profesional con cursos accesibles, flexibles y actualizados, integrando IA y metodologías activas para transformar tu práctica."
               </p>
            </div>

            <div className="bg-[#1A1F36] rounded-[3rem] p-12 shadow-2xl shadow-slate-900/10 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
               <div className="absolute top-0 right-0 p-8">
                  <Heart className="w-16 h-16 text-white/5 group-hover:text-white/10 transition-colors" />
               </div>
               <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-neon mb-8 border border-white/10">
                  <Heart className="w-8 h-8 fill-current" />
               </div>
               <h3 className="text-3xl font-black text-white mb-6">Nuestro Compromiso</h3>
               <p className="text-slate-300 font-medium leading-relaxed text-lg">
                  Brindar un servicio de excelencia y calidad mediante una plataforma confiable, profesores preparados y un acompañamiento real en todo tu proceso.
               </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Methodology Section (3 Steps) */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
         <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
               Nuestra <span className="text-primary-bright">Diferencia</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
               Diseñamos una experiencia de aprendizaje que se adapta a tu vida, no al revés.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-slate-100 -z-10"></div>
            
            <div className="flex flex-col items-center">
               <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center text-primary mb-8 border-4 border-slate-50 relative z-10 transition-transform hover:scale-110">
                  <CheckCircle className="w-10 h-10" />
               </div>
               <h4 className="text-2xl font-black text-slate-900 mb-4">¿Qué ofrecemos?</h4>
               <p className="text-slate-500 font-medium text-sm leading-relaxed px-4">
                  Actualización constante orientada a la excelencia con un enfoque fuerte en Inteligencia Artificial.
               </p>
            </div>

            <div className="flex flex-col items-center">
               <div className="w-20 h-20 bg-primary shadow-xl rounded-full flex items-center justify-center text-neon mb-8 border-4 border-slate-50 relative z-10 transition-transform hover:scale-110">
                  <Sparkles className="w-10 h-10" />
               </div>
               <h4 className="text-2xl font-black text-slate-900 mb-4">Valor Agregado</h4>
               <p className="text-slate-500 font-medium text-sm leading-relaxed px-4">
                  Acceso 24/7, 365 días al año. Cuentas con autonomía total en una plataforma robusta y moderna.
               </p>
            </div>

            <div className="flex flex-col items-center">
               <div className="w-20 h-20 bg-neon shadow-xl rounded-full flex items-center justify-center text-primary mb-8 border-4 border-slate-50 relative z-10 transition-transform hover:scale-110">
                  <Lightbulb className="w-10 h-10" />
               </div>
               <h4 className="text-2xl font-black text-slate-900 mb-4">Metodología</h4>
               <p className="text-slate-500 font-medium text-sm leading-relaxed px-4">
                  Educación virtual asincrónica: cada persona aprende a su ritmo, eliminando barreras geográficas.
               </p>
            </div>
         </div>
      </section>

      {/* 5. Team Section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 pb-32">
        <div className="bg-[#fcfcfc] rounded-[3.5rem] p-12 md:p-20 border border-slate-100 shadow-sm relative overflow-hidden">
           {/* Background branding */}
           <div className="absolute -bottom-20 -right-20 text-[220px] font-black text-slate-900/[0.03] pointer-events-none select-none uppercase tracking-tighter">
              TEAM
           </div>
           
           <div className="flex flex-col gap-16">
              <div className="max-w-3xl">
                 <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                    El Liderazgo <br/><span className="text-primary-bright">Detrás de</span> la Misión
                 </h2>
                 <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed max-w-2xl">
                    Un equipo multidisciplinario que combina pedagogía, arquitectura y tecnología para crear el futuro hoy, impulsando la educación en Costa Rica y Latinoamérica.
                 </p>
                 <Link href="/contacto" className="inline-flex items-center justify-center bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-primary transition-all shadow-xl shadow-slate-900/10 gap-2">
                    <Users className="w-5 h-5" /> Contactar al Equipo
                 </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full relative z-10">
                 {team.map((member, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10 }}
                      className="bg-white p-10 rounded-[2.5rem] hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 group border border-slate-100 flex flex-col h-full"
                    >
                       <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl font-black text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                          {member.initials}
                       </div>
                       <h4 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{member.name}</h4>
                       <p className="text-primary-bright font-bold text-xs uppercase tracking-[0.15em] mb-6">{member.role}</p>
                       <p className="text-slate-500 text-[15px] leading-relaxed font-medium flex-1">
                          {member.desc}
                       </p>
                    </motion.div>
                 ))}
                 
              </div>
           </div>
        </div>
      </section>

      {/* 6. Big CTA Section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 mt-12">
         <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="0" cy="0" r="40" fill="white" />
                <circle cx="100" cy="100" r="40" fill="white" />
              </svg>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight relative z-10 leading-tight">
               ¿Listo para ser parte del <br/><span className="text-neon">Próximo Nivel</span> de tu Carrera?
            </h2>
            <Link href="/ofertas-en-vivo" className="inline-flex items-center justify-center bg-white text-primary px-10 py-5 rounded-full font-black text-lg hover:bg-neon hover:text-primary transition-all shadow-xl relative z-10 gap-3 group">
               Explorar Cursos 
               <BookOpen className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>
      </section>

    </main>
  );
}
