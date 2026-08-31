import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, CreditCard } from 'lucide-react';
import { PLANS, getPlanById, type PlanId } from '@/data/plans';
import { usePurchase } from '@/context/PurchaseContext';

/**
 * Página de Checkout (/checkout).
 * Muestra un resumen del plan elegido + formulario (nombre, email).
 * El botón "Pagar" es mock — no procesa pago real.
 * Al confirmar guarda los datos en el contexto y redirige a /confirmacion.
 */
export default function Checkout() {
  const navigate = useNavigate();
  const { planId, name: savedName, email: savedEmail, setPurchase } = usePurchase();

  const [name, setName] = useState(savedName);
  const [email, setEmail] = useState(savedEmail || '45024988@ies9023.net');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const plan = planId ? getPlanById(planId as PlanId) : undefined;

  // Si no hay plan elegido, mostramos selector rápido para no romper el flujo.
  if (!plan) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-5 py-20 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <CreditCard className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          No elegiste un plan todavía
        </h1>
        <p className="mt-2 text-slate-500">
          Volvé a la landing y elegí el plan que mejor se ajuste a tu operación.
        </p>
        <Link to="/" className="btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" />
          Volver a la landing
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Ingresá tu nombre completo';
    else if (name.trim().length < 2) e.name = 'El nombre es muy corto';
    if (!email.trim()) e.email = 'Ingresá tu email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = 'El email no es válido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setPurchase({ name: name.trim(), email: email.trim(), planId: plan.id });
    // Pequeño delay para feedback visual del botón.
    setTimeout(() => navigate('/confirmacion'), 400);
  };

  return (
    <div className="bg-slate-50 pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la landing
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Finalizá tu contratación
        </h1>
        <p className="mt-2 text-slate-500">
          Revisá tu plan y completá tus datos para activar el acceso.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Resumen del plan */}
          <aside className="lg:order-2">
            <div className="card overflow-hidden lg:sticky lg:top-24">
              <div className="border-b border-slate-100 bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
                <p className="text-sm font-medium text-brand-100">Resumen del pedido</p>
                <h2 className="mt-1 text-2xl font-bold">Plan {plan.name}</h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{plan.price}</span>
                  {plan.price !== 'Consultar' && (
                    <span className="text-sm text-brand-100">/mes</span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold text-slate-900">Incluye:</p>
                <ul className="mt-3 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                      <span className="text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-2 rounded-lg bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700">
                  <ShieldCheck className="h-4 w-4" />
                  Alta inmediata tras la confirmación
                </div>
              </div>
            </div>
          </aside>

          {/* Formulario */}
          <main className="lg:order-1">
            <form onSubmit={handleSubmit} className="card p-6 sm:p-8" noValidate>
              <h2 className="text-xl font-bold text-slate-900">Tus datos</h2>
              <p className="mt-1 text-sm text-slate-500">
                Te enviaremos el código de acceso a tu email.
              </p>

              <div className="mt-6 space-y-5">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: María González"
                    autoComplete="name"
                    className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-4 ${
                      errors.name
                        ? 'border-red-300 focus:ring-red-500/20'
                        : 'border-slate-200 focus:border-brand-400 focus:ring-brand-500/20'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maria@tuempresa.com"
                    autoComplete="email"
                    className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-4 ${
                      errors.email
                        ? 'border-red-300 focus:ring-red-500/20'
                        : 'border-slate-200 focus:border-brand-400 focus:ring-brand-500/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Separador método de pago (mock) */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CreditCard className="h-4 w-4 text-brand-600" />
                  Método de pago
                </p>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4">
                  <div className="grid h-10 w-14 place-items-center rounded-md bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-white">
                    CARD
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">Tarjeta de crédito/débito</p>
                    <p className="text-xs text-slate-400">Pago seguro · Demo (no se procesa pago real)</p>
                  </div>
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-6 w-full"
              >
                {submitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Procesando…
                  </>
                ) : (
                  <>
                    Pagar {plan.price}
                    {plan.price !== 'Consultar' && ' / mes'}
                  </>
                )}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <Lock className="h-3.5 w-3.5" />
                Pago seguro y encriptado · Cancelás cuando quieras
              </p>
            </form>
          </main>
        </div>

        {/* Si llegamos sin plan, mostramos opción de cambiar */}
        <div className="mt-10 text-center text-sm text-slate-500">
          ¿Querés otro plan?{' '}
          <Link to="/" className="font-semibold text-brand-700 hover:underline">
            Ver todos los planes
          </Link>
        </div>
      </div>
    </div>
  );
}
