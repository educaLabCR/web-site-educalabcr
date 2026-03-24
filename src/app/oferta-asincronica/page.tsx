'use client';
import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
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
  Heart,
  Monitor
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Icon Mapping helper
───────────────────────────────────────────── */
const iconMap: Record<string, React.ReactNode> = {
  Laptop: <Laptop className="w-7 h-7 text-primary" />,
  BarChart: <BarChart className="w-7 h-7 text-primary" />,
  Brain: <Brain className="w-7 h-7 text-primary" />,
  Sprout: <Sprout className="w-7 h-7 text-primary" />,
  GraduationCap: <GraduationCap className="w-7 h-7 text-primary" />,
};

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

function CourseCard({ course, index }: { course: any; index: number }) {
  const imageUrl = (course.imagen || course.Imagen)?.startsWith('http')
    ? (course.imagen || course.Imagen)
    : (course.imagen || course.Imagen)
      ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL || '/directus-api'}/assets/${course.imagen || course.Imagen}`
      : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col hover:-translate-y-2 min-h-[420px] ${course.disponible === false ? 'opacity-60 grayscale' : ''}`}
    >
      <div className="relative h-56 w-full overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt={course.nombre}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
          <span className="inline-block px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-xl shadow-lg border border-white/10 uppercase tracking-widest self-start">
            {course.codigo}
          </span>
          {course.nivel && (
            <span className={`inline-block px-3 py-1.5 bg-white/95 backdrop-blur-md text-[10px] font-bold rounded-lg shadow-sm border border-slate-100 uppercase tracking-[0.1em] self-start ${course.nivel === 'avanzado' ? 'text-rose-600' :
                course.nivel === 'intermedio' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
              {course.nivel}
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 z-20">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
            <Clock className="w-3.5 h-3.5" />
            {course.horas}h
          </span>
        </div>
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col bg-white z-20">
        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 line-clamp-2">{course.nombre}</h3>
        {course.descripcion && (
          <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6 line-clamp-3">{course.descripcion}</p>
        )}
        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Virtual
          </span>
          {course.disponible !== false ? (
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
  const [categories, setCategories] = useState<any[]>([]);
  const [siteData, setSiteData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || '/directus-api';
      try {
        const response = await fetch('/api/oferta-asincronica');
        if (!response.ok) throw new Error(`Failed to fetch from /api/oferta-asincronica`);

        const { categories: catsArr, courses: coursesArr, site: siteDataJson } = await response.json();

        // 1. Link courses to existing categories
        const baseCategories = catsArr.map((cat: any) => ({
          ...cat,
          courses: coursesArr.filter((course: any) =>
            course.categoria === cat.id || course.categoria_texto === cat.nombre
          )
        })).filter((cat: any) => cat.courses.length > 0);

        // 2. Find courses that don't belong to any of the fetched base categories
        const matchedCourseIds = new Set(baseCategories.flatMap((c: any) => c.courses.map((co: any) => co.id)));
        const unmatchedCourses = coursesArr.filter((c: any) => !matchedCourseIds.has(c.id));

        // 3. Group unmatched courses by categoria_texto to create dynamic categories
        const dynamicGroupsMap = unmatchedCourses.reduce((acc: any, course: any) => {
          const catName = course.categoria_texto || 'Otros';
          if (!acc[catName]) acc[catName] = [];
          acc[catName].push(course);
          return acc;
        }, {});

        const dynamicCategories = Object.entries(dynamicGroupsMap).map(([name, items]: [string, any]) => ({
          nombre: name,
          subtitulo: 'Cursos relacionados',
          icono: 'Monitor',
          color_gradient: 'from-slate-50 to-slate-100',
          courses: items
        }));

        setCategories([...baseCategories, ...dynamicCategories]);
        setSiteData(siteDataJson || {});
      } catch (error) {
        console.error('Error fetching Directus data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderTitle = (title: string) => {
    if (!title) return null;
    const parts = title.split(' ');
    return parts.map((part, i) => (
      <span key={i}>
        {part === 'Especialidad' ? (
          <span className="text-primary-bright relative">
            {part}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
              className="absolute left-0 -bottom-1 h-1 w-full bg-primary-bright/30 rounded-full origin-left block"
            />
          </span>
        ) : (
          part
        )}
        {i < parts.length - 1 ? ' ' : ''}
        {i === 1 ? <br /> : ''}
      </span>
    ));
  };

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
              {siteData.badge_texto || 'Estudia a tu ritmo · 100% Online'}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6"
            >
              {renderTitle(siteData.hero_titulo || 'Domina tu Especialidad')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed mb-12 max-w-xl font-medium"
            >
              {siteData.hero_subtitulo || 'Accede a contenido de vanguardia diseñado para el docente moderno.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.32 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={siteData.cta_whatsapp_url || "https://wa.me/message/4C7ONIA7WR5ZF1"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base hover:bg-primary-bright hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 flex items-center gap-2"
              >
                {siteData.cta_principal_texto || 'Inscripción Abierta'}
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold text-sm shadow-sm">
                <span className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Clock className="w-4.5 h-4.5" />
                </span>
                {siteData.disponibilidad_texto || 'Disponibilidad 24/7'}
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
                  <div className="aspect-square bg-primary-bright/5 rounded-2xl border border-primary-bright/10 overflow-hidden relative">
                    <img
                      src="/images/ai-learning-card.png"
                      alt="AI Learning"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary/10 to-transparent pointer-events-none" />
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
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Heart className="w-4 h-4 fill-current" /></div>
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
                <span className="opacity-70">{iconMap[cat.icono] || <Monitor className="w-5 h-5" />}</span>
                {cat.nombre?.split(' ').slice(0, 2).join(' ')}
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
                  className={`relative w-16 h-16 bg-gradient-to-br ${category.color_gradient || 'from-slate-50 to-slate-100'} rounded-[1.4rem] border border-slate-100/80 flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <span className="drop-shadow-sm">{iconMap[category.icono] || <Monitor className="w-7 h-7 text-primary" />}</span>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-[-0.02em] leading-tight mb-1">
                    {category.nombre}
                  </h2>
                  <p className="text-slate-500 font-medium">{category.subtitulo}</p>

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
                  <span className="text-primary font-bold">{category.courses?.length || 0}</span>
                  cursos
                </div>
              </div>
            </InViewSection>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {category.courses?.map((course: any, cIdx: number) => (
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
            {siteData.banner_final_titulo || '¿Listo para impulsar tu carrera?'}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 relative z-10">
            {siteData.banner_final_subtitulo || 'Contáctanos a través de WhatsApp para recibir atención personalizada e iniciar tu proceso de inscripción hoy mismo.'}
          </p>
          <a
            href={siteData.cta_whatsapp_url || "https://wa.me/message/4C7ONIA7WR5ZF1"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-xl shadow-black/10"
          >
            {siteData.banner_final_cta || 'Contactar por WhatsApp'}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </InViewSection>
    </main>
  );
}
