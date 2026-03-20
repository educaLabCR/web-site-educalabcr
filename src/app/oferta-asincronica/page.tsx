'use client';
import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  ArrowRight,
  Clock,
  Laptop,
  BarChart,
  Brain,
  Sprout,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Re-usable animated section wrapper
───────────────────────────────────────────── */
function InViewSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Course card with individual inView animation
───────────────────────────────────────────── */
function CourseCard({
  course,
  index,
}: {
  course: {
    code: string;
    name: string;
    hours: number;
    desc: string;
    image: string;
    disabled?: boolean;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={
        inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }
      }
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 3) * 0.08,
      }}
      className={`group bg-white rounded-4xl border overflow-hidden transition-all duration-300 relative flex flex-col min-h-[420px]
        ${
          course.disabled
            ? 'border-slate-100 opacity-60 grayscale'
            : 'border-slate-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2'
        }`}
    >
      {/* Image Header */}
      <div className="relative h-56 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        <img
          src={course.image}
          alt={course.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent z-10 pointer-events-none" />

        {/* Floating badges */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-xl shadow-lg border border-white/10 uppercase tracking-widest">
            {course.code}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-20">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
            <Clock className="w-3.5 h-3.5" />
            {course.hours}h
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col bg-white z-20">
        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3">{course.name}</h3>
        {course.desc && (
          <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">{course.desc}</p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Virtual
          </span>
          {!course.disabled ? (
            <a
              href="https://wa.me/message/4C7ONIA7WR5ZF1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold text-sm inline-flex items-center gap-1.5 hover:text-primary-bright transition-colors group/link"
            >
              Solicitar detalles
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          ) : (
            <span className="text-slate-400 font-semibold text-sm">No disponible</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Category header animated line
───────────────────────────────────────────── */
const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
};

export default function OfertaAsincronica() {
  const categories = [
    {
      title: 'Herramientas Digitales y Tecnología',
      subtitle: 'Domina las plataformas del aula moderna',
      icon: <Laptop className="w-7 h-7 text-primary" />,
      color: 'from-emerald-50 to-cyan-50',
      courses: [
        {
          code: 'C-001',
          name: 'Introducción a Herramientas Digitales para la Educación',
          hours: 40,
          desc: 'Cubre Google Classroom, Teams, Zoom y gestión educativa.',
          image:
            'https://images.unsplash.com/photo-1588196749597-9ff046f477bc?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-002',
          name: 'Creación de Contenidos Digitales para el Aula',
          hours: 200,
          desc: 'Enfoque en presentaciones interactivas, videos y podcasts.',
          image:
            'https://images.unsplash.com/photo-1492538368677-f69f501b0d2b?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-004',
          name: 'Uso de Nearpod como herramienta didáctica',
          hours: 40,
          desc: 'Herramientas de evaluación interactiva.',
          image:
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-006',
          name: 'Seguridad en Internet y Ciudadanía Digital para Docentes',
          hours: 120,
          desc: 'Prevención y buenas prácticas en la web.',
          image:
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-008',
          name: 'Uso de Padlet / IA en el aula',
          hours: 40,
          desc: 'Enfocado en el uso de inteligencia artificial para aprendizaje adaptativo.',
          image:
            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-015',
          name: 'Herramientas de Aprendizaje Colaborativo en Línea',
          hours: 200,
          desc: 'Uso de GSuite, Office 365 y OneDrive.',
          image:
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-037',
          name: 'IA para la creación de material didáctico',
          hours: 40,
          desc: 'Generación de recursos automatizados.',
          image:
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-038',
          name: 'ChatGPT: De la Teoría a la Práctica',
          hours: 80,
          desc: 'Optimización del tiempo docente mediante el uso de promts.',
          image:
            'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=800',
        },
      ],
    },
    {
      title: 'Pedagogía y Evaluación',
      subtitle: 'Estrategias de enseñanza basadas en evidencia',
      icon: <BarChart className="w-7 h-7 text-primary" />,
      color: 'from-violet-50 to-purple-50',
      courses: [
        {
          code: 'C-003',
          name: 'Metodología Constructivista vs. Conductista',
          hours: 40,
          desc: 'Diferencias teóricas y aplicación en el aula.',
          image:
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-007',
          name: 'Evaluación diagnóstica en el desarrollo escolar',
          hours: 120,
          desc: 'Identificando habilidades y áreas de mejora.',
          image:
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4273?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-012',
          name: 'Evaluación sumativa del trabajo cotidiano',
          hours: 120,
          desc: 'Herramientas objetivas de calificación.',
          image:
            'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2c0?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-014',
          name: 'Construcción de pruebas escritas y tablas de especificaciones',
          hours: 120,
          desc: 'Creación de ítems de alta calidad.',
          image:
            'https://images.unsplash.com/photo-1518133596956-659f13dd48c0?auto=format&fit=crop&q=80&w=800',
        },
      ],
    },
    {
      title: 'Inclusión y Neurociencia',
      subtitle: 'Ciencia del aprendizaje aplicada al aula',
      icon: <Brain className="w-7 h-7 text-primary" />,
      color: 'from-rose-50 to-pink-50',
      courses: [
        {
          code: 'C-009',
          name: 'Diseño de Planes Educativos Inclusivos',
          hours: 120,
          desc: 'Adecuaciones curriculares efectivas.',
          image:
            'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-010',
          name: 'Neurociencia Aplicada',
          hours: 120,
          desc: 'Comprendiendo el cerebro desde la infancia hasta la adultez.',
          image:
            'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-011',
          name: 'DUA: Diseño Universal de Aprendizajes',
          hours: 40,
          desc: 'Estrategias prácticas de diversificación.',
          image:
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-016',
          name: 'Diversidad de Talentos: Inteligencias Múltiples',
          hours: 80,
          desc: 'Identificando potenciales diversos.',
          image:
            'https://images.unsplash.com/photo-1456406644174-8d9ad9729a4a?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-017',
          name: 'Neurodidáctica (Estrategias innovadoras)',
          hours: 40,
          desc: 'Transformando el aprendizaje significativo.',
          image:
            'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800',
        },
      ],
    },
    {
      title: 'Habilidades Profesionales y Bienestar',
      subtitle: 'Crece como profesional dentro y fuera del aula',
      icon: <Sprout className="w-7 h-7 text-primary" />,
      color: 'from-amber-50 to-yellow-50',
      courses: [
        {
          code: 'C-005',
          name: 'Domina APA',
          hours: 40,
          desc: 'Nota: Actualmente aparece como no disponible.',
          disabled: true,
          image:
            'https://images.unsplash.com/photo-1455390582262-044cdead27d1?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-013',
          name: 'Estrategias para la Salud Mental en el Entorno Profesional',
          hours: 80,
          desc: 'Manejo de estrés y mindfulness.',
          image:
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-040',
          name: 'Comunicación asertiva en el entorno laboral',
          hours: 40,
          desc: 'Habilidades para la resolución de conflictos.',
          image:
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-041',
          name: 'Desarrollo de habilidades para la expresión oral en público',
          hours: 120,
          desc: 'Técnicas de persuasión y oratoria.',
          image:
            'https://images.unsplash.com/photo-1475721025505-23fa68abf410?auto=format&fit=crop&q=80&w=800',
        },
      ],
    },
    {
      title: 'Preparación Académica',
      subtitle: 'Abre puertas a nuevas oportunidades profesionales',
      icon: <GraduationCap className="w-7 h-7 text-primary" />,
      color: 'from-sky-50 to-blue-50',
      courses: [
        {
          code: 'C-042',
          name: 'Lógica matemática para exámenes de admisión',
          hours: 80,
          desc: 'Resolución de problemas avanzados.',
          image:
            'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?auto=format&fit=crop&q=80&w=800',
        },
        {
          code: 'C-043',
          name: 'Lógica verbal',
          hours: 40,
          desc: 'Enfoque en razonamiento lógico aplicado.',
          image:
            'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
        },
      ],
    },
  ];

  return (
    <main className="max-w-[1400px] mx-auto overflow-hidden pb-24">
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="px-6 md:px-12 pt-16 pb-20 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            {/* Background blobs */}
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary-bright/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-8 border border-primary/12"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-bright animate-pulse" />
              Estudia a tu ritmo · 100% Online
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6"
            >
              Domina tu <br/>
              <span className="text-primary-bright relative">
                Especialidad
                {/* Underline decoration */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
                  className="absolute left-0 -bottom-1 h-1 w-full bg-primary-bright/30 rounded-full origin-left block"
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed mb-12 max-w-xl font-medium"
            >
              Accede a contenido de vanguardia diseñado para el docente moderno. Aprende IA, pedagogía y tecnología con flexibilidad total.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.32 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="https://wa.me/message/4C7ONIA7WR5ZF1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base hover:bg-primary-bright hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 flex items-center gap-2"
              >
                Inscripción Abierta
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold text-sm shadow-sm">
                <span className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Clock className="w-4.5 h-4.5" />
                </span>
                Disponibilidad 24/7
              </div>
            </motion.div>
          </div>

          {/* Right: Premium Mockup (Consistent with Home) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block h-[500px]"
          >
             <div className="absolute inset-0 bg-slate-100/50 rounded-[3rem] -z-10 transform rotate-3"></div>
             
             {/* Main Graphic - Dashboard feel */}
             <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden p-8 flex flex-col">
                <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-neon shadow-lg uppercase font-bold text-xs ring-4 ring-primary/5">EL</div>
                      <div>
                         <p className="font-bold text-slate-900 text-sm leading-tight">Módulo de IA</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Lección 04/12</p>
                      </div>
                   </div>
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-bright"></div>
                   </div>
                </div>

                <div className="flex-1 space-y-6">
                   <div className="h-4 w-1/2 bg-slate-50 rounded-full"></div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center p-4">
                         <BarChart className="w-8 h-8 text-primary/20 mb-2" />
                         <div className="h-2 w-12 bg-slate-100 rounded-full"></div>
                      </div>
                      <div className="aspect-square bg-primary-bright/5 rounded-2xl border border-primary-bright/10 flex flex-col items-center justify-center p-4">
                         <Brain className="w-8 h-8 text-primary-bright mb-2" />
                         <div className="h-2 w-12 bg-primary-bright/20 rounded-full"></div>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="h-3 w-full bg-slate-50 rounded-full"></div>
                      <div className="h-3 w-3/4 bg-slate-50 rounded-full"></div>
                   </div>
                </div>
             </div>

             {/* Floating Certification Card */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-6 -right-6 bg-[#1A1F36] text-white p-5 rounded-3xl shadow-2xl z-20 w-48 border border-white/10"
             >
                <div className="flex justify-between mb-4">
                   <ShieldCheck className="w-6 h-6 text-neon" />
                   <div className="w-6 h-6 rounded-full bg-white/10"></div>
                </div>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1 leading-none">Status</p>
                <p className="font-bold text-sm mb-4">Certificado Oficial</p>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full w-[85%] bg-neon"></div>
                </div>
             </motion.div>

             {/* Floating User Pill */}
             <motion.div 
               animate={{ x: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-4 left-10 bg-white px-5 py-3.5 rounded-2xl shadow-xl border border-slate-100 flex gap-3 items-center z-20"
             >
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Heart className="w-4 h-4 fill-current"/></div>
                <p className="font-bold text-slate-800 text-xs">Aprendizaje Guiado</p>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ CATEGORY NAV ═══════════════════════ */}
      <InViewSection delay={0} className="px-6 md:px-12 mb-16">
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2 min-w-max md:justify-center">
            {categories.map((cat, i) => (
              <a
                key={i}
                href={`#cat-${i}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:border-primary/40 hover:text-primary hover:bg-primary/4 transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md hover:shadow-primary/8 hover:-translate-y-0.5"
              >
                <span className="opacity-70">{cat.icon}</span>
                {cat.title.split(' ').slice(0, 2).join(' ')}
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </a>
            ))}
          </div>
        </div>
      </InViewSection>

      {/* ═══════════════════════ COURSE CATALOG ═══════════════════════ */}
      <section className="px-6 md:px-12 space-y-24">
        {categories.map((category, idx) => (
          <div key={idx} id={`cat-${idx}`} className="scroll-mt-28">
            {/* Category header */}
            <InViewSection delay={0} className="mb-12">
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                {/* Icon pill */}
                <div
                  className={`relative w-16 h-16 bg-gradient-to-br ${category.color} rounded-[1.4rem] border border-slate-100/80 flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <span className="drop-shadow-sm">{category.icon}</span>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-[-0.02em] leading-tight mb-1">
                    {category.title}
                  </h2>
                  <p className="text-slate-500 font-medium">{category.subtitle}</p>

                  {/* Decorative line */}
                  <motion.div
                    variants={lineVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mt-3 h-0.5 w-24 bg-gradient-to-r from-primary to-primary-bright rounded-full origin-left"
                  />
                </div>

                {/* Course count chip */}
                <div className="flex-shrink-0 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-sm font-semibold">
                  <span className="text-primary font-bold">{category.courses.length}</span>
                  cursos
                </div>
              </div>
            </InViewSection>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {category.courses.map((course, cIdx) => (
                <CourseCard key={cIdx} course={course} index={cIdx} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════════════════ CTA BANNER ═══════════════════════ */}
      <InViewSection delay={0} className="px-6 md:px-12 mt-32">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30 max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-bright opacity-20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-neon opacity-10 rounded-full blur-3xl pointer-events-none" />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 font-semibold text-xs uppercase tracking-widest mb-6 border border-white/15 relative z-10"
          >
            Empieza hoy
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
            ¿Listo para impulsar tu carrera?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 relative z-10">
            Contáctanos a través de WhatsApp para recibir atención personalizada e iniciar tu
            proceso de inscripción hoy mismo.
          </p>
          <a
            href="https://wa.me/message/4C7ONIA7WR5ZF1"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-xl shadow-black/10"
          >
            Contactar por WhatsApp
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </InViewSection>
    </main>
  );
}
