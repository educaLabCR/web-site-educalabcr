import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'EducaLabCR | Educación Virtual y Desarrollo Profesional',
  description:
    'Somos una plataforma de formación en línea de vanguardia en Costa Rica, dedicada al desarrollo profesional de todos los sectores.',
};

function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="md:w-1/3">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <svg
                className="w-10 h-10 stroke-[var(--color-apple)] stroke-[2.5px] fill-transparent transition-transform duration-300 group-hover:rotate-12"
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
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 pr-4">
              Innovación en Cada Lección. Capacitación avanzada para profesionales con inteligencia artificial y métodos interactivos.
            </p>
            <div className="flex gap-4">
              {/* social links fake */}
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-slate-900 mb-6 text-sm">Empresa</h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="/" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Inicio</Link></li>
                <li><Link href="/acerca-de-nosotros" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Nosotros</Link></li>
                <li><Link href="/ofertas-en-vivo" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Cursos en Vivo</Link></li>
                <li><Link href="/oferta-asincronica" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Asincrónicos</Link></li>
              </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-6 text-sm">Plataforma</h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Características</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Integraciones</Link></li>
                <li><Link href="https://educalabcr.moodlecloud.com/" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Entorno Virtual</Link></li>
              </ul>
            </div>
             <div>
               <h4 className="font-bold text-slate-900 mb-6 text-sm">Recursos</h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="/boletin" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Boletín</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Documentación</Link></li>
              </ul>
            </div>
             <div>
               <h4 className="font-bold text-slate-900 mb-6 text-sm">Soporte</h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="/contacto" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Contacto</Link></li>
                <li><a href="https://wa.me/message/4C7ONIA7WR5ZF1" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">WhatsApp</a></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-accent transition-colors">Teléfono: +(506) 7014-7031</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100/60 pb-4">
          <p className="text-slate-400 text-xs font-medium mb-4 md:mb-0">
            © {new Date().getFullYear()} EducaLabCR. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
             <Link href="#" className="text-slate-400 text-xs font-medium hover:text-slate-600 transition-colors">Terms of Service</Link>
             <Link href="#" className="text-slate-400 text-xs font-medium hover:text-slate-600 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
