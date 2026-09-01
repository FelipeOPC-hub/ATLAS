import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '@/components/Logo';

/** Footer institucional de ATLAS. */
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Marca */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Plataforma de contratación, control y auditoría de servicios de
              limpieza para empresas. Transparencia total, seguimiento en tiempo
              real y reportes auditables.
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-accent-50 px-3 py-2 text-sm font-medium text-accent-700 w-fit dark:bg-accent-900/30 dark:text-accent-300">
              <ShieldCheck className="h-4 w-4" />
              Plataforma confiable para empresas
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Plataforma</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="/#que-es" className="text-slate-500 transition-colors hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400">Qué es ATLAS</a></li>
              <li><a href="/#precios" className="text-slate-500 transition-colors hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400">Planes y precios</a></li>
              <li><a href="/#faq" className="text-slate-500 transition-colors hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400">Preguntas frecuentes</a></li>
              <li><Link to="/activar" className="text-slate-500 transition-colors hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400">Activar mi acceso</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                hola@atlas.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                +54 11 5555-0000
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Buenos Aires, Argentina
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row dark:border-slate-800 dark:text-slate-500">
          <p>© {new Date().getFullYear()} ATLAS. Todos los derechos reservados.</p>
          <p className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-brand-700 dark:hover:text-brand-400">Términos</a>
            <a href="#" className="transition-colors hover:text-brand-700 dark:hover:text-brand-400">Privacidad</a>
          </p>
        </div>
      </div>
    </footer>
  );
}