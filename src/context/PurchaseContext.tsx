import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PlanId } from '@/data/plans';

/**
 * Estado de "compra" compartido entre páginas usando Context de React.
 * Lo usamos para pasar el plan elegido y los datos del comprador
 * desde el checkout hasta la confirmación, y guardar el código de
 * activación en localStorage para la página /activar.
 *
 * No es persistencia real de backend — solo estado en memoria + localStorage
 * para la demo de la landing de ventas.
 */

interface PurchaseState {
  planId: PlanId | null;
  name: string;
  email: string;
  code: string;
  companyName: string;
  phone: string;
}

interface PurchaseContextValue extends PurchaseState {
  setPurchase: (data: Partial<PurchaseState>) => void;
  reset: () => void;
}

const PurchaseContext = createContext<PurchaseContextValue | undefined>(undefined);

const STORAGE_KEY = 'atlas_purchase';

function loadFromStorage(): Partial<PurchaseState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PurchaseState) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data: PurchaseState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* no-op */
  }
}

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const initial = loadFromStorage();
  const [state, setState] = useState<PurchaseState>({
    planId: initial.planId ?? null,
    name: initial.name ?? '',
    email: initial.email ?? '',
    code: initial.code ?? '',
    companyName: initial.companyName ?? '',
    phone: initial.phone ?? '',
  });

  const setPurchase = (data: Partial<PurchaseState>) => {
    setState((prev) => {
      const next = { ...prev, ...data };
      saveToStorage(next);
      return next;
    });
  };

  const reset = () => {
    setState({ planId: null, name: '', email: '', code: '', companyName: '', phone: '' });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* no-op */
    }
  };

  return (
    <PurchaseContext.Provider value={{ ...state, setPurchase, reset }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchase() {
  const ctx = useContext(PurchaseContext);
  if (!ctx) throw new Error('usePurchase debe usarse dentro de <PurchaseProvider>');
  return ctx;
}
