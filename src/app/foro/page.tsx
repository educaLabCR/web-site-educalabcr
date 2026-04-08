'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MessageSquare, Users, TrendingUp, Search, PlusCircle, 
  MessageCircle, Star, Hash, ArrowLeft, ArrowRight,
  Clock, Heart, Share2, X, Mail, Plus
} from 'lucide-react';

// Icon mapper for the dynamic categories
const iconMap: Record<string, any> = {
  'Star': Star,
  'MessageCircle': MessageCircle,
  'Hash': Hash,
  'Users': Users,
  'MessageSquare': MessageSquare,
  'TrendingUp': TrendingUp
};

export default function ForoPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newTags, setNewTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category state
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/foro');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
        setTopics(data.topics || []);
      }
    } catch (error) {
      console.error('Error fetching forum data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCategory || !newAuthor || !newEmail) return;
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/foro/temas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle,
          autor_nombre: newAuthor,
          autor_email: newEmail,
          categoria_id: parseInt(newCategory),
          contenido: newContent,
          tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
        })
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewTitle('');
        setNewContent('');
        setNewAuthor('');
        setNewEmail('');
        setNewTags('');
        fetchData(); // re-fetch data
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName) return;
    setIsCreatingCategory(true);

    try {
      const res = await fetch('/api/foro/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName })
      });

      if (res.ok) {
        setNewCategoryName('');
        setIsCategoryModalOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingCategory(false);
    }
  };

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
          <div className="flex gap-3">
            <button 
              onClick={() => setIsCategoryModalOpen(true)}
              className="bg-white text-slate-700 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
            >
              <Plus className="w-5 h-5"/> Categoría
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary transition-all shadow-xl shadow-slate-900/10"
            >
              <PlusCircle className="w-5 h-5"/> Crear Tema
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Sidebar Left: Categories */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary"/> Categorías
              </h3>
              <button 
                onClick={() => setIsCategoryModalOpen(true)}
                className="text-primary hover:bg-primary/5 p-1 rounded-lg transition-colors"
                title="Crear nueva categoría"
              >
                <Plus className="w-4 h-4"/>
              </button>
            </div>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-slate-100 rounded-xl"></div>
                <div className="h-10 bg-slate-100 rounded-xl"></div>
                <div className="h-10 bg-slate-100 rounded-xl"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {categories.map((cat) => {
                  const IconComponent = iconMap[cat.icon] || Hash;
                  return (
                    <button 
                      key={cat.id} 
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${cat.bg} ${cat.color} p-2 rounded-lg`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-700 text-sm group-hover:text-primary transition-colors">{cat.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
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
            {loading ? (
               <div className="animate-pulse space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="bg-white h-32 rounded-[2rem] w-full border border-slate-100"></div>
                 ))}
               </div>
            ) : topics.length === 0 ? (
               <div className="text-center py-10 bg-white rounded-[2rem] border border-slate-100">
                  <p className="text-slate-500 font-bold">No hay temas aún. ¡Sé el primero en crear uno!</p>
               </div>
            ) : (
                topics.map((post, index) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-slate-200/50 group"
                  >
                    <div className="flex gap-6">
                      <div className="hidden sm:block shrink-0">
                        <img src={post.autor_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Generico'} alt={post.autor_nombre} className="w-14 h-14 rounded-2xl bg-slate-100" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">
                            {post.categoria_id?.name || 'General'}
                          </span>
                          <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3"/> {new Date(post.date_created).toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            {(post.tags || []).map((tag: string) => (
                              <span key={tag} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer">#{tag}</span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold">
                            <MessageSquare className="w-4 h-4 text-slate-400"/> {post.replies_count || 0} <span className="font-medium text-slate-400">respuestas</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold">
                            <Heart className="w-4 h-4 text-red-400 fill-red-400/10"/> {post.likes || 0} <span className="font-medium text-slate-400">me gusta</span>
                          </div>
                          <Link 
                            href={`/foro/${post.id}`}
                            className="ml-auto flex items-center gap-2 text-slate-900 font-bold text-sm bg-slate-50 px-5 py-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-all"
                          >
                            Leer debate <ArrowRight className="w-4 h-4"/>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
            )}
          </div>

          {!loading && topics.length > 0 && (
            <div className="text-center pt-8">
              <button className="inline-flex items-center gap-2 text-slate-500 font-black hover:text-primary transition-all">
                Cargar más temas <ArrowRight className="w-5 h-5"/>
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Modal Crear Tema */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full"
              >
                <X className="w-5 h-5"/>
              </button>
              
              <h2 className="text-2xl font-black text-slate-900 mb-2">Crear Nuevo Tema</h2>
              <p className="text-slate-500 text-sm font-medium mb-8">Participa en la comunidad de EducaLab.</p>
              
              <form onSubmit={handleCreateTopic} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tu Nombre</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
                      <input 
                        type="text" 
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                        placeholder="Ej. Carlos Ruiz"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tu Correo</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
                      <input 
                        type="email" 
                        required
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                        placeholder="carlos@ejemplo.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Título del Tema</label>
                  <input 
                    type="text" 
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                    placeholder="Escribe un título descriptivo"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-700">Categoría</label>
                    <button 
                      type="button" 
                      onClick={() => {
                        setIsModalOpen(false);
                        setIsCategoryModalOpen(true);
                      }}
                      className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3 h-3"/> Crear nueva
                    </button>
                  </div>
                  <select 
                    required
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-slate-700"
                  >
                    <option value="">Selecciona una categoría...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contenido</label>
                  <textarea 
                    rows={4}
                    value={newContent}
                    required
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium resize-none"
                    placeholder="Describe tu duda o comparte tu conocimiento..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Etiquetas (separadas por coma)</label>
                  <input 
                    type="text" 
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                    placeholder="Ej. IA, Docencia, Recursos..."
                  />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : 'Publicar Tema'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Crear Categoría */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsCategoryModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 overflow-y-auto"
            >
              <button 
                onClick={() => setIsCategoryModalOpen(false)}
                className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full"
              >
                <X className="w-5 h-5"/>
              </button>
              
              <h2 className="text-2xl font-black text-slate-900 mb-2">Nueva Categoría</h2>
              <p className="text-slate-500 text-sm font-medium mb-6">Ayúdanos a organizar mejor los debates.</p>
              
              <form onSubmit={handleCreateCategory} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nombre de la Categoría</label>
                  <input 
                    type="text" 
                    required
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                    placeholder="Ej. Programación, Arte, etc."
                  />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    disabled={isCreatingCategory}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isCreatingCategory ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : 'Crear Categoría'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
