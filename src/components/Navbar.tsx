import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

/** Navbar superior con cambio de estilo al hacer scroll. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Qué es ATLAS', href: '/#que-es' },
    { label: 'Planes', href: '/#precios' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-sm'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link to="/" aria-label="Inicio ATLAS">
          <Logo />
        </Link>

        {/* Links desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
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
            className="text-sm font-medium text-slate-500 transition-colors hover:text-brand-700"
          >
            Ya tengo código
          </NavLink>
        </div>

        {/* Botón menú mobile */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Menú mobile desplegable */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
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
              className="mt-1 rounded-lg px-3 py-3 text-base font-medium text-slate-500 transition-colors hover:bg-slate-50"
            >
              Ya tengo código
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
