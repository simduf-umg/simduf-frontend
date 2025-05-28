// src/pages/Dashboard/Empleados.tsx
import { useState, useEffect } from 'react';
import { Persona } from '../types/persona';
import EmpleadosTable from '../components/empleados/EmpleadosTable';
import LoadingScreen from '../components/common/LoadingScreen';
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function Empleados() {
  const [empleados, setEmpleados] = useState<Persona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('https://simduf-backend.up.railway.app/personas', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los empleados');
        }

        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        setError('Error al cargar los empleados');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <PageMeta 
        title="SIMDUF | Empleados" 
        description="Gestión de empleados del Sistema SIMDUF" 
      />
      <PageBreadcrumb pageTitle="Empleados" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {error ? (
          <div className="p-4 mb-4 text-sm text-red-500 bg-red-100 rounded-lg dark:bg-red-900/20">
            {error}
          </div>
        ) : (
          <EmpleadosTable empleados={empleados} />
        )}
      </div>
    </>
  );
}