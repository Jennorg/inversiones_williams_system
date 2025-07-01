# Sistema de Inversiones Williams

Sistema de gestión de inventario y productos desarrollado con React, TypeScript y Tailwind CSS.

## 🚀 Características

- **Gestión de Productos**: CRUD completo para productos con información detallada
- **Gestión de Clientes**: Sistema de clientes con datos personales y de contacto
- **Gestión de Sedes**: Control de ubicaciones y stock por sede
- **Interfaz Moderna**: UI responsive con diseño moderno y accesible
- **Notificaciones**: Sistema de toasts para feedback del usuario
- **Modales**: Confirmaciones y alertas interactivas
- **Búsqueda**: Filtrado en tiempo real de productos
- **Validación**: Validación de formularios y datos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Estilos**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **UI Components**: Componentes personalizados
- **State Management**: React Hooks
- **Routing**: React Router (preparado para implementación)

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Jennorg/inversiones_williams_system
cd inversiones_williams_system
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```
Editar `.env` con la URL de tu API:
```env
VITE_API_BASE_URL=http://localhost:4000/api
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
```

## 🏗️ Estructura del Proyecto

```
src/
├── api/                    # Servicios de API
│   ├── customer.ts        # Gestión de clientes
│   ├── product.ts         # Gestión de productos
│   └── index.ts           # Exportaciones de API
├── components/            # Componentes React
│   ├── layouts/          # Componentes de layout
│   │   ├── Aside/        # Barra lateral
│   │   ├── Header/       # Encabezado
│   │   ├── Products/     # Gestión de productos
│   │   └── forms/        # Formularios
│   └── ui/               # Componentes de UI
│       ├── toast.ts      # Sistema de notificaciones
│       ├── modal.ts      # Sistema de modales
│       ├── table.ts      # Componente de tabla
│       └── sidebar.ts    # Barra lateral
├── hooks/                # Custom hooks
│   └── use-mobile.ts     # Detección de dispositivos móviles
├── lib/                  # Utilidades
│   └── utils.ts          # Funciones utilitarias
├── assets/               # Recursos estáticos
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🎯 Funcionalidades Principales

### Gestión de Productos
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos con confirmación
- ✅ Búsqueda y filtrado
- ✅ Gestión de stock por sede
- ✅ Categorización de productos

### Sistema de Sedes
- ✅ Gestión de ubicaciones
- ✅ Control de stock por sede
- ✅ Asociación producto-sede

### Interfaz de Usuario
- ✅ Diseño responsive
- ✅ Sidebar colapsible
- ✅ Notificaciones toast
- ✅ Modales de confirmación
- ✅ Formularios validados

## 🔧 Configuración de Desarrollo

### Requisitos Previos
- Node.js 18+ 
- npm o yarn
- Backend API funcionando

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
```

### Variables de Entorno

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:4000/api

## 🎨 Componentes de UI

### Toast System
Sistema de notificaciones con diferentes tipos:
- Success (Éxito)
- Error (Error)
- Warning (Advertencia)
- Info (Información)

```typescript
import { useToast } from '@/components/ui/toast';

const { addToast } = useToast();

addToast({
  type: 'success',
  title: 'Éxito',
  message: 'Operación completada'
});
```

### Modal System
Sistema de modales para confirmaciones:
- Confirm (Confirmación)
- Warning (Advertencia)
- Error (Error)
- Info (Información)

```typescript
import { useModal } from '@/components/ui/modal';

const { showModal } = useModal();

const confirmed = await showModal({
  type: 'warning',
  title: 'Confirmar',
  message: '¿Estás seguro?'
});
```

## 📱 Responsive Design

El sistema está optimizado para:
- **Desktop**: Layout completo con sidebar
- **Tablet**: Sidebar colapsible
- **Mobile**: Sidebar como overlay

## 🔒 Seguridad

- Validación de formularios en frontend
- Sanitización de datos
- Manejo seguro de errores
- Configuración de CORS en backend
