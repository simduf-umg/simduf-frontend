// src/components/common/LoadingScreen.tsx
import React from 'react';
import GridShape from './GridShape';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
      <div className="relative flex flex-col items-center justify-center w-full h-screen">
        {/* Fondo con grid */}
        <div className="absolute inset-0 z-0">
          <GridShape />
        </div>

        {/* Contenido central */}
        <div className="relative z-10 flex flex-col items-center space-y-6">
          {/* Logo SIMDUF */}
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white/90">
            SIMDUF
          </h2>

          {/* Spinner */}
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-brand-500 dark:border-gray-600 dark:border-t-brand-400"></div>

          {/* Texto descriptivo */}
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sistema Inteligente para el Monitoreo de la
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Distribución y Utilización de Fármacos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;