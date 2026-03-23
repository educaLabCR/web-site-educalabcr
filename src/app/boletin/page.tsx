'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Clock, Tag, BookOpen, Sparkles, ChevronRight } from 'lucide-react';

/* ─── Types ─── */
type Article = {
  id: number;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
};

const categoryStyleMap: Record<string, string> = {
  'Tecnología Educativa': 'bg-emerald-100 text-emerald-700',
  'Neurociencia': 'bg-violet-100 text-violet-700',
  'Pedagogía': 'bg-sky-100 text-sky-700',
  'Bienestar': 'bg-rose-100 text-rose-700',
  'Metodologías': 'bg-amber-100 text-amber-700',
  'Inclusión': 'bg-teal-100 text-teal-700',
};

/* ─── InView helper ─── */
function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Article Card ─── */
function ArticleCard({ article, index }: { article: Article; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 3) * 0.07,
      }}
      className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/8 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${article.categoryColor || 'bg-slate-100 text-slate-700'}`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
              {article.author?.split(' ').map((w) => w[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 leading-none">{article.author}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{article.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Featured Article ─── */
function FeaturedArticle({ article }: { article: Article }) {
  return (
    <FadeIn className="group bg-white rounded-4xl border border-slate-200 overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
      <div className="grid md:grid-cols-2 min-h-[420px]">
        {/* Image */}
        <div className="relative overflow-hidden order-1 md:order-2 h-72 md:h-auto">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent" />
          <div className="absolute top-5 left-5 md:top-auto md:bottom-5 md:left-5">
            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-bright text-white font-bold text-xs rounded-full shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              Destacado
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
          <span className={`self-start px-3 py-1.5 rounded-full text-xs font-bold mb-5 ${article.categoryColor || 'bg-slate-100 text-slate-700'}`}>
            {article.category}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4 group-hover:text-primary transition-colors">
            {article.title}
          </h2>
          <p className="text-slate-500 leading-relaxed mb-8 text-base">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {article.author?.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{article.author}</p>
                <p className="text-xs text-slate-400">{article.date} · {article.readTime} de lectura</p>
              </div>
            </div>

            <button className="flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-bright transition-colors group/btn">
              Leer más
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Page ─── */
export default function Boletin() {
  const [articlesData, setArticlesData] = useState<Article[]>([]);
  const [siteData, setSiteData] = useState<any>({});
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/boletin');
        if (!response.ok) throw new Error('Failed to fetch from /api/boletin');

        const { articles, site } = await response.json();
        const BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || '/directus-api';

        const mappedArticles: Article[] = articles.map((a: any) => ({
          id: a.id,
          slug: a.slug,
          category: a.categoria || 'General',
          categoryColor: categoryStyleMap[a.categoria] || 'bg-slate-100 text-slate-700',
          title: a.titulo,
          excerpt: a.resumen,
          author: a.autor,
          authorRole: a.autor_rol,
          date: a.fecha,
          readTime: a.tiempo_lectura,
          image: a.imagen 
            ? (String(a.imagen).startsWith('http') ? a.imagen : `${BASE_URL}/assets/${a.imagen}`)
            : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
          featured: a.destacado,
          tags: Array.isArray(a.tags) ? a.tags : []
        }));

        setArticlesData(mappedArticles);
        setSiteData(site || {});

        const uniqueCats = Array.from(new Set(mappedArticles.map(a => a.category))).filter(Boolean);
        setCategories(['Todos', ...uniqueCats]);
      } catch (error) {
        console.error('Error fetching boletin:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filtrado dinámico
  const filteredArticles = selectedCategory === 'Todos' 
    ? articlesData 
    : articlesData.filter(a => a.category === selectedCategory);

  const featured = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const rest = filteredArticles.filter((a) => a.id !== featured?.id);

  const renderTitle = (title: string) => {
    if (!title) return null;
    const parts = title.split(' ');
    return parts.map((part, i) => (
      <span key={i}>
        {part === 'transforman' ? (
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
        {i === 1 ? <br/> : ''}
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
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/12 text-primary font-semibold text-xs uppercase tracking-widest mb-8"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {siteData.badge_texto || 'Recursos Gratuitos · Actualización Semanal'}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6"
            >
              {renderTitle(siteData.hero_titulo || 'Ideas que transforman la educación')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed mb-12 max-w-xl font-medium"
            >
              {siteData.hero_subtitulo || 'Artículos, guías y recursos seleccionados para que te mantengas a la vanguardia de la innovación educativa y la tecnología.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.32 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={siteData.cta_whatsapp_url || "#newsletter"}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base hover:bg-primary-bright hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 flex items-center gap-2"
              >
                Suscribirme Gratis
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="flex items-center -space-x-3">
                 {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-400">
                       {String.fromCharCode(64 + i)}
                    </div>
                 ))}
                 <div className="pl-6 text-sm font-bold text-slate-500">+1,500 lectores</div>
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
             <div className="absolute inset-0 bg-slate-100/50 rounded-[3rem] -z-10 transform -rotate-3"></div>
             
             {/* Main Graphic - Blog Content Template */}
             <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
                <div className="h-48 bg-slate-50 relative overflow-hidden">
                   <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent"></div>
                   <div className="absolute top-6 left-6 flex gap-2">
                      <div className="px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-bold uppercase tracking-widest text-primary shadow-sm">Tendencias</div>
                      <div className="px-2.5 py-1 bg-primary/10 backdrop-blur rounded-full text-[9px] font-bold uppercase tracking-widest text-primary shadow-sm">IA</div>
                   </div>
                </div>
                <div className="p-10 space-y-6">
                   <div className="h-6 w-3/4 bg-slate-50 rounded-full"></div>
                   <div className="space-y-3">
                      <div className="h-3 w-full bg-slate-50 rounded-full"></div>
                      <div className="h-3 w-full bg-slate-50 rounded-full"></div>
                      <div className="h-3 w-2/3 bg-slate-50 rounded-full"></div>
                   </div>
                   <div className="pt-8 flex items-center gap-4 border-t border-slate-50">
                      <div className="w-10 h-10 rounded-full bg-slate-50"></div>
                      <div className="space-y-1.5">
                         <div className="h-3 w-24 bg-slate-50 rounded-full"></div>
                         <div className="h-2 w-16 bg-slate-50 rounded-full"></div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Floating UI Elements */}
             <motion.div 
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-6 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl z-20 w-56 border border-white"
             >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><Tag className="w-5 h-5"/></div>
                   <p className="font-bold text-slate-800 text-sm">Nuevos Recursos</p>
                </div>
                <div className="space-y-2">
                   <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                   <div className="h-1.5 w-3/4 bg-slate-100 rounded-full"></div>
                </div>
             </motion.div>

             {/* Floating Social Pill */}
             <motion.div 
               animate={{ x: [0, -10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-6 -left-10 bg-[#1A1F36] text-white px-6 py-4 rounded-2xl shadow-xl flex gap-3 items-center z-20 border border-white/10"
             >
                <Sparkles className="w-5 h-5 text-neon" />
                <p className="font-bold text-xs uppercase tracking-widest">Contenido exclusivo</p>
             </motion.div>
          </motion.div>
        </div>
      </section>

      <FadeIn delay={0} className="px-6 md:px-12 mb-14">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2.5 pb-2 min-w-max md:justify-center">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold border transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105'
                    : 'bg-white text-slate-600 border-slate-100 hover:border-primary/30 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {cat === 'Todos' && <Tag className="w-4 h-4" />}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════ FEATURED ARTICLE ═══════════════════════ */}
      {featured && (
        <section className="px-6 md:px-12 mb-20">
          <FeaturedArticle article={featured} />
        </section>
      )}

      {/* ═══════════════════════ ARTICLE GRID ═══════════════════════ */}
      <section className="px-6 md:px-12">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">El Blog de EducaLab</span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Artículos recientes</h2>
            <p className="text-slate-500 mt-2 font-medium">Explora todas las tendencias y metodologías educativas</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-bright transition-colors group px-6 py-3 rounded-full bg-primary/5 border border-primary/10">
            Explorar todas
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════ NEWSLETTER CTA ═══════════════════════ */}
      <div id="newsletter">
        <FadeIn delay={0.1} className="px-6 md:px-12 pt-32 mb-24">
        <div className="bg-[#1A1F36] rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden shadow-2xl max-w-6xl mx-auto group">
          {/* Decorative background effects */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-primary-bright/20 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-primary-bright opacity-10 rounded-full blur-[120px] pointer-events-none group-hover:translate-x-10 transition-transform duration-1000" />
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-neon opacity-5 rounded-full blur-[100px] pointer-events-none group-hover:-translate-x-10 transition-transform duration-1000" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-white/70 font-bold text-[10px] uppercase tracking-widest mb-8 border border-white/10">
                <Sparkles className="w-3 h-3 text-neon" />
                Comunidad Educativa
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {siteData.newsletter_titulo || 'Recibe el boletín más completo'}
              </h2>
              <p className="text-white/60 leading-relaxed text-lg max-w-xl mx-auto lg:mx-0 font-medium">
                {siteData.newsletter_subtitulo || 'Únete a más de 1,500 docentes. Recibe guías, plantillas y las últimas noticias de IA y educación cada martes.'}
              </p>
            </div>

            <div className="flex-1 max-w-md mx-auto lg:mx-0">
               <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1.5 mb-6">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Tu mejor email</label>
                    <input
                      type="email"
                      placeholder="hola@colegio.com"
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 font-medium text-sm focus:outline-none focus:border-neon/50 focus:bg-white/10 focus:ring-4 focus:ring-neon/5 transition-all text-center lg:text-left"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4.5 bg-neon text-primary-dark font-black text-sm rounded-2xl hover:bg-white hover:scale-[1.02] transform transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2 group/btn"
                    style={{ color: '#053b26' }}
                  >
                    SUSCRIBIRME AHORA
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-white/30 text-center font-bold uppercase tracking-tighter mt-4">
                    Sin spam · Un clic para darte de baja
                  </p>
                </form>
               </div>
            </div>
          </div>
        </div>
      </FadeIn>
      </div>
    </main>
  );
}
