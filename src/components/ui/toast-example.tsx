import React from 'react';
import { useToast } from './toast';
export const ToastExample: React.FC = () => {
  const { addToast } = useToast();

  const showSuccessToast = () => {
    addToast({
      type: 'success',
      title: '¡Éxito!',
      message: 'La operación se completó correctamente'
    });
  };

  const showErrorToast = () => {
    addToast({
      type: 'error',
      title: 'Error',
      message: 'Algo salió mal. Por favor, inténtalo de nuevo.'
    });
  };

  const showWarningToast = () => {
    addToast({
      type: 'warning',
      title: 'Advertencia',
      message: 'Ten cuidado con esta acción'
    });
  };

  const showInfoToast = () => {
    addToast({
      type: 'info',
      title: 'Información',
      message: 'Aquí tienes información importante'
    });
  };

  const showLongToast = () => {
    addToast({
      type: 'success',
      title: 'Toast de larga duración',
      message: 'Este toast durará 10 segundos',
      duration: 10000
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Ejemplos de Toast</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={showSuccessToast}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Success Toast
        </button>
        <button
          onClick={showErrorToast}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Error Toast
        </button>
        <button
          onClick={showWarningToast}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Warning Toast
        </button>
        <button
          onClick={showInfoToast}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Info Toast
        </button>
        <button
          onClick={showLongToast}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Long Duration Toast
        </button>
      </div>
    </div>
  );
}; 