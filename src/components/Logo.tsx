import { ShieldCheck } from 'lucide-react';

/** Logo de ATLAS: ícono de escudo + nombre de marca. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/30">
        <ShieldCheck className="h-5 w-5" strokeWidth={2.5} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent-400 ring-2 ring-white" />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        ATLAS
      </span>
    </div>
  );
}
