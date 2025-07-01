import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ModalType = 'confirm' | 'warning' | 'info' | 'error';

export interface ModalConfig {
  id: string;
  type: ModalType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  showCancel?: boolean;
  confirmVariant?: 'default' | 'destructive';
}

interface ModalContextType {
  modals: ModalConfig[];
  showModal: (config: Omit<ModalConfig, 'id'>) => Promise<boolean>;
  closeModal: (id: string) => void;
  clearModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

const ModalItem: React.FC<{ modal: ModalConfig; onClose: (id: string) => void }> = ({ modal, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(modal.id), 300);
  };

  const handleConfirm = async () => {
    if (modal.onConfirm) {
      setIsLoading(true);
      try {
        await modal.onConfirm();
      } finally {
        setIsLoading(false);
      }
    }
    handleClose();
  };

  const handleCancel = () => {
    if (modal.onCancel) {
      modal.onCancel();
    }
    handleClose();
  };

  const getIcon = () => {
    switch (modal.type) {
      case 'confirm':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getModalStyles = () => {
    switch (modal.type) {
      case 'confirm':
        return 'border-blue-200';
      case 'warning':
        return 'border-yellow-200';
      case 'error':
        return 'border-red-200';
      case 'info':
        return 'border-blue-200';
    }
  };

  const getConfirmButtonStyles = () => {
    if (modal.confirmVariant === 'destructive') {
      return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
    }
    
    switch (modal.type) {
      case 'confirm':
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
      case 'error':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />
      
      <div
        className={cn(
          "relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300",
          getModalStyles(),
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {getIcon()}
        
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {modal.title}
          </h3>
          <p className="text-sm text-slate-600">
            {modal.message}
          </p>
        </div>
        
        <div className="mt-6 flex gap-3">
          {modal.showCancel !== false && (
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {modal.cancelText || 'Cancelar'}
            </button>
          )}
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={cn(
              "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
              getConfirmButtonStyles()
            )}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Procesando...
              </div>
            ) : (
              modal.confirmText || 'Confirmar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalContainer: React.FC = () => {
  const { modals, closeModal } = useModal();

  return (
    <>
      {modals.map((modal) => (
        <ModalItem key={modal.id} modal={modal} onClose={closeModal} />
      ))}
    </>
  );
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  const showModal = useCallback((config: Omit<ModalConfig, 'id'>): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newModal: ModalConfig = {
        id,
        showCancel: true,
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        ...config,
      };
      
      setModals((prev) => [...prev, newModal]);
      
      const handleConfirm = () => {
        resolve(true);
        setModals((prev) => prev.filter((modal) => modal.id !== id));
      };
      
      const handleCancel = () => {
        resolve(false);
        setModals((prev) => prev.filter((modal) => modal.id !== id));
      };
      
      setModals((prev) => 
        prev.map((modal) => 
          modal.id === id 
            ? { 
                ...modal, 
                onConfirm: async () => {
                  if (newModal.onConfirm) await newModal.onConfirm();
                  handleConfirm();
                },
                onCancel: () => {
                  if (newModal.onCancel) newModal.onCancel();
                  handleCancel();
                }
              }
            : modal
        )
      );
    });
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const clearModals = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider value={{ modals, showModal, closeModal, clearModals }}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
};

export const modal = {
  confirm: (title: string, message: string, options?: Partial<ModalConfig>) => {
    return { type: 'confirm' as const, title, message, ...options };
  },
  warning: (title: string, message: string, options?: Partial<ModalConfig>) => {
    return { type: 'warning' as const, title, message, ...options };
  },
  error: (title: string, message: string, options?: Partial<ModalConfig>) => {
    return { type: 'error' as const, title, message, ...options };
  },
  info: (title: string, message: string, options?: Partial<ModalConfig>) => {
    return { type: 'info' as const, title, message, ...options };
  },
}; 