import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // Verificamos si existe una sesión activa en el navegador
  const isAuthenticated = localStorage.getItem('atlas_auth') === 'true';

  // Si no está autenticado, lo mandamos a la pantalla para ingresar el código
  if (!isAuthenticated) {
    return <Navigate to="/activar" replace />;
  }

  // Si está autenticado, renderiza la ruta protegida (el panel)
  return <Outlet />;
}