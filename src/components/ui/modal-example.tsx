import React from 'react';
import { useModal, modal } from './modal';
const ModalExample: React.FC = () => {
  const { showModal } = useModal();

  const handleConfirmModal = async () => {
    const confirmed = await showModal(
      modal.confirm(
        'Confirmar acción',
        '¿Estás seguro de que quieres realizar esta acción?',
        {
          confirmText: 'Sí, continuar',
          cancelText: 'Cancelar',
          confirmVariant: 'default'
        }
      )
    );

    if (confirmed) {
      console.log('Usuario confirmó la acción');
    } else {
      console.log('Usuario canceló la acción');
    }
  };

  const handleWarningModal = async () => {
    const confirmed = await showModal(
      modal.warning(
        'Advertencia',
        'Esta acción puede tener consecuencias importantes. ¿Deseas continuar?',
        {
          confirmText: 'Entiendo, continuar',
          cancelText: 'Mejor no',
          confirmVariant: 'default'
        }
      )
    );

    if (confirmed) {
      console.log('Usuario aceptó la advertencia');
    } else {
      console.log('Usuario rechazó la advertencia');
    }
  };

  const handleErrorModal = async () => {
    const confirmed = await showModal(
      modal.error(
        'Error crítico',
        'Se ha producido un error en el sistema. ¿Deseas intentar recuperar los datos?',
        {
          confirmText: 'Intentar recuperar',
          cancelText: 'Cerrar',
          confirmVariant: 'default'
        }
      )
    );

    if (confirmed) {
      console.log('Usuario quiere intentar recuperar');
    } else {
      console.log('Usuario cerró el modal');
    }
  };

  const handleInfoModal = async () => {
    const confirmed = await showModal(
      modal.info(
        'Información importante',
        'Tu cuenta ha sido actualizada exitosamente. Todos los cambios han sido guardados.',
        {
          confirmText: 'Entendido',
          showCancel: false
        }
      )
    );

    if (confirmed) {
      console.log('Usuario leyó la información');
    }
  };

  const handleDestructiveModal = async () => {
    const confirmed = await showModal(
      modal.confirm(
        'Eliminar elemento',
        'Esta acción no se puede deshacer. ¿Estás completamente seguro?',
        {
          confirmText: 'Sí, eliminar',
          cancelText: 'Cancelar',
          confirmVariant: 'destructive'
        }
      )
    );

    if (confirmed) {
      console.log('Usuario confirmó la eliminación');
    } else {
      console.log('Usuario canceló la eliminación');
    }
  };

  const handleCustomModal = async () => {
    const confirmed = await showModal({
      type: 'confirm',
      title: 'Acción personalizada',
      message: '¿Quieres ejecutar esta acción personalizada?',
      confirmText: 'Ejecutar',
      cancelText: 'No ejecutar',
      onConfirm: async () => {
        console.log('Ejecutando lógica personalizada...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Lógica personalizada completada');
      },
      onCancel: () => {
        console.log('Acción cancelada por el usuario');
      }
    });

    if (confirmed) {
      console.log('Modal confirmado después de la lógica personalizada');
    } else {
      console.log('Modal cancelado');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Ejemplos de Modales</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={handleConfirmModal}
          className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Confirmación</h3>
            <p className="text-sm text-slate-600">Modal básico de confirmación</p>
          </div>
        </button>

        <button
          onClick={handleWarningModal}
          className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-yellow-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Advertencia</h3>
            <p className="text-sm text-slate-600">Modal de advertencia</p>
          </div>
        </button>

        <button
          onClick={handleErrorModal}
          className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-red-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Error</h3>
            <p className="text-sm text-slate-600">Modal de error</p>
          </div>
        </button>

        <button
          onClick={handleInfoModal}
          className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Información</h3>
            <p className="text-sm text-slate-600">Modal informativo</p>
          </div>
        </button>

        <button
          onClick={handleDestructiveModal}
          className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-red-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Destructivo</h3>
            <p className="text-sm text-slate-600">Modal con acción destructiva</p>
          </div>
        </button>

        <button
          onClick={handleCustomModal}
          className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-emerald-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Personalizado</h3>
            <p className="text-sm text-slate-600">Modal con lógica personalizada</p>
          </div>
        </button>
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-xl">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Características del Sistema de Modales</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Tipos de modal: confirm, warning, error, info</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Botones personalizables (texto y variantes)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Animaciones suaves de entrada y salida</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>API basada en promesas para manejo asíncrono</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Lógica personalizada con onConfirm y onCancel</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Estados de carga con spinner</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Backdrop con blur y click para cerrar</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalExample; 