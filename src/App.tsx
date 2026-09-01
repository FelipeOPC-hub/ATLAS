import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { PurchaseProvider } from '@/context/PurchaseContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Landing from '@/pages/Landing';
import Checkout from '@/pages/Checkout';
import Confirmation from '@/pages/Confirmation';
import Activation from '@/pages/Activation';

/** Scroll al top en cada cambio de ruta, y soporte para hashes (#precios, etc.). */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Si hay un hash, esperamos al render y hacemos scroll al elemento.
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
 *
 * Rutas (único alcance de este proyecto):
 *  - /            → Landing (Hero, Qué es, Precios, FAQ, Footer)
 *  - /checkout    → Resumen del plan + formulario + botón "Pagar" (mock)
 *  - /confirmacion→ Loader 2s + código ATLAS-XXXX-XXXX + webhook + mensaje
 *  - /activar     → Input de código + validación + botón de descarga APK
 */
export default function App() {
  return (
    <PurchaseProvider>
      <BrowserRouter>
        <ScrollManager />
        <div className="flex min-h-screen flex-col bg-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmacion" element={<Confirmation />} />
              <Route path="/activar" element={<Activation />} />
              <Route path="*" element={<Landing />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PurchaseProvider>
  );
}
