import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  KeyRound,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Monitor,
} from 'lucide-react';
import { usePurchase } from '@/context/PurchaseContext';

/**
 * Página de Activación (/activar).
 * Permite validar el código comprado o el Código Supremo del Administrador
 * para redirigir de forma fluida al Panel de Control Web (localhost/panel).
 */
export default function Activation() {
  const { code: savedCode, email } = usePurchase();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = input.trim().toUpperCase();
    if (!clean) {
      setState('error');
      return;
    }

    // Código Supremo del Administrador (temporal para localhost)
    const MASTER_CODE = 'ATLAS-SUPREMO-2026';

    // Verificamos si coincide con el código de compra o el supremo
    if (clean === MASTER_CODE || (savedCode && clean === savedCode.toUpperCase())) {
      setState('success');
      // Guardamos la sesión local para habilitar el acceso a la ruta protegida
      localStorage.setItem('atlas_auth', 'true');
      
      // Redirigimos al panel web luego de un breve instante visual
      setTimeout(() => {
        navigate('/panel');
      }, 1200);
    } else {
      setState('error');
    }
  };

  return (
    <div className="bg-slate-50 pt-24 pb-20 dark:bg-slate-950">
      <div className="mx-auto max-w-md px-5 sm:px-8">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/30">
            <KeyRound className="h-8 w-8" strokeWidth={2} />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Activar mi acceso
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Ingresá tu código de acceso o credencial de administrador para entrar al panel.
          </p>
        </div>

        {/* Formulario de activación */}
        <form onSubmit={handleActivate} className="card mt-8 p-6 sm:p-8" noValidate>
          <label htmlFor="code" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Código de acceso o Licencia
          </label>
          <input
            id="code"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (state !== 'idle') setState('idle');
            }}
            placeholder="ATLAS-XXXX-XXXX"
            autoComplete="off"
            autoCapitalize="characters"
            className={`mt-2 w-full rounded-xl border bg-white px-4 py-3.5 text-center font-mono text-lg font-bold tracking-widest text-slate-900 uppercase placeholder:text-slate-300 placeholder:tracking-widest placeholder:font-normal transition focus:outline-none focus:ring-4 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-600 ${
              state === 'error'
                ? 'border-red-300 focus:ring-red-500/20 dark:border-red-800'
                : state === 'success'
                ? 'border-accent-400 focus:ring-accent-500/20 dark:border-accent-600'
                : 'border-slate-200 focus:border-brand-400 focus:ring-brand-500/20 dark:border-slate-700'
            }`}
          />

          {/* Feedback */}
          {state === 'error' && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
              <XCircle className="h-4 w-4 shrink-0" />
              El código no es válido. Verificalo e intentá de nuevo.
            </div>
          )}
          {state === 'success' && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              ¡Acceso validado! Redirigiendo al panel web...
            </div>
          )}

          <button type="submit" className="btn-primary mt-5 w-full">
            Ingresar al Panel
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        {/* Sección informativa del Panel Web */}
        <div className="card mt-6 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
              <Monitor className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Panel de Control ATLAS (B2B)</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Gestioná operaciones y operarios desde la PC.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          ¿Necesitás soporte?{' '}
          <Link to="/" className="font-semibold text-brand-700 hover:underline dark:text-brand-400">
            Volvé a la landing
          </Link>
        </div>
      </div>
    </div>
  );
}