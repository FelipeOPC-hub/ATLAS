import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  ShieldCheck,
  ClipboardCheck,
  BarChart3,
  Users,
  Clock,
  Sparkles,
  Star,
} from 'lucide-react';
import { PLANS, type PlanId } from '@/data/plans';
import { usePurchase } from '@/context/PurchaseContext';

/** Sección Hero de la landing. */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white pt-28 pb-20 sm:pt-36 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-900/20" />
        <div className="absolute -right-24 top-32 h-80 w-80 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-900/20" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm backdrop-blur dark:border-brand-800 dark:bg-slate-900/80 dark:text-brand-300">
            <Sparkles className="h-4 w-4 text-accent-500" />
            Nueva plataforma 2026 · Disponible ahora
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
            ATLAS
          </h1>
          <p className="mt-4 text-xl font-semibold text-brand-700 sm:text-2xl dark:text-brand-300">
            Servicios de limpieza, bajo control.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            La plataforma que une a empresas con servicios de limpieza
            profesionales. Contratá, controlá y auditá cada servicio con
            seguimiento en tiempo real y reportes auditables.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#precios" className="btn-primary text-base">
              Ver planes
              <ArrowRight className="h-5 w-5" />
            </a>
            <a 
              href="#que-es" 
              className="btn-outline text-base border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Conocer más
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {[
              { value: '+200', label: 'Empresas activas' },
              { value: '+1.500', label: 'Servicios auditados / mes' },
              { value: '99,2%', label: 'Cumplimiento promedio' },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                  {m.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-500 sm:text-sm dark:text-slate-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-brand-900/10 dark:border-slate-800 dark:bg-slate-900">
              <img
                src="https://images.pexels.com/photos/6195104/pexels-photo-6195104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Profesional de limpieza"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Sección "Qué es ATLAS". */
function WhatIsAtlas() {
  const pillars = [
    {
      icon: Users,
      title: 'Contratación',
      text: 'Conectá tu empresa con servicios de limpieza verificados. Elegí el plan, coordiná y dejá que ATLAS gestione el resto.',
      color: 'bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300',
    },
    {
      icon: Clock,
      title: 'Control en tiempo real',
      text: 'Seguimiento de cada servicio en vivo: horarios, operarios asignados e incidencias, todo desde un panel central.',
      color: 'bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300',
    },
    {
      icon: ClipboardCheck,
      title: 'Auditoría',
      text: 'Reportes auditables con fotos, checklist de cumplimiento y KPIs por sucursal. Transparencia total, sin sorpresas.',
      color: 'bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300',
    },
    {
      icon: ShieldCheck,
      title: 'Confianza',
      text: 'Cada servicio queda registrado y verificable. Cumplimiento garantizado con evidencia, no con promesas.',
      color: 'bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300',
    },
  ];

  return (
    <section id="que-es" className="scroll-mt-24 bg-white py-20 sm:py-28 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow dark:border-brand-800 dark:bg-slate-900 dark:text-brand-300">
            <Sparkles className="h-4 w-4" />
            Qué es ATLAS
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Una plataforma, control total de tus servicios
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            ATLAS es la plataforma que digitaliza la contratación, el control y la
            auditoría de los servicios de limpieza para empresas.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className={`grid h-12 w-12 place-items-center rounded-xl ${p.color}`}>
                <p.icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Tarjeta individual de plan de precios. */
function PricingCard({
  plan,
  onChoose,
}: {
  plan: (typeof PLANS)[number];
  onChoose: (id: PlanId) => void;
}) {
  const highlighted = plan.highlighted;
  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-7 transition-all ${
        highlighted
          ? 'border-brand-500 bg-brand-50/40 shadow-xl dark:border-brand-500 dark:bg-slate-900 lg:-mt-4 lg:mb-4'
          : 'border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
            <Star className="h-3.5 w-3.5 fill-current" />
            {plan.badge}
          </span>
        </div>
      )}

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
      <p className="mt-1.5 min-h-[40px] text-sm leading-snug text-slate-500 dark:text-slate-400">
        {plan.tagline}
      </p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {plan.price}
        </span>
        {plan.price !== 'Consultar' && (
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">/mes</span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500 dark:text-brand-400" />
            <span className="text-slate-600 dark:text-slate-300">{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onChoose(plan.id)}
        className={`mt-7 w-full ${
          highlighted 
            ? 'btn-primary' 
            : 'rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
        }`}
      >
        Elegir plan
      </button>
    </div>
  );
}

/** Sección de precios. */
function Pricing({ onChoose }: { onChoose: (id: PlanId) => void }) {
  return (
    <section id="precios" className="scroll-mt-24 bg-slate-50 py-20 sm:py-28 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow dark:border-brand-800 dark:bg-slate-900 dark:text-brand-300">
            <Sparkles className="h-4 w-4" />
            Planes y precios
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Elegí el plan que se ajusta a tu operación
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onChoose={onChoose} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Sección FAQ. */
function FAQ() {
  const faqs = [
    {
      q: '¿Cómo contrató un plan?',
      a: 'Elegís el plan que se ajusta a tu operación, completás tus datos en el checkout y confirmás el pago. Te enviamos un código de acceso por email para activar tu cuenta en minutos.',
    },
    {
      q: '¿Cuánto tarda la activación?',
      a: 'La activación es inmediata. Una vez confirmado el pago recibís tu código por email y podés descargar la app y empezar a usar ATLAS al instante.',
    },
    {
      q: '¿Puedo cambiar de plan después?',
      a: 'Sí, podés subir o bajar de plan en cualquier momento desde tu cuenta. Los cambios se aplican en el siguiente ciclo de facturación, sin penalidades ni permanencia.',
    },
    {
      q: '¿ATLAS funciona para varias sucursales?',
      a: 'Sí. El plan Pro incluye hasta 5 sucursales y el plan Empresarial sucursales ilimitadas, con reportes consolidados y control centralizado desde un solo panel.',
    },
  ];

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-28 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="section-eyebrow dark:border-brand-800 dark:bg-slate-900 dark:text-brand-300">
            <Sparkles className="h-4 w-4" />
            Preguntas frecuentes
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Resolvé tus dudas
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-slate-900 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-800/60">
                {item.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 group-open:rotate-45 dark:bg-slate-800 dark:text-brand-300">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  const { setPurchase } = usePurchase();
  const navigate = useNavigate();

  const handleChoose = (id: PlanId) => {
    setPurchase({ planId: id });
    navigate('/checkout');
  };

  return (
    <>
      <Hero />
      <WhatIsAtlas />
      <Pricing onChoose={handleChoose} />
      <FAQ />
    </>
  );
}