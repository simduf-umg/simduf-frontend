import React from "react";

export default function ResetPasswordMessage() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Restablecer Contraseña
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Para restablecer su contraseña, contáctese con el equipo de soporte.
            </p>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex flex-col space-y-4">
              <h2 className="text-sm font-medium text-gray-700 dark:text-white/90">
                Contacto de Soporte:
              </h2>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">simdufapp@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">(+502) 4198-9215</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/signin"
              className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Volver al inicio de sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 