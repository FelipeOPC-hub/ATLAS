import { ShieldCheck, LogOut, Users, Settings, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('atlas_auth');
    localStorage.removeItem('atlas_purchase');
    navigate('/activar', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      {/* Topbar del panel */}
      <header className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              ATLAS <span className="text-brand-600 dark:text-brand-400 font-medium text-sm">Panel B2B</span>
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 transition"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido principal del panel */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Panel de Control General
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Bienvenido al centro de operaciones y auditoría de servicios.
          </p>
        </div>

        {/* Tarjetas de métricas rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Operarios Activos</p>
              <Users className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">12</p>
          </div>

          <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Servicios en Curso</p>
              <Activity className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">4</p>
          </div>

          <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Configuración</p>
              <Settings className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mt-4 cursor-pointer hover:underline">
              Gestionar zonas y tarifas →
            </p>
          </div>
        </div>

        {/* Área de trabajo */}
        <div className="rounded-2xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center py-16">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Módulo operativo en desarrollo</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-md mx-auto">
            Desde acá vas a poder dar de alta operarios, revisar los check-ins con geolocalización y auditar las planillas.
          </p>
        </div>
      </main>
    </div>
  );
}