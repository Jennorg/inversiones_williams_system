import React from 'react';

// Estructura de datos del producto para la tabla
interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock?: number;
  description: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string | null;
}

// Interfaz genérica para definir columnas de tabla
interface TableColumn<T> {
  header: string;
  accessorKey: keyof T;
  cell?: <K extends keyof T>(props: { value: T[K]; row: T }) => React.ReactNode;
}

// Configuración de columnas para la tabla de productos
export const productColumns: TableColumn<Product>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Nombre',
    accessorKey: 'name',
  },
  {
    header: 'SKU',
    accessorKey: 'sku',
  },
  {
    header: 'Precio',
    accessorKey: 'price',
    // Formatear precio con símbolo de moneda
    cell: ({ value }) => (
      <span className="font-semibold text-emerald-600">
        ${(value as number).toFixed(2)}
      </span>
    ),
  },
  {
    header: 'Stock',
    accessorKey: 'stock',
    // Mostrar stock con colores según disponibilidad
    cell: ({ value }) => (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        (value as number) > 10 ? 'bg-green-100 text-green-800' : 
        (value as number) > 0 ? 'bg-yellow-100 text-yellow-800' : 
        'bg-red-100 text-red-800'
      }`}>
        {value as number}
      </span>
    ),
  },
  {
    header: 'Categoría',
    accessorKey: 'category',
    // Mostrar categoría con badge, o "Sin categoría" si está vacía
    cell: ({ value }) => (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
        {value as string || 'Sin categoría'}
      </span>
    ),
  },
  {
    header: 'Fecha Creación',
    accessorKey: 'createdAt',
    // Formatear fecha en formato español
    cell: ({ value }) => (
      <span className="text-slate-600">
        {new Date(value as string).toLocaleDateString('es-VE', { 
          year: 'numeric', 
          month: 'short', 
          day: '2-digit' 
        })}
      </span>
    ),
  },
];