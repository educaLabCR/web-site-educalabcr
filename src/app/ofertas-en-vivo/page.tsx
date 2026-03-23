'use client';
import { motion } from 'framer-motion';
import { Clock, Monitor, Wallet, BookOpen, Users, CalendarDays, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Sesion {
  dia: string;
  fecha_dia: string;
  mes: string;
  horario: string;
}

interface Curso {
  titulo: string;
  subtitulo: string;
  dirigido_a: string;
  descripcion: string;
  semanas: string;
  modalidad: string;
  precio: string;
  horas: string;
  cantidad_sesiones: number;
  frecuencia_sesiones: string;
  sesiones_curso: Sesion[];
  etiquetas: string[];
  color_acento: string;
  color_fondo: string;
  imagen?: string;
}

interface MetodoPago {
  titulo: string;
  descripcion: string;
  detalle: string;
  color: string;
}

interface ContenidoPagina {
  titulo_hero: string;
  subtitulo_hero: string;
  texto_badge: string;
  texto_zoom?: string;
  texto_cupos_limitados?: string;
  pildora_1?: string;
  pildora_2?: string;
  pildora_3?: string;
  imagen_hero?: string;
}

export default function OfertasEnVivo() {
  const [courses, setCourses] = useState<Curso[]>([]);
  const [payments, setPayments] = useState<MetodoPago[]>([]);
  const [content, setContent] = useState<ContenidoPagina | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || '/directus-api';
      try {
        const [coursesRes, paymentsRes, contentRes] = await Promise.all([
          fetch(`${url}/items/cursos_en_vivo?fields=*,sesiones_curso.*&filter[estado][_eq]=published`),
          fetch(`${url}/items/metodos_pago?filter[estado][_eq]=published`),
          fetch(`${url}/items/contenido_pagina_ofertas`),
        ]);

        const coursesData = await coursesRes.json();
        const paymentsData = await paymentsRes.json();
        const contentData = await contentRes.json();

        setCourses(coursesData.data || []);
        setPayments(paymentsData.data || []);
        setContent(contentData.data || null);
      } catch (error) {
        console.error('Error fetching data from Directus:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const page = content || {
    titulo_hero: 'Cursos en Vivo & Directo',
    subtitulo_hero: 'Interactúa con expertos en tiempo real. Formaciones intensivas diseñadas para transformar tus competencias digitales con acompañamiento constante.',
    texto_badge: 'Sincrónico · Acompañamiento Real',
    texto_zoom: 'Sesiones por Zoom',
    texto_cupos_limitados: 'Cupos Limitados'
  };

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
              {page.texto_badge}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6"
            >
              {page.titulo_hero.split('&').map((part, i, arr) => (
                <span key={i}>
                  {i === 0 ? part : <span className="text-primary-bright relative">
                    & {part}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
                      className="absolute left-0 -bottom-1 h-1 w-full bg-primary-bright/30 rounded-full origin-left block"
                    />
                  </span>}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed mb-12 max-w-xl font-medium"
            >
              {page.subtitulo_hero}
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
                 {page.texto_zoom}
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

                <div className="flex-1 bg-slate-100 rounded-2xl relative overflow-hidden group">
                   <img 
                      src={page.imagen_hero ? `/directus-api/assets/${page.imagen_hero}` : "/images/clase-en-vivo.png"} 
                      alt="Clase en Vivo" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                   <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <div className="w-1/3 h-20 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 shadow-lg flex flex-col items-center justify-center text-center p-2">
                         <Monitor className="w-4 h-4 text-white mb-1" />
                         <p className="text-[9px] font-black text-white leading-tight uppercase tracking-widest">{page.pildora_1 || 'Clases en Vivo'}</p>
                      </div>
                      <div className="w-1/3 h-20 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 shadow-lg flex flex-col items-center justify-center text-center p-2">
                         <Users className="w-4 h-4 text-white mb-1" />
                         <p className="text-[9px] font-black text-white leading-tight uppercase tracking-widest">{page.pildora_2 || '100% en Vivo'}</p>
                      </div>
                      <div className="w-1/3 h-20 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 shadow-lg flex flex-col items-center justify-center text-center p-2">
                         <Clock className="w-4 h-4 text-white mb-1" />
                         <p className="text-[9px] font-black text-white leading-tight uppercase tracking-widest">{page.pildora_3 || 'Grabaciones Disponibles'}</p>
                      </div>
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
                <p className="font-bold text-xs uppercase tracking-widest">{page.texto_cupos_limitados}</p>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course Cards */}
      <section id="cursos" className="px-6 md:px-12 space-y-16 mt-4">
        {courses.map((course, idx) => (
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
                className="lg:col-span-2 relative flex flex-col items-center justify-center p-10 min-h-[360px] overflow-hidden group/card"
                style={{ background: course.color_fondo }}
              >
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                   <img 
                      src={course.imagen ? `/directus-api/assets/${course.imagen}` : (
                        course.titulo.includes('LaTeX') ? '/images/matematicas.png' :
                        course.titulo.includes('Canva') ? '/images/canva.png' :
                        course.titulo.includes('Evaluación') ? '/images/evaluacion.png' :
                        course.titulo.includes('Docencia') ? '/images/docencia.png' :
                        '/images/clase-en-vivo.png'
                      )}
                      alt={course.titulo}
                      className="w-full h-full object-cover opacity-80 mix-blend-multiply transition-transform duration-1000 group-hover/card:scale-110"
                   />
                </div>
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent z-[1]" />

                {/* Big decorative number */}
                <div className="absolute top-6 left-6 flex flex-col items-start gap-1 z-10">
                  <div className="flex items-end gap-2">
                    <span className="text-[5rem] font-black leading-none" style={{ color: course.color_acento }}>{course.cantidad_sesiones}</span>
                    <div className="mb-3">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Sesiones</p>
                      <p className="text-xs font-bold text-slate-400">{course.frecuencia_sesiones}</p>
                    </div>
                  </div>
                </div>

                {/* Tags strip */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-14">
                  <div className="flex items-center gap-0 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
                    {course.etiquetas && [...course.etiquetas, ...course.etiquetas, ...course.etiquetas].map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block px-4 py-2 text-sm font-black uppercase tracking-wider text-white"
                        style={{ background: course.color_acento, marginRight: '2px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Schedule badges */}
                <div className="mt-16 flex flex-col gap-3 w-full">
                  {course.sesiones_curso && course.sesiones_curso.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50">
                      <div
                        className="text-white rounded-xl p-3 text-center shrink-0 min-w-[56px]"
                        style={{ background: course.color_acento }}
                      >
                        <div className="text-2xl font-black leading-none">{s.fecha_dia}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wide opacity-90">{s.mes}</div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-base">{s.dia}</p>
                        <p className="text-sm text-slate-500 font-medium">{s.horario}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vertical label */}
                <div
                  className="absolute right-0 top-0 bottom-14 w-10 flex items-center justify-center"
                  style={{ background: course.color_acento }}
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
                      Dirigido a: <span className="text-slate-700">{course.dirigido_a}</span>
                    </p>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                    {course.titulo}
                  </h2>
                  <p className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: course.color_acento }}>
                    {course.subtitulo}
                  </p>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-8">
                    {course.descripcion}
                  </p>

                  {/* Info chips */}
                  <div
                    className="rounded-2xl p-5 grid grid-cols-2 gap-4 mb-8"
                    style={{ background: course.color_fondo }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: course.color_acento }}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Duración</p>
                        <p className="font-bold text-slate-800">{course.semanas}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: course.color_acento }}>
                        <Monitor className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Modalidad</p>
                        <p className="font-bold text-slate-800">{course.modalidad}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: course.color_acento }}>
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Inversión</p>
                        <p className="font-bold text-slate-800">{course.precio}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: course.color_acento }}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Horas</p>
                        <p className="font-bold text-slate-800">{course.horas}</p>
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
                    style={{ background: course.color_acento, boxShadow: `0 8px 30px ${course.color_acento}40` }}
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
            {payments.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 rounded-full mb-5" style={{ background: m.color }} />
                <h3 className="text-lg font-bold text-slate-900 mb-2">{m.titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{m.descripcion}</p>
                <p className="text-sm font-bold" style={{ color: m.color }}>{m.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
