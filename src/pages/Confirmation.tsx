import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { getPlanById, type PlanId } from '@/data/plans';
import { usePurchase } from '@/context/PurchaseContext';

/**
 * Página de Confirmación (/confirmacion).
 *
 * Flujo:
 *  1. Muestra un loader de ~2 segundos simulando el procesamiento del pago.
 *  2. Genera un código random tipo "ATLAS-XXXX-XXXX".
 *  3. Guarda el código en el contexto (localStorage) para validar en /activar.
 *     El código NO se muestra en pantalla — solo llega por email.
 *  4. Hace un fetch POST (no-cors) al webhook configurado con { email, plan, code }.
 *  5. Muestra mensaje de éxito indicando que el código llegó por email.
 *
 * El webhook se envía con mode: "no-cors" — por lo tanto la response es opaca
 * y no podemos leer su contenido, pero el request llega al servidor.
 */

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyAYrkUdgrUTeKSOoXHRBMIkbrsRdr1veosqc8sncNuZI8PWfcSZ5WwYSlZqKkH79uQ/exec';

/** Genera un código de activación con formato ATLAS-XXXX-XXXX (mayúsculas + números). */
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const block = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `ATLAS-${block()}-${block()}`;
}

export default function Confirmation() {
  const navigate = useNavigate();
  const { planId, name, email, code, companyName, phone, setPurchase } = usePurchase();

  const [status, setStatus] = useState<'processing' | 'done'>('processing');

  const plan = planId ? getPlanById(planId as PlanId) : undefined;

  useEffect(() => {
    // Si no hay datos de compra, redirigimos al inicio.
    if (!planId || !email) {
      navigate('/', { replace: true });
      return;
    }

    // Si ya tenemos un código guardado (venimos de re-cargar), lo usamos.
    if (code) {
      setStatus('done');
      return;
    }

    // Simulación de procesamiento de pago (~2s).
    const newCode = generateCode();
    const timer = setTimeout(() => {
      setPurchase({ code: newCode });
      setStatus('done');

      // Enviamos el código al webhook (no bloquea la UI).
      try {
        fetch(WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            plan: planId,
            code: newCode,
            name,
            companyName,
            phone,
          }),
        }).catch(() => {
          /* no-op: el webhook es best-effort */
        });
      } catch {
        /* no-op */
      }
    }, 2000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Estado: procesando ─────────────────────────────────────────────
  if (status === 'processing') {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-5 pt-20 dark:bg-slate-950">
        <div className="text-center">
          <div className="relative mx-auto h-20 w-20">
            <span className="absolute inset-0 rounded-full bg-brand-200/60 animate-pulse-ring dark:bg-brand-800/30" />
            <span className="absolute inset-0 rounded-full bg-brand-200/60 animate-pulse-ring [animation-delay:0.6s] dark:bg-brand-800/30" />
            <div className="absolute inset-0 grid place-items-center">
              <Loader2 className="h-10 w-10 animate-spin text-brand-600 dark:text-brand-400" />
            </div>
          </div>
          <h1 className="mt-8 text-2xl font-bold text-slate-900 dark:text-white">
            Procesando tu pago…
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Estamos confirmando tu contratación. Esto toma solo unos segundos.
          </p>
        </div>
      </div>
    );
  }

  // ─── Estado: confirmado ─────────────────────────────────────────────
  return (
    <div className="bg-slate-50 pt-24 pb-20 dark:bg-slate-900">
      <div className="mx-auto max-w-xl px-5 sm:px-8">
        <div className="card overflow-hidden text-center">
          {/* Banner superior */}
          <div className="relative bg-gradient-to-br from-accent-500 to-accent-700 px-6 py-10 text-white">
            <div className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/20 backdrop-blur">
                <CheckCircle2 className="h-9 w-9" strokeWidth={2.5} />
              </div>
              <h1 className="mt-4 text-2xl font-extrabold sm:text-3xl">
                ¡Pago confirmado!
              </h1>
              <p className="mt-1 text-accent-50">
                {plan ? `Plan ${plan.name} activado` : 'Tu plan fue activado'}
              </p>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-3 rounded-xl bg-brand-50 p-4 text-left dark:bg-brand-900/30">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Te enviamos un código de acceso a{' '}
                <span className="font-semibold text-slate-900 dark:text-white">{email}</span>.
                Revisá también tu carpeta de spam por si acaso.
              </p>
            </div>

            {/* Aviso simple, sin mostrar el código */}
            <div className="mt-6 rounded-xl bg-brand-50 p-4 text-center dark:bg-brand-900/30">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Revisá tu email — ahí vas a encontrar el código para activar tu cuenta.
              </p>
            </div>

            {/* CTA */}
            <Link to="/activar" className="btn-primary mt-6 w-full">
              Activar mi acceso
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/"
              className="mt-3 inline-block text-sm font-medium text-slate-500 transition-colors hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}