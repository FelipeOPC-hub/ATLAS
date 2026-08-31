import { Link } from 'react-router-dom';
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
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white pt-28 pb-20 sm:pt-36">
      {/* Fondos decorativos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -right-24 top-32 h-80 w-80 rounded-full bg-accent-200/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.25) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* Columna texto */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-accent-500" />
            Nueva plataforma 2026 · Disponible ahora
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            ATLAS
          </h1>
          <p className="mt-4 text-xl font-semibold text-brand-700 sm:text-2xl">
            Servicios de limpieza, bajo control.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            La plataforma que une a empresas con servicios de limpieza
            profesionales. Contratá, controlá y auditá cada servicio con
            seguimiento en tiempo real y reportes auditables.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#precios" className="btn-primary text-base">
              Ver planes
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#que-es" className="btn-outline text-base">
              Conocer más
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          {/* Métricas de confianza */}
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {[
              { value: '+200', label: 'Empresas activas' },
              { value: '+1.500', label: 'Servicios auditados / mes' },
              { value: '99,2%', label: 'Cumplimiento promedio' },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-500 sm:text-sm">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna visual */}
        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-brand-900/10">
              <img
                src="https://images.pexels.com/photos/6195104/pexels-photo-6195104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Profesional de limpieza realizando servicio en edificio corporativo"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                loading="eager"
              />
            </div>

            {/* Card flotante: dashboard en vivo */}
            <div className="absolute -left-4 bottom-16 w-56 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-brand-900/10 animate-float sm:-left-8 lg:-left-12">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent-100 text-accent-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Servicio activo</p>
                  <p className="text-[11px] text-slate-400">Sucursal CABA</p>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent-400 to-accent-500" />
              </div>
              <p className="mt-2 text-[11px] font-medium text-slate-500">80% completado</p>
            </div>

            {/* Card flotante: auditoría */}
            <div className="absolute -right-4 top-12 w-48 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-brand-900/10 animate-float [animation-delay:1.5s] sm:-right-6 lg:-right-10">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-100 text-brand-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-slate-900">Auditoría</p>
              </div>
              <div className="mt-3 flex items-end gap-1.5">
                {[40, 65, 50, 80, 72, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-brand-200"
                    style={{ height: `${h / 3}px` }}
                  />
                ))}
              </div>
              <p className="mt-2 text-[11px] font-medium text-slate-500">Reporte semanal</p>
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
      color: 'bg-brand-100 text-brand-700',
    },
    {
      icon: Clock,
      title: 'Control en tiempo real',
      text: 'Seguimiento de cada servicio en vivo: horarios, operarios asignados e incidencias, todo desde un panel central.',
      color: 'bg-accent-100 text-accent-700',
    },
    {
      icon: ClipboardCheck,
      title: 'Auditoría',
      text: 'Reportes auditables con fotos, checklist de cumplimiento y KPIs por sucursal. Transparencia total, sin sorpresas.',
      color: 'bg-brand-100 text-brand-700',
    },
    {
      icon: ShieldCheck,
      title: 'Confianza',
      text: 'Cada servicio queda registrado y verificable. Cumplimiento garantizado con evidencia, no con promesas.',
      color: 'bg-accent-100 text-accent-700',
    },
  ];

  return (
    <section id="que-es" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            Qué es ATLAS
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Una plataforma, control total de tus servicios
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            ATLAS es la plataforma que digitaliza la contratación, el control y la
            auditoría de los servicios de limpieza para empresas. Dejás de
            depender de planillas y llamados: todo queda registrado, medible y
            auditable en un solo lugar.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="group card p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`grid h-12 w-12 place-items-center rounded-xl ${p.color}`}>
                <p.icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
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
      className={`relative flex flex-col rounded-3xl border p-7 transition-all hover:-translate-y-1 hover:shadow-2xl ${
        highlighted
          ? 'border-brand-300 bg-gradient-to-b from-brand-50/80 to-white shadow-xl shadow-brand-900/10 ring-2 ring-brand-500/40 lg:-mt-4 lg:mb-4'
          : 'border-slate-200 bg-white shadow-sm hover:shadow-lg hover:shadow-brand-900/5'
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-600/30">
            <Star className="h-3.5 w-3.5 fill-current" />
            {plan.badge}
          </span>
        </div>
      )}

      <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
      <p className="mt-1.5 min-h-[40px] text-sm leading-snug text-slate-500">
        {plan.tagline}
      </p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className={`text-4xl font-extrabold tracking-tight ${highlighted ? 'text-brand-700' : 'text-slate-900'}`}>
          {plan.price}
        </span>
        {plan.price !== 'Consultar' && (
          <span className="text-sm font-medium text-slate-400">/mes</span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <CheckCircle2
              className={`mt-0.5 h-5 w-5 shrink-0 ${highlighted ? 'text-accent-500' : 'text-brand-500'}`}
            />
            <span className="text-slate-600">{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onChoose(plan.id)}
        className={`mt-7 w-full ${
          highlighted ? 'btn-primary' : 'btn-outline'
        }`}
      >
        Elegir plan
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Sección de precios con los 3 planes. */
function Pricing({ onChoose }: { onChoose: (id: PlanId) => void }) {
  return (
    <section id="precios" className="scroll-mt-24 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            Planes y precios
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Elegí el plan que se ajusta a tu operación
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Precios claros, sin sorpresas. Cambiás de plan cuando quieras y
            activás tu acceso en minutos.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onChoose={onChoose} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Todos los planes incluyen alta inmediata · Facturación mensual · Sin permanencia
        </p>
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
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            Preguntas frecuentes
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Resolvé tus dudas
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group card overflow-hidden p-0 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50/60">
                {item.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-transform group-open:rotate-45">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <div className="px-6 pb-5 -mt-1 text-sm leading-relaxed text-slate-600">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Página principal: Landing. */
export default function Landing() {
  const { setPurchase } = usePurchase();

  const handleChoose = (id: PlanId) => {
    setPurchase({ planId: id });
    window.location.href = '/checkout';
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
