import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { PurchaseProvider } from '@/context/PurchaseContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Landing from '@/pages/Landing';
import Checkout from '@/pages/Checkout';
import Confirmation from '@/pages/Confirmation';
import Activation from '@/pages/Activation';
import DashboardPanel from "@/pages/DashboardPanel";
import ProtectedRoute from '@/components/ProtectedRoute';

/** Scroll al top en cada cambio de ruta, y soporte para hashes (#precios, etc.). */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

/**
 * App principal de la landing de ventas de ATLAS.
 */
export default function App() {
  return (
    <PurchaseProvider>
      <BrowserRouter>
        <ScrollManager />
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Landing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmacion" element={<Confirmation />} />
              <Route path="/activar" element={<Activation />} />

              {/* Rutas Protegidas / Panel de Control Web */}
              <Route element={<ProtectedRoute />}>
                <Route path="/panel" element={<DashboardPanel />} />
              </Route>

              <Route path="*" element={<Landing />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PurchaseProvider>
  );
}