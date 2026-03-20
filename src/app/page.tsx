'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Zap, Users, PlayCircle, ShieldCheck, Star, LineChart, 
  Globe, Briefcase, Award, TrendingUp, MonitorPlay, MessageCircle, FileText, Smartphone
} from 'lucide-react';

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <main className="w-full bg-[#fcfcfc] overflow-hidden font-sans">
      
      {/* 1. Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-xl relative z-10">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Transforma tu carrera online
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Potencia tu <span className="text-primary relative inline-block">
                Futuro
                {/* Decoration behind text */}
                <svg className="absolute -bottom-2 -left-2 w-[110%] h-4 text-neon -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor"/>
                </svg>
                {/* Orange spark decoration */}
                <div className="absolute -top-6 -right-8 w-10 h-10 bg-accent rounded-full flex items-center justify-center -z-10 blur-[2px] opacity-20"></div>
                <div className="absolute -top-4 -right-2 text-accent">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </span><br/>
              Profesional
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg text-slate-500 leading-relaxed mb-10 font-medium">
              EducaLab es una innovadora herramienta de formación enfocada en potenciar tus habilidades profesionales con eficiencia y simplicidad.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link href="/ofertas-en-vivo" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary transition-all shadow-xl shadow-slate-900/10 gap-2">
                Comenzar Ahora
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Mockup Hero */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="relative h-[550px] hidden lg:block">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white rounded-3xl border border-slate-100 shadow-2xl flex flex-col overflow-hidden p-6 z-0 transform translate-x-12 translate-y-6">
              {/* Fake dashboard header */}
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><ShieldCheck className="w-4 h-4"/></div>
                  <div className="font-bold text-slate-800">Panel Docente</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-16 h-4 bg-slate-100 rounded-full"></div>
                  <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
                </div>
              </div>
              {/* Fake dashboard content */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-50 shadow-sm h-32 flex flex-col justify-between">
                  <p className="text-xs text-slate-400 font-bold uppercase">Progreso Global</p>
                  <p className="text-3xl font-bold text-slate-800">86.4<span className="text-lg text-slate-400">%</span></p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-50 shadow-sm h-32 flex flex-col justify-end gap-2">
                  <div className="flex items-end gap-1.5 h-16">
                    {[30, 50, 40, 70, 90, 60, 100].map((h, i) => (
                      <div key={i} className="w-full bg-slate-100 rounded-sm" style={{height: `${h}%`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating primary card offset */}
            <div className="absolute top-1/2 left-0 -translate-y-[40%] -translate-x-12 w-[340px] bg-primary text-white p-6 rounded-3xl shadow-2xl shadow-primary/30 z-20 hover:-translate-y-[42%] transition-transform duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Award className="w-6 h-6 text-neon" />
                </div>
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm">Certificado</span>
              </div>
              <h3 className="text-lg font-bold text-white/80 mb-1">Módulo Completado</h3>
              <p className="text-4xl font-extrabold text-white mb-2">Diseño UI/UX</p>
              <div className="flex items-center justify-between text-sm text-white/50 border-t border-white/10 pt-4 mt-6">
                <span>Nota Final: 98/100</span>
                <span className="flex items-center gap-1 text-neon font-bold">
                  <CheckCircle className="w-4 h-4"/> Aprobado
                </span>
              </div>
            </div>

            {/* Floating secondary card offset */}
            <div className="absolute -bottom-6 right-10 w-[260px] bg-white p-5 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 z-30 flex gap-4 items-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Aprendizaje</p>
                <p className="text-sm font-medium text-slate-500">+25% efectividad</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trusted By Banner */}
      <section className="border-y border-slate-100 bg-white/50 backdrop-blur-sm py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Con la confianza de expertos</p>
          <div className="flex gap-10 items-center">
            <div className="flex items-center gap-3">
              <h4 className="text-3xl font-black text-slate-800">4.8</h4>
              <div className="flex flex-col">
                <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                <span className="text-xs font-bold text-slate-400 uppercase">Estudiantes</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h4 className="text-3xl font-black text-slate-800">4.9</h4>
              <div className="flex flex-col">
                <div className="flex text-accent"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                <span className="text-xs font-bold text-slate-400 uppercase">Empresas</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <h4 className="text-3xl font-black text-slate-800">4.8</h4>
              <div className="flex flex-col">
                <div className="flex text-primary-bright"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                <span className="text-xs font-bold text-slate-400 uppercase">Profesores</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Feature 1 (Card Left, Text Right) */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            <span className="text-primary-bright">Impulsa</span> tu Formación <br />Profesional con nosotros
          </h2>
        </div>
        
        <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-16 border border-slate-100">
          <div className="w-full md:w-1/2 relative h-80 flex justify-center items-center">
             {/* Floating UI Elements Left */}
             <div className="absolute w-[80%] h-48 bg-neon rounded-2xl shadow-xl shadow-neon/20 z-10 p-6 flex flex-col justify-between -rotate-3 hover:rotate-0 transition-transform">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><LineChart className="w-4 h-4"/></div>
                    <span className="font-bold text-primary">Rendimiento</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-white/50"></div><div className="w-6 h-6 rounded-full bg-white/50 -ml-3"></div><div className="w-6 h-6 rounded-full bg-white/50 -ml-3"></div>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-black text-primary mb-1">92.5%</p>
                  <p className="text-xs text-primary/70 font-semibold uppercase tracking-wider">Tasa de Aprobación Média</p>
                </div>
             </div>
             
             {/* Background pillar fake graph */}
             <div className="absolute bottom-0 w-[80%] h-40 bg-white rounded-xl shadow-sm border border-slate-100 flex items-end justify-between px-6 pb-4">
                <div className="w-12 h-20 bg-slate-100 rounded-t-md"></div>
                <div className="w-12 h-14 bg-slate-100 rounded-t-md"></div>
                <div className="w-12 h-32 bg-gradient-to-t from-primary to-neon rounded-t-md"></div>
                <div className="w-12 h-24 bg-slate-100 rounded-t-md"></div>
                <div className="w-12 h-16 bg-slate-100 rounded-t-md"></div>
             </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Panel de Progreso <br/><span className="text-slate-500">Educativo Avanzado</span></h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              Mantén el seguimiento de tu crecimiento formativo con estadísticas visuales, análisis de tiempo y predicción inteligente basada en tus hábitos.
            </p>
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                 <CheckCircle className="w-5 h-5 text-accent" /> Clases interactivas
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                 <CheckCircle className="w-5 h-5 text-accent" /> Control de avance
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                 <CheckCircle className="w-5 h-5 text-accent" /> Múltiples instructores
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                 <CheckCircle className="w-5 h-5 text-accent" /> Material didáctico
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature 2 (Text Left, Card Right) */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 mb-20">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 flex flex-col-reverse md:flex-row items-center gap-16 border border-slate-100 shadow-xl shadow-slate-100/50">
          
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              <span className="text-accent">Gestiona</span> Todo<br/> Tu Aprendizaje
            </h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed max-w-sm">
              Nuestra plataforma te notifica recordatorios importantes, plazos de entregas y te permite interactuar fluídamente con todos tus recursos de estudio.
            </p>
            <Link href="/about" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-slate-800 transition-all">
              Ver Plataforma
            </Link>
          </div>

          <div className="w-full md:w-1/2 relative h-[350px] flex justify-center items-center">
             {/* Main Graphic Card */}
             <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full border border-slate-100 shadow-inner overflow-hidden flex items-center justify-center">
                {/* Fake pie chart with css conic gradient */}
                <div className="w-48 h-48 rounded-full shadow-md" style={{background: 'conic-gradient(var(--color-primary-bright) 0% 60%, var(--color-neon) 60% 85%, var(--color-accent) 85% 100%)'}}></div>
                {/* White center to make a donut chart */}
                <div className="absolute w-32 h-32 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avance</p>
                   <p className="text-2xl font-black text-slate-900">75<span className="text-sm">%</span></p>
                </div>
             </div>

             {/* Floating Access Card */}
             <div className="absolute left-0 top-10 w-52 bg-primary rounded-2xl p-5 shadow-2xl shadow-primary/30 z-20">
                <div className="flex items-center gap-3 mb-4 border-b border-primary-bright/20 pb-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm"><MonitorPlay className="w-5 h-5 text-white"/></div>
                  <div>
                    <h4 className="text-white font-bold text-sm leading-tight">Módulo Activo</h4>
                    <span className="text-xs text-neon">Programación</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-white/80 text-xs">Termina en<br/><span className="text-white font-bold text-lg">14 días</span></div>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-neon"/></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. 3 Column Cards (Send Money Across the Globe -> Alumnos de Toda Latam) */}
      <section className="bg-slate-50 py-24 mb-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            <span className="text-primary-bright">Comunidad</span> Global de<br/>Estudio Conectada
          </h2>
          <p className="text-slate-500 font-medium mb-16 max-w-lg mx-auto leading-relaxed">
            Plataforma diseñada para derribar fronteras. Únete o recibe capacitación con colegas de innumerables puntos de Latinoamérica.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Column 1 */}
            <div className="flex flex-col">
              <div className="bg-[#EDF2FE] h-64 rounded-3xl mb-6 p-8 flex items-center justify-center shrink-0">
                <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-blue-50 w-full h-full relative overflow-hidden flex flex-col">
                  <h4 className="font-bold text-slate-800 text-sm mb-4">Ubicaciones Relevantes</h4>
                  <div className="flex gap-2 flex-wrap">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 shadow-sm border border-white">CR</div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-600 shadow-sm border border-white">MX</div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-600 shadow-sm border border-white">CO</div>
                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center font-bold text-cyan-600 shadow-sm border border-white">AR</div>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Presencia Regional</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Conéctate e infórmate sobre ofertas académicas a nivel mundial sin complicaciones.</p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              <div className="bg-[#F0FDF4] h-64 rounded-3xl mb-6 p-8 flex items-center justify-center shrink-0">
                <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-green-50 w-full h-full relative overflow-hidden flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4 bg-slate-50 p-2 rounded-xl">
                    <span className="font-semibold text-slate-700 text-sm">$ USD / CRC</span>
                    <span className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center"><TrendingUp className="w-4 h-4 text-primary"/></span>
                  </div>
                  <div className="flex items-center justify-between bg-neon p-2 rounded-xl">
                    <span className="font-bold text-primary text-sm">Pago Flexible</span>
                    <span className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-primary"/></span>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Multi-moneda y Facilidades</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Accede a las opciones de capacitación gestionando pagos de forma centralizada y transparente.</p>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              <div className="bg-[#FAF5FF] h-64 rounded-3xl mb-6 p-8 flex items-center justify-center shrink-0">
                <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-purple-50 w-full h-full relative overflow-hidden flex flex-col items-center justify-center">
                  <div className="font-bold text-slate-800 text-sm w-full text-center border-b border-slate-50 pb-2 mb-3">Red de Colegas</div>
                  <div className="flex justify-center -space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-white shadow-sm flex flex-col items-center justify-center text-xs font-bold text-accent">+</div>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Colaboración Ilimitada</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Forma grupos de estudio, comparte tus avances y recibe feedback constante.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Another Feature Section (Blue/Purple Card -> Excellence) */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            Descubre tu <span className="text-accent inline-block pb-2 border-b-4 border-accent">Potencial</span> <br/>Auténtico con Nosotros
          </h2>
        </div>

        <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-16 border border-slate-100">
          
          {/* Card Overlaps Visualization */}
          <div className="w-full md:w-1/2 relative h-80 flex justify-center items-center perspective-1000">
            {/* Back Card */}
            <div className="absolute w-[80%] h-48 bg-gradient-to-br from-primary to-slate-900 rounded-2xl shadow-xl z-0 transform -rotate-12 translate-x-4 p-6 text-white border border-slate-700/50">
              <div className="font-black tracking-widest text-white/20 text-3xl mb-4">CERTIFICACIÓN</div>
              <div className="text-white/50 text-xs uppercase font-bold tracking-widest mt-12">Aval Académico</div>
            </div>
            {/* Front Card */}
            <div className="absolute w-[85%] h-52 bg-gradient-to-r from-accent to-orange-400 rounded-2xl shadow-2xl z-10 transform rotate-[-3deg] -translate-x-4 p-6 text-white flex flex-col justify-between border border-white/20 backdrop-blur-md">
              <div className="flex justify-between items-start">
                <ShieldCheck className="w-8 h-8 text-white/50" />
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-widest opacity-80 mb-1">PROGRAMA PREMIUM</p>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-black">Certificado Oficial</p>
                  <p className="font-bold bg-white text-accent px-3 py-1 rounded-full text-xs shadow-sm">Verificado</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative z-20">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Alcanza la <span className="text-primary">Excelencia<br/>Académica</span></h3>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
              Obtén credenciales sólidas a través de un sistema de evaluación contínuo y metodologías modernas que garantizan un aprendizaje duradero.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <Award className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800 text-lg">Reconocimientos de Nivel</h4>
                    <p className="text-slate-500 text-sm font-medium mt-1 leading-relaxed">Avalamos tu esfuerzo con certificados validados que impulsan tu CV hacia nuevas oportunidades laborales.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-neon/30 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <Briefcase className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800 text-lg">Enfoque Profesional</h4>
                    <p className="text-slate-500 text-sm font-medium mt-1 leading-relaxed">Contenido moldeado junto con líderes de la industria para garantizar su relevancia inmediata.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Integrate with tools */}
      <section className="bg-white py-24 mb-16 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-5/12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              <span className="text-primary-bright">Integración</span> con tus Herramientas Favoritas
            </h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
              Contecta nuestro entorno educativo con el software que ya usas día a día para simplificar entregas y mantener la organización impecable.
            </p>
            <Link href="/contacto" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-slate-800 transition-all">
              Explorar Integraciones
            </Link>
          </div>
          
          <div className="w-full md:w-6/12 relative h-80 flex items-center justify-center">
             {/* Center icon */}
             <div className="w-20 h-20 bg-primary rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center z-20 relative">
               <Globe className="w-10 h-10 text-neon" />
               
               {/* Connecting lines */}
               <svg className="absolute inset-[-150px] w-[380px] h-[380px] -z-10 text-slate-200 stroke-[1.5px]" fill="none">
                 <path d="M190,190 L100,50" />
                 <path d="M190,190 L280,50" />
                 <path d="M190,190 L50,190" />
                 <path d="M190,190 L330,190" />
                 <path d="M190,190 L100,330" />
                 <path d="M190,190 L280,330" />
               </svg>
             </div>
             
             {/* Surrounding floating tool icons */}
             {/* Note: Just using Lucide icons as placeholders for tools like Google, Slack, Figma */}
             <div className="absolute top-4 left-16 w-14 h-14 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500"><MessageCircle className="w-6 h-6"/></div>
             <div className="absolute top-4 right-16 w-14 h-14 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500"><MonitorPlay className="w-6 h-6"/></div>
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500"><FileText className="w-6 h-6"/></div>
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-pink-500"><Smartphone className="w-6 h-6"/></div>
             <div className="absolute bottom-4 left-16 w-14 h-14 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-orange-500"><Award className="w-6 h-6"/></div>
             <div className="absolute bottom-4 right-16 w-14 h-14 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-800"><Briefcase className="w-6 h-6"/></div>
          </div>
        </div>
      </section>

      {/* 8. Big CTA Block and 9. Bottom Cards */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pb-24">
        {/* Main CTA block - Dark Blue/Slate */}
        <div className="bg-[#1A1F36] rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between mb-8 shadow-2xl z-0">
           {/* Abstract lines on background */}
           <div className="absolute inset-0 opacity-10 pointer-events-none -z-10">
             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0,100 C30,60 70,80 100,0" stroke="white" strokeWidth="0.5" fill="none" />
               <path d="M0,100 C40,40 60,90 100,20" stroke="white" strokeWidth="0.5" fill="none" />
               <path d="M0,100 C20,20 80,60 100,50" stroke="white" strokeWidth="0.5" fill="none" />
             </svg>
           </div>
           
           <div className="w-full md:w-5/12 relative h-64 md:h-auto hidden md:block z-20">
              {/* Fake UI cards on dark bg */}
              <div className="absolute bg-white text-slate-900 rounded-2xl p-4 shadow-xl w-64 -rotate-6 top-0 left-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-sm">Próxima Clase</span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"><PlayCircle className="w-3 h-3"/></span>
                </div>
                <div className="font-black text-2xl mb-1">UI Moderno</div>
                <div className="text-xs text-slate-400 font-bold">18h Horario Central</div>
              </div>
              <div className="absolute bg-neon text-primary rounded-2xl p-4 shadow-xl w-56 rotate-3 top-24 left-16 border border-white/20">
                <div className="flex flex-col items-center justify-center text-center py-2 h-full gap-2">
                  <Star className="w-8 h-8"/>
                  <span className="font-bold text-lg">Top 100%</span>
                  <span className="text-xs opacity-70">En la semana</span>
                </div>
              </div>
           </div>

           <div className="w-full md:w-6/12 relative z-20">
             <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Listo para <span className="text-neon">Acelerar</span> tu Carrera <br/>Profesional?
             </h2>
             <p className="text-slate-400 font-medium mb-10 leading-relaxed text-lg">
                Miles de estudiantes ya transforman su futuro con nosotros.
             </p>
             <Link href="/ofertas-en-vivo" className="inline-flex items-center justify-center bg-[#427FE1] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all gap-2 shadow-lg shadow-blue-500/30">
                Empezar Grátis <ArrowRight className="w-5 h-5"/>
             </Link>
           </div>
        </div>

        {/* Two bottom cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-[#A460EE] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all flex flex-col justify-between items-start min-h-[260px]">
             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white backdrop-blur-sm">
               <MessageCircle className="w-6 h-6" />
             </div>
             <div>
               <h3 className="text-3xl font-bold mb-3">Soporte en Vivo</h3>
               <p className="text-white/80 font-medium mb-8 leading-relaxed">Conecta de manera instantánea con nuestros asesores académicos si tienes dudas.</p>
               <Link href="/contacto" className="inline-flex items-center justify-center border border-white/30 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white hover:text-[#A460EE] transition-all">
                  Contactar Asesor
               </Link>
             </div>
           </div>

           <div className="bg-neon rounded-[2.5rem] p-10 text-primary relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-neon/20 transition-all flex flex-col justify-between items-start min-h-[260px]">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-primary shadow-sm">
               <PlayCircle className="w-6 h-6" />
             </div>
             <div>
               <h3 className="text-3xl font-bold mb-3">Mira una Demo</h3>
               <p className="text-primary/70 font-medium mb-8 leading-relaxed">Descubre en formato video cómo nuestra plataforma logra maximizar tus resultados.</p>
               <Link href="/acerca-de-nosotros" className="inline-flex items-center justify-center border border-primary/30 text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary hover:text-neon transition-all">
                  Ver Video Ahora
               </Link>
             </div>
           </div>
        </div>
      </section>

    </main>
  );
}
