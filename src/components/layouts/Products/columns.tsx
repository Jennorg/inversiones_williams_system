import React from 'react';
interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock?: number; // Opcional ya que puede no estar presente
  description: string | null;
  category: string | null;
  createdAt: string; // Asumimos string ISO
  updatedAt: string | null; // Asumimos string ISO
}

// interface ProductWithActions extends Product {
//   onEdit?: (product: Product) => void;
//   onDelete?: (id: number) => void;
// }

// Define una interfaz genérica para una columna de tabla
// T es el tipo de los datos de cada fila (en este caso, 'Product')
interface TableColumn<T> {
  header: string;
  // accessorKey es una clave válida de T
  accessorKey: keyof T;
  // La función 'cell' recibe un objeto con 'value' cuyo tipo es T[K]
  // donde K es el tipo de accessorKey
  cell?: <K extends keyof T>(props: { value: T[K]; row: T }) => React.ReactNode;
}

// Define la estructura de tus columnas usando la interfaz TableColumn
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
    cell: ({ value }) => (
      <span className="font-semibold text-emerald-600">
        ${(value as number).toFixed(2)}
      </span>
    ),
  },
  {
    header: 'Stock',
    accessorKey: 'stock',
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
    cell: ({ value }) => (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
        {value as string || 'Sin categoría'}
      </span>
    ),
  },
  {
    header: 'Fecha Creación',
    accessorKey: 'createdAt',
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