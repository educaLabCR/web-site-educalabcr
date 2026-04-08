'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MessageSquare, Users, Star, Hash, ArrowLeft,
  Clock, Heart, Share2, X, Mail, Send, Reply
} from 'lucide-react';

export default function TemaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [topic, setTopic] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states for new reply
  const [authorNombre, setAuthorNombre] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [contenido, setContenido] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [topicRes, repliesRes] = await Promise.all([
        fetch(`/api/foro/temas/${id}`),
        fetch(`/api/foro/temas/${id}/respuestas`)
      ]);

      if (topicRes.ok) {
        const topicData = await topicRes.json();
        setTopic(topicData);
      }
      if (repliesRes.ok) {
        const repliesData = await repliesRes.json();
        setReplies(repliesData);
      }
    } catch (error) {
      console.error('Error fetching topic detail', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorNombre || !contenido) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/foro/temas/${id}/respuestas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          autor_nombre: authorNombre,
          autor_email: authorEmail,
          contenido: contenido
        })
      });

      if (res.ok) {
        setContenido('');
        fetchData(); // Refresh to show the new reply
      }
    } catch (error) {
      console.error('Error posting reply', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !topic) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">El tema no existe o ha sido eliminado.</h1>
        <Link href="/foro" className="text-primary font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4"/> Volver al foro
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 pt-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumbs / Back */}
        <Link href="/foro" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-bold text-sm group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/> Volver al foro
        </Link>

        {/* Main Topic Card */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-10 overflow-hidden relative"
        >
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/5 px-4 py-1.5 rounded-full">
                {topic.categoria_id?.name || 'General'}
              </span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4"/> {new Date(topic.date_created).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
              {topic.title}
            </h1>
            <div className="flex items-center justify-between border-b border-slate-50 pb-8">
              <div className="flex items-center gap-4">
                <img src={topic.autor_avatar} alt={topic.autor_nombre} className="w-14 h-14 rounded-2xl bg-slate-100 object-cover" />
                <div>
                  <h4 className="font-black text-slate-900 leading-none mb-1">{topic.autor_nombre}</h4>
                  <p className="text-slate-400 text-xs font-bold">Autor del debate</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group">
                   <Heart className="w-5 h-5 group-active:scale-125 transition-transform" />
                </button>
                <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                   <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div 
            className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed text-lg mb-10"
            dangerouslySetInnerHTML={{ __html: topic.contenido }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
            {(topic.tags || []).map((tag: string) => (
              <span key={tag} className="text-xs font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-xl group hover:text-primary transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </motion.article>

        {/* Replies Section */}
        <section className="space-y-6 mb-12">
          <div className="flex items-center justify-between mb-8 px-4">
             <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
               <MessageSquare className="w-6 h-6 text-primary"/> Respuestas <span className="text-slate-300">({replies.length})</span>
             </h3>
             <div className="h-[2px] flex-1 bg-slate-100 mx-6"></div>
          </div>

          <div className="space-y-6">
            {replies.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-10 text-center border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">No hay respuestas todavía. ¡Sé el primero en comentar!</p>
              </div>
            ) : (
              replies.map((reply, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={reply.id} 
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 group hover:border-primary/20 transition-all"
                >
                  <div className="flex gap-6">
                    <img src={reply.autor_avatar} alt={reply.autor_nombre} className="w-12 h-12 rounded-xl bg-slate-100 shrink-0 object-cover shadow-sm" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-black text-slate-800">{reply.autor_nombre}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                          {new Date(reply.date_created).toLocaleDateString()}
                        </span>
                      </div>
                      <div 
                        className="text-slate-600 font-medium leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: reply.contenido }}
                      />
                      <div className="mt-4 flex items-center gap-4">
                         <button className="text-xs font-bold text-slate-400 hover:text-primary flex items-center gap-1.5 transition-colors">
                           <Heart className="w-3.5 h-3.5" /> Útil
                         </button>
                         <button className="text-xs font-bold text-slate-400 hover:text-primary flex items-center gap-1.5 transition-colors">
                           <Reply className="w-3.5 h-3.5" /> Responder
                         </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Reply Form */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-2">Añadir a la conversación</h2>
            <p className="text-slate-400 font-medium mb-8">Comparte tu perspectiva con la comunidad.</p>

            <form onSubmit={handleReply} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Tu Nombre</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Ana Pérez"
                      value={authorNombre}
                      onChange={(e) => setAuthorNombre(e.target.value)}
                      className="w-full bg-slate-800 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary transition-all text-white font-bold"
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Tu Correo (opcional)</label>
                   <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
                    <input 
                      type="email" 
                      placeholder="ana@ejemplo.com"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      className="w-full bg-slate-800 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary transition-all text-white font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Mensaje</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Escribe tu respuesta aquí..."
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  className="w-full bg-slate-800 border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary transition-all text-white font-bold resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Publicar Respuesta <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Decorative element */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4">
             <MessageSquare className="w-64 h-64" />
          </div>
        </section>
      </div>
    </main>
  );
}
