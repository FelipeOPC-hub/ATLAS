import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Mail, Copy, Check, ArrowRight, Loader2 } from 'lucide-react';
import { getPlanById, type PlanId } from '@/data/plans';
import { usePurchase } from '@/context/PurchaseContext';

/**
 * Página de Confirmación (/confirmacion).
 *
 * Flujo:
 *  1. Muestra un loader de ~2 segundos simulando el procesamiento del pago.
 *  2. Genera un código random tipo "ATLAS-XXXX-XXXX".
 *  3. Guarda el código en el contexto (localStorage) para validar en /activar.
 *  4. Hace un fetch POST (no-cors) al webhook configurado con { email, plan, code }.
 *  5. Muestra mensaje de éxito con el email y el código.
 *
 * El webhook se envía con mode: "no-cors" — por lo tanto la response es opaca
 * y no podemos leer su contenido, pero el request llega al servidor.
 */

// ⬇️ Pegá aquí la URL de tu webhook (Make, Zapier, n8n, etc.)
const WEBHOOK_URL = 'PEGAR_URL_AQUI';

/** Genera un código de activación con formato ATLAS-XXXX-XXXX (mayúsculas + números). */
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const block = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `ATLAS-${block()}-${block()}`;
}

export default function Confirmation() {
  const navigate = useNavigate();
  const { planId, name, email, code, setPurchase } = usePurchase();

  const [status, setStatus] = useState<'processing' | 'done'>('processing');
  const [displayCode, setDisplayCode] = useState(code);
  const [copied, setCopied] = useState(false);

  const plan = planId ? getPlanById(planId as PlanId) : undefined;

  useEffect(() => {
    // Si no hay datos de compra, redirigimos al inicio.
    if (!planId || !email) {
      navigate('/', { replace: true });
      return;
    }

    // Si ya tenemos un código guardado (venimos de re-cargar), lo usamos.
    if (code) {
      setDisplayCode(code);
      setStatus('done');
      return;
    }

    // Simulación de procesamiento de pago (~2s).
    const newCode = generateCode();
    const timer = setTimeout(() => {
      setDisplayCode(newCode);
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

  const handleCopy = () => {
    navigator.clipboard?.writeText(displayCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ─── Estado: procesando ─────────────────────────────────────────────
  if (status === 'processing') {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-5 pt-20">
        <div className="text-center">
          <div className="relative mx-auto h-20 w-20">
            <span className="absolute inset-0 rounded-full bg-brand-200/60 animate-pulse-ring" />
            <span className="absolute inset-0 rounded-full bg-brand-200/60 animate-pulse-ring [animation-delay:0.6s]" />
            <div className="absolute inset-0 grid place-items-center">
              <Loader2 className="h-10 w-10 animate-spin text-brand-600" />
            </div>
          </div>
          <h1 className="mt-8 text-2xl font-bold text-slate-900">
            Procesando tu pago…
          </h1>
          <p className="mt-2 text-slate-500">
            Estamos confirmando tu contratación. Esto toma solo unos segundos.
          </p>
        </div>
      </div>
    );
  }

  // ─── Estado: confirmado ─────────────────────────────────────────────
  return (
    <div className="bg-slate-50 pt-24 pb-20">
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
            <div className="flex items-start gap-3 rounded-xl bg-brand-50 p-4 text-left">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <p className="text-sm text-slate-600">
                Te enviamos un código de acceso a{' '}
                <span className="font-semibold text-slate-900">{email}</span>.
                Revisá también tu carpeta de spam por si acaso.
              </p>
            </div>

            {/* Código generado */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-700">
                Tu código de activación
              </p>
              <div className="mt-2 flex items-center gap-2">
                <code className="flex-1 select-none rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/50 px-4 py-3.5 text-center font-mono text-xl font-bold tracking-widest text-brand-800">
                  {displayCode}
                </code>
                <button
                  onClick={handleCopy}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-brand-300 hover:text-brand-700"
                  aria-label="Copiar código"
                >
                  {copied ? <Check className="h-5 w-5 text-accent-600" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Guardá este código: lo vas a necesitar para activar tu acceso.
              </p>
            </div>

            {/* CTA */}
            <Link to="/activar" className="btn-primary mt-6 w-full">
              Activar mi acceso
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/"
              className="mt-3 inline-block text-sm font-medium text-slate-500 transition-colors hover:text-brand-700"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
