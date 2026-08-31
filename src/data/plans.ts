// Datos compartidos de los planes de ATLAS.
// Estos datos se usan tanto en la landing (sección precios) como en el checkout.

export type PlanId = 'basico' | 'pro' | 'empresarial';

export interface Plan {
  id: PlanId;
  name: string;
  /** Precio mensual en pesos (mostrado como string con formato) */
  price: string;
  /** Descripción corta del plan */
  tagline: string;
  /** Lista de características incluidas */
  features: string[];
  /** Si es el plan destacado (Pro) */
  highlighted?: boolean;
  /** Pequeño badge opcional sobre la tarjeta */
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    id: 'basico',
    name: 'Básico',
    price: '$49.000',
    tagline: 'Para empresas pequeñas que necesitan control básico.',
    features: [
      'Hasta 5 servicios activos',
      'Seguimiento de operarios en tiempo real',
      'Reporte semanal de cumplimiento',
      'Soporte por email',
      '1 sucursal',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99.000',
    tagline: 'El más elegido. Control total para empresas en crecimiento.',
    highlighted: true,
    badge: 'Más elegido',
    features: [
      'Hasta 25 servicios activos',
      'Seguimiento y auditoría completa',
      'Reportes diarios + dashboard en vivo',
      'Alertas de incidencias',
      'Hasta 5 sucursales',
      'Soporte prioritario 24/7',
    ],
  },
  {
    id: 'empresarial',
    name: 'Empresarial',
    price: 'Consultar',
    tagline: 'Para grandes operaciones con múltiples sucursales.',
    features: [
      'Servicios ilimitados',
      'Auditoría avanzada con KPIs personalizados',
      'Reportes consolidados multi-sucursal',
      'Gestor de cuenta dedicado',
      'Sucursales ilimitadas',
      'Integraciones a medida (API)',
      'SLA garantizado por contrato',
    ],
  },
];

/** Devuelve un plan por su id, o undefined si no existe. */
export function getPlanById(id: PlanId): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
