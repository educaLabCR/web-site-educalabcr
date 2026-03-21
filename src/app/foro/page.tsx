'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  MessageSquare, Users, TrendingUp, Search, PlusCircle, 
  MessageCircle, Star, Hash, ArrowLeft, ArrowRight,
  Clock, Heart, Share2
} from 'lucide-react';

const CATEGORIES = [
  { id: 'inspiracion', name: 'Inspiración', count: 124, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'dudas', name: 'Dudas Académicas', count: 450, icon: MessageCircle, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'recursos', name: 'Recursos Docentes', count: 89, icon: Hash, color: 'text-accent', bg: 'bg-accent/10' },
  { id: 'colaboracion', name: 'Colaboración', count: 215, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
];

const RECENT_POSTS = [
  {
    id: 1,
    title: '¿Cómo aplicar IA en el aula de primaria?',
    author: 'María González',
    category: 'Recursos Docentes',
    replies: 24,
    likes: 56,
    time: 'hace 2 horas',
    tags: ['IA', 'Docencia', 'Innovación'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
  },
  {
    id: 2,
    title: 'Grupo de estudio para certificación UI/UX Marzo',
    author: 'Carlos Ruiz',
    category: 'Colaboración',
    replies: 12,
    likes: 31,
    time: 'hace 5 horas',
    tags: ['Diseño', 'Estudio', 'Certificación'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
  },
  {
    id: 3,
    title: 'Mejorando la retención de alumnos en cursos asíncronos',
    author: 'Eduardo Soto',
    category: 'Inspiración',
    replies: 45,
    likes: 120,
    time: 'ayer',
    tags: ['E-learning', 'Psicología', 'Tips'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eduardo'
  }
];

export default function ForoPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 pt-24">
      {/* Header / Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-bold text-sm">
          <ArrowLeft className="w-4 h-4"/> Volver al inicio
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
              Foro de la <span className="text-primary italic">Comunidad</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-2xl text-lg">
              El espacio donde educadores y estudiantes de toda Latinoamérica comparten conocimientos, resuelven dudas y colaboran en proyectos reales.
            </p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary transition-all shadow-xl shadow-slate-900/10">
            <PlusCircle className="w-5 h-5"/> Crear Nuevo Tema
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Sidebar Left: Categories */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Hash className="w-5 h-5 text-primary"/> Categorías
            </h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id} 
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${cat.bg} ${cat.color} p-2 rounded-lg`}>
                      <cat.icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-700 text-sm group-hover:text-primary transition-colors">{cat.name}</span>
                  </div>
                  <span className="bg-slate-100 text-slate-400 text-xs font-bold px-2 py-1 rounded-md">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-primary rounded-3xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">¿Necesitas ayuda específica?</h3>
              <p className="text-white/80 text-sm mb-6">Contacta directamente con un asesor o mentor educativo.</p>
              <Link href="/contacto" className="bg-white text-primary px-6 py-2 rounded-full font-bold text-xs hover:bg-neon hover:text-primary transition-colors inline-block">
                Contacto Directo
              </Link>
            </div>
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <MessageSquare className="w-32 h-32"/>
            </div>
          </div>
        </aside>

        {/* Content Center: Search and Topics */}
        <section className="lg:col-span-3 space-y-8">
          {/* Search bar */}
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5"/>
            <input 
              type="text" 
              placeholder="Buscar discusiones, temas o palabras clave..." 
              className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 pl-14 pr-8 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {['Más Recientes', 'Más Populares', 'Para Docentes', 'Sin Respuesta'].map((filter, i) => (
              <button 
                key={filter} 
                className={`flex-shrink-0 px-6 py-3 rounded-full font-bold text-sm transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold' : 'bg-white text-slate-500 border border-slate-100 hover:border-primary hover:text-primary'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {RECENT_POSTS.map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-slate-200/50 group"
              >
                <div className="flex gap-6">
                  <div className="hidden sm:block shrink-0">
                    <img src={post.avatar} alt={post.author} className="w-14 h-14 rounded-2xl bg-slate-100" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3"/> {post.time}
                      </span>
                      <div className="flex gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold">
                        <MessageSquare className="w-4 h-4 text-slate-400"/> {post.replies} <span className="font-medium text-slate-400">respuestas</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold">
                        <Heart className="w-4 h-4 text-red-400 fill-red-400/10"/> {post.likes} <span className="font-medium text-slate-400">me gusta</span>
                      </div>
                      <button className="ml-auto flex items-center gap-2 text-slate-900 font-bold text-sm bg-slate-50 px-5 py-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                        Leer debate <ArrowRight className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination or Load more */}
          <div className="text-center pt-8">
            <button className="inline-flex items-center gap-2 text-slate-500 font-black hover:text-primary transition-all">
              Cargar más temas <ArrowRight className="w-5 h-5"/>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
