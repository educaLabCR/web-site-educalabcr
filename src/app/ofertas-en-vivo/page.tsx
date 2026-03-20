'use client';
import { motion } from 'framer-motion';
import { Clock, Monitor, Wallet, BookOpen, Users, CalendarDays, ArrowRight } from 'lucide-react';


interface Session {
  day: string;
  date: string;
  month: string;
  time: string;
}

interface LiveCourse {
  title: string;
  subtitle: string;
  target: string;
  desc: string;
  weeks: string;
  modality: string;
  price: string;
  hours: string;
  sessions: number;
  sessionFrequency: string;
  schedule: Session[];
  tags: string[];
  accentColor: string;
  bgColor: string;
  image?: string;
}

const liveCourses: LiveCourse[] = [
  {
    title: 'Herramientas Digitales: LaTeX, GeoGebra y Classpad.net',
    subtitle: 'Para Matemáticas',
    target: 'Docentes de matemáticas de secundaria y superior',
    desc: 'Llevá tus clases de matemáticas al siguiente nivel con este curso práctico y actualizado. Aprenderás a redactar con LaTeX, crear visualizaciones dinámicas con GeoGebra y usar Classpad para potenciar el pensamiento algebraico. Un enfoque integral para enseñar matemática con precisión, innovación y claridad.',
    weeks: '10 Semanas',
    modality: 'Virtual Híbrido',
    price: '₡45.000 / $90 USD',
    hours: '80 Horas',
    sessions: 5,
    sessionFrequency: 'Sesiones Bisemanales',
    schedule: [
      { day: 'Jueves', date: '14', month: 'Agosto', time: '5:00 – 7:00 PM' },
    ],
    tags: ['LaTeX', 'GeoGebra', 'Classpad', 'IA'],
    accentColor: '#22c55e',
    bgColor: '#f0fdf4',
  },
  {
    title: 'Diseño y Creación de Materiales Educativos con IA',
    subtitle: 'Canva + Herramientas de Inteligencia Artificial',
    target: 'Docentes y profesionales de la educación',
    desc: 'Aprende a crear visuales e impactantes con Canva y herramientas de inteligencia artificial. Desde los fundamentos del diseño gráfico hasta la producción de videos educativos profesionales para el aula.',
    weeks: '10 Semanas',
    modality: 'Virtual Híbrido',
    price: '₡45.000 / $90 USD',
    hours: '80 Horas',
    sessions: 5,
    sessionFrequency: 'Sesiones Bisemanales',
    schedule: [
      { day: 'Martes', date: '12', month: 'Agosto', time: '5:00 – 7:00 PM' },
    ],
    tags: ['Canva', 'IA Generativa', 'Video Educativo', 'Diseño Gráfico'],
    accentColor: '#3b82f6',
    bgColor: '#eff6ff',
  },
  {
    title: 'Evaluación Formativa e Instrumentos con Inteligencia Artificial',
    subtitle: 'Transformá tu práctica evaluativa',
    target: 'Docentes y profesionales de la educación',
    desc: 'Aprenda a generar rúbricas inteligentes, crear exámenes digitales, diseñar instrumentos alternativos con IA, automatizar la calificación y brindar retroalimentación efectiva y personalizada a sus estudiantes.',
    weeks: '10 Semanas',
    modality: 'Virtual Híbrido',
    price: '₡45.000 / $90 USD',
    hours: '80 Horas',
    sessions: 5,
    sessionFrequency: 'Sesiones Bisemanales',
    schedule: [
      { day: 'Miércoles', date: '13', month: 'Agosto', time: '5:00 – 7:00 PM' },
    ],
    tags: ['Rúbricas IA', 'Evaluación Digital', 'Retroalimentación', 'Calificación Automática'],
    accentColor: '#8b5cf6',
    bgColor: '#f5f3ff',
  },
  {
    title: 'Docencia Digital con Inteligencia Artificial Avanzada',
    subtitle: 'Transformá tu práctica docente completa',
    target: 'Docentes y profesionales de la educación',
    desc: 'Aprenda a crear secuencias didácticas con IA, diseñar bots educativos y construir entornos digitales interactivos. Un programa integral para llevar la innovación al corazón de su práctica docente.',
    weeks: '16 Semanas',
    modality: 'Virtual Híbrido',
    price: '₡60.000 / $120 USD',
    hours: '80 Horas',
    sessions: 4,
    sessionFrequency: 'Sesiones Semanales',
    schedule: [
      { day: 'Lunes', date: '11', month: 'Agosto', time: '6:00 – 8:00 PM' },
    ],
    tags: ['Secuencias Didácticas', 'Bots Educativos', 'Entornos Digitales', 'IA Avanzada'],
    accentColor: '#f59e0b',
    bgColor: '#fffbeb',
  },
];

export default function OfertasEnVivo() {
  return (
    <main className="max-w-[1400px] mx-auto overflow-hidden pb-20">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="px-6 md:px-12 pt-16 pb-20 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            {/* Background blobs */}
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-8 border border-primary/12"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-bright animate-pulse" />
              Sincrónico · Acompañamiento Real
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6"
            >
              Cursos en <br/>
              <span className="text-primary-bright relative">
                Vivo & Directo
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
              Interactúa con expertos en tiempo real. Formaciones intensivas diseñadas para transformar tus competencias digitales con acompañamiento constante.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.32 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#cursos"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base hover:bg-primary-bright hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 flex items-center gap-2"
              >
                Ver Próximos Inicios
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold text-sm shadow-sm font-bold">
                 <Monitor className="w-4 h-4 text-primary" />
                 Sesiones por Zoom
              </div>
            </motion.div>
          </div>

          {/* Right: Premium Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block h-[500px]"
          >
             <div className="absolute inset-0 bg-slate-100/50 rounded-[3rem] -z-10 transform rotate-3"></div>
             
             {/* Main Graphic - Live Session Template */}
             <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col p-8">
                <div className="flex justify-between items-center mb-8">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                   </div>
                   <div className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div>
                      LIVE NOW
                   </div>
                </div>

                <div className="flex-1 bg-slate-50 rounded-2xl relative overflow-hidden flex items-center justify-center">
                   <Monitor className="w-20 h-20 text-slate-200" />
                   <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <div className="w-1/3 h-20 bg-white/40 backdrop-blur rounded-lg border border-white/20"></div>
                      <div className="w-1/3 h-20 bg-white/40 backdrop-blur rounded-lg border border-white/20"></div>
                      <div className="w-1/3 h-20 bg-white/40 backdrop-blur rounded-lg border border-white/20"></div>
                   </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                   <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100"></div>
                      ))}
                   </div>
                   <div className="h-4 w-32 bg-slate-100 rounded-full"></div>
                </div>
             </div>

             {/* Floating Schedule Card */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-6 bg-white p-6 rounded-3xl shadow-2xl z-20 w-60 border border-slate-100"
             >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600"><CalendarDays className="w-5 h-5"/></div>
                   <div>
                      <p className="font-bold text-slate-800 text-sm">Próximo Inicio</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">11 de Agosto</p>
                   </div>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full"></div>
             </motion.div>

             {/* Floating Auth Pill */}
             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-6 left-1/4 bg-[#1A1F36] text-white px-6 py-4 rounded-2xl shadow-xl flex gap-3 items-center z-20 border border-white/10"
             >
                <Users className="w-5 h-5 text-neon" />
                <p className="font-bold text-xs uppercase tracking-widest">Cupos Limitados</p>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="px-6 md:px-12 space-y-16 mt-4">
        {liveCourses.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">

              {/* Left: Visual Panel */}
              <div
                className="lg:col-span-2 relative flex flex-col items-center justify-center p-10 min-h-[360px] overflow-hidden"
                style={{ background: course.bgColor }}
              >
                {/* Big decorative number */}
                <div className="absolute top-6 left-6 flex flex-col items-start gap-1">
                  <div className="flex items-end gap-2">
                    <span className="text-[5rem] font-black leading-none" style={{ color: course.accentColor }}>{course.sessions}</span>
                    <div className="mb-3">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Sesiones</p>
                      <p className="text-xs font-bold text-slate-400">{course.sessionFrequency}</p>
                    </div>
                  </div>
                </div>

                {/* Tags strip */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-14">
                  <div className="flex items-center gap-0 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
                    {[...course.tags, ...course.tags, ...course.tags].map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block px-4 py-2 text-sm font-black uppercase tracking-wider text-white"
                        style={{ background: course.accentColor, marginRight: '2px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Schedule badges */}
                <div className="mt-16 flex flex-col gap-3 w-full">
                  {course.schedule.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50">
                      <div
                        className="text-white rounded-xl p-3 text-center shrink-0 min-w-[56px]"
                        style={{ background: course.accentColor }}
                      >
                        <div className="text-2xl font-black leading-none">{s.date}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wide opacity-90">{s.month}</div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-base">{s.day}</p>
                        <p className="text-sm text-slate-500 font-medium">{s.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vertical label */}
                <div
                  className="absolute right-0 top-0 bottom-14 w-10 flex items-center justify-center"
                  style={{ background: course.accentColor }}
                >
                  <span
                    className="text-white text-xs font-black uppercase tracking-[0.25em] whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Curso Virtual Sincrónico
                  </span>
                </div>
              </div>

              {/* Right: Content */}
              <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  {/* Target */}
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-slate-400 shrink-0" />
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      Dirigido a: <span className="text-slate-700">{course.target}</span>
                    </p>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                    {course.title}
                  </h2>
                  <p className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: course.accentColor }}>
                    {course.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-8">
                    {course.desc}
                  </p>

                  {/* Info chips */}
                  <div
                    className="rounded-2xl p-5 grid grid-cols-2 gap-4 mb-8"
                    style={{ background: course.bgColor }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: course.accentColor }}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Duración</p>
                        <p className="font-bold text-slate-800">{course.weeks}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: course.accentColor }}>
                        <Monitor className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Modalidad</p>
                        <p className="font-bold text-slate-800">{course.modality}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: course.accentColor }}>
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Inversión</p>
                        <p className="font-bold text-slate-800">{course.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: course.accentColor }}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Horas</p>
                        <p className="font-bold text-slate-800">{course.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href="https://wa.me/message/4C7ONIA7WR5ZF1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-black text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{ background: course.accentColor, boxShadow: `0 8px 30px ${course.accentColor}40` }}
                  >
                    Consultar Plan de Estudios
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/message/4C7ONIA7WR5ZF1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Separar mi cupo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Payment Section */}
      <section className="px-6 md:px-12 mt-24">
        <div className="bg-slate-50 rounded-[2.5rem] p-12 md:p-16 border border-slate-100">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-3">Información de pagos</h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">Facilitamos múltiples métodos de pago para que inicies tu formación sin obstáculos.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Transferencia Bancaria',
                desc: 'Transferencia vía SINPE Móvil o Transferencia al IBAN de la empresa.',
                detail: 'SINPE: 7014-7031',
                color: '#22c55e',
              },
              {
                title: 'Plataforma Segura',
                desc: 'Pago con tarjeta de crédito o débito a través de plataformas financieras avaladas.',
                detail: 'Mercado Pago · PayPal',
                color: '#3b82f6',
              },
              {
                title: 'Financiamiento BAC',
                desc: 'Si eres cliente de BAC Credomatic, puedes solicitar 3 meses tasa cero',
                detail: 'Sin intereses adicionales',
                color: '#f59e0b',
              },
            ].map((m, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 rounded-full mb-5" style={{ background: m.color }} />
                <h3 className="text-lg font-bold text-slate-900 mb-2">{m.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{m.desc}</p>
                <p className="text-sm font-bold" style={{ color: m.color }}>{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
