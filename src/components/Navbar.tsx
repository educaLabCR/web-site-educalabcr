'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/ofertas-en-vivo', label: 'Cursos' },
  { href: '/oferta-asincronica', label: 'Oferta Asincrónica' },
  { href: '/acerca-de-nosotros', label: 'Nosotros' },
  { href: '/boletin', label: 'Boletín' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Main Navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm shadow-slate-900/[0.06]'
            : 'bg-white/0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[4.5rem] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <svg
              className="w-11 h-11 stroke-[var(--color-apple)] stroke-[2.5px] fill-transparent transition-transform duration-300 group-hover:rotate-12"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="65" cy="50" r="38" />
              <ellipse cx="65" cy="50" rx="18" ry="38" />
              <line x1="27" y1="50" x2="100" y2="50" />
              <line x1="65" y1="12" x2="65" y2="88" />
              <path d="M40 25 L 30 25 L 30 55 L 20 65 L 20 75 L 35 75 L 40 70" />
              <circle cx="40" cy="25" r="3" className="fill-[var(--color-apple)] stroke-none" />
              <circle cx="20" cy="75" r="3" className="fill-[var(--color-apple)] stroke-none" />
              <circle cx="42" cy="62" r="3" className="fill-[var(--color-apple)] stroke-none" />
              <path d="M42 62 L 35 62 L 25 72" />
            </svg>
            <div className="flex flex-col">
              <div className="text-2xl font-bold leading-none tracking-tight flex">
                <span className="text-[var(--color-apple)]">Educa</span>
                <span className="text-slate-900">Lab</span>
              </div>
              <div className="text-[11px] font-normal text-slate-500 tracking-tight mt-0.5">
                Conocimiento,{' '}
                <span className="text-[var(--color-apple)]">Innovación y</span> Éxito
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-slate-900'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-accent rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contacto"
              className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Contacto
            </Link>
            <Link
              href="https://educalabcr.moodlecloud.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/20 hover:bg-slate-800 transition-all duration-200"
            >
              Plataforma
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-slate-700" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-slate-700" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl shadow-slate-900/20 flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[4.5rem] border-b border-slate-100">
                <span className="font-bold text-slate-900">Menú</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col gap-1 p-4 flex-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * i, duration: 0.35, ease: 'easeOut' }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[var(--color-primary)]/8 text-[var(--color-primary)] font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer CTA */}
              <div className="p-4 border-t border-slate-100">
                <Link
                  href="https://educalabcr.moodlecloud.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[var(--color-primary)] text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-[var(--color-primary-bright)] transition-colors"
                >
                  Entorno Virtual ↗
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
