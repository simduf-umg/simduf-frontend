import { useAuth } from "../../context/AuthContext";
import PageMeta from "../../components/common/PageMeta";
import AdminMetrics from "../../components/dashboard/admin/AdminMetrics";
import UserMetrics from "../../components/dashboard/user/UserMetrics";
import MonthlySalesChart from "../../components/dashboard/MonthlySalesChart";
import StatisticsChart from "../../components/dashboard/StatisticsChart";
import RecentOrders from "../../components/dashboard/RecentOrders";

export default function Home() {
  const { hasRole, user } = useAuth();
  const fullName = user ? `${user.persona.nombre} ${user.persona.apellido}` : '';

  return (
    <>
      <PageMeta
        title="SIMDUF | Dashboard"
        description=""
      />
      
      {/* Sección de bienvenida */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
          ¡Bienvenido{fullName ? `, ${fullName}` : ''}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {hasRole("ADMIN") 
            ? "Accede a todas las funciones administrativas del sistema"
            : "Gestiona tus solicitudes y consulta tu calendario"
          }
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          {/* Métricas según el rol */}
          {hasRole("ADMIN") ? <AdminMetrics /> : <UserMetrics />}

          {/* Gráficos y tablas comunes */}
          <MonthlySalesChart />
          <RecentOrders />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>
      </div>
    </>
  );
}
