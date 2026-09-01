import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Logo from '@/components/Logo';

/** Navbar superior con cambio de estilo al hacer scroll y conmutador de tema oscuro. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme') === 'dark') return 'dark';
      if (document.documentElement.classList.contains('dark')) return 'dark';
    }
    return 'light';
  });
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const links = [
    { label: 'Qué es ATLAS', href: '/#que-es' },
    { label: 'Planes', href: '/#precios' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-sm dark:border-slate-800/70 dark:bg-slate-900/85'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link to="/" aria-label="Inicio ATLAS">
          <Logo />
        </Link>

        {/* Links desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-700 dark:text-slate-300 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => navigate('/#precios')}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-0.5"
          >
            Ver planes
          </button>
          <NavLink
            to="/activar"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-brand-700 dark:text-slate-400 dark:hover:text-white"
          >
            Ya tengo código
          </NavLink>

          {/* Botón cambiar tema Desktop */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Botón menú mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menú mobile desplegable */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                navigate('/#precios');
              }}
              className="mt-2 rounded-xl bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/25"
            >
              Ver planes
            </button>
            <NavLink
              to="/activar"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg px-3 py-3 text-base font-medium text-slate-500 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              Ya tengo código
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}