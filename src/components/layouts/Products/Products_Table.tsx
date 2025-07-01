import React, { useEffect, useState } from 'react';
import { getProducts, updateProduct, deleteProduct, type Product } from '@/api/product';
import { productColumns } from './columns';
import { useToast } from '@/components/ui/toast';
import { useModal } from '@/components/ui/modal';

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';

import AddProductForm from '@/components/layouts/forms/AddProductsForm';

// Componente principal para gestionar la tabla de productos
const ProductTable: React.FC = () => {
  const { addToast } = useToast();
  const { showModal } = useModal();
  
  // Estados para manejar productos y UI
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [isSavingProduct, setIsSavingProduct] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Cargar productos desde la API
  const fetchProductsData = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch products:", err);
      setError(err.message || "No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  // Manejadores de eventos
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleAddProduct = () => {
    setShowAddForm(true);
  };

  // Guardar producto (crear o actualizar)
  const handleSaveNewProduct = async (formData: {
    name: string;
    sku: string;
    price: number;
    description?: string | null;
    category?: string | null;
    sedeId: number;
    initialStockAtSede: number;
  }) => {
    try {
      setIsSavingProduct(true);

      if (editingProduct) {
        // Actualizar producto existente
        const updatePayload = {
          name: formData.name,
          sku: formData.sku,
          price: formData.price,
          description: formData.description,
          category: formData.category,
        };
        await updateProduct(editingProduct.id, updatePayload);
        addToast({
          type: 'success',
          title: 'Producto actualizado',
          message: 'El producto ha sido actualizado exitosamente'
        });
      } else {
        addToast({
          type: 'success',
          title: 'Producto agregado',
          message: 'El producto ha sido agregado exitosamente'
        });
      }

      setShowAddForm(false);
      setEditingProduct(null);
      await fetchProductsData();
    } catch (err: any) {
      console.error("Error al guardar el producto:", err);
      setError(err.response?.data?.message || err.message || "Error desconocido al guardar el producto.");
      console.log(err.response)
      addToast({
        type: 'error',
        title: 'Error al guardar',
        message: err.response?.data?.message || err.message || 'Error desconocido al guardar el producto'
      });
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleCancelAddProduct = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  // Iniciar edición de producto
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  // Eliminar producto con confirmación
  const handleDeleteProduct = async (id: number) => {
    const confirmed = await showModal({
      type: 'warning',
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      confirmVariant: 'destructive'
    });

    if (confirmed) {
      try {
        await deleteProduct(id);
        await fetchProductsData();
        addToast({
          type: 'success',
          title: 'Producto eliminado',
          message: 'El producto ha sido eliminado exitosamente'
        });
      } catch (err: any) {
        console.error("Error al eliminar el producto:", err);
        addToast({
          type: 'error',
          title: 'Error al eliminar',
          message: err.response?.data?.message || err.message || 'Error desconocido al eliminar el producto'
        });
      }
    }
  };

  // Estados de carga y error
  if (loading) return <p className="text-center text-gray-500 mt-10">Cargando productos...</p>;
  if (error && !showAddForm) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Encabezado con título y botón de agregar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">Listado de Productos</h1>
            <p className="mt-2 text-slate-600">Gestiona tu inventario de productos</p>
          </div>
          <button
            onClick={handleAddProduct}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600",
              "px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200",
              "hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
              "active:scale-95"
            )}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar Producto
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar productos por nombre o SKU..."
              value={filterText}
              onChange={handleFilterChange}
              className="w-full rounded-xl border-0 bg-white px-4 py-3 pl-10 text-slate-700 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
            />
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="mb-4 rounded-full bg-slate-100 p-4">
                <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-700">No hay productos</h3>
              <p className="text-center text-slate-500">Agrega algunos productos para comenzar a gestionar tu inventario</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-200 bg-slate-50">
                    {productColumns.map((column) => (
                      <TableHead key={column.accessorKey as string} className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        {column.header}
                      </TableHead>
                    ))}
                    <TableHead className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => {

                    const productWithDefaults = {
                      ...product,
                      price: (product as any).price ?? 0,
                      stock: (product as any).stock ?? 0,
                    };
                    return (
                      <TableRow 
                        key={product.id} 
                        className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                        }`}
                      >
                        {productColumns.map((column) => {
                          const cellValue = productWithDefaults[column.accessorKey as keyof typeof productWithDefaults];
                          return (
                            <TableCell key={`${product.id}-${column.accessorKey as string}`} className="px-6 py-4 text-sm text-slate-700">
                              {column.cell ? column.cell({ value: cellValue, row: productWithDefaults }) : String(cellValue)}
                            </TableCell>
                          );
                        })}
                        <TableCell className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:from-red-600 hover:to-red-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Eliminar
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl animate-in fade-in-0 zoom-in-95 duration-200">
            <AddProductForm
              onSave={handleSaveNewProduct}
              onCancel={handleCancelAddProduct}
              isLoading={isSavingProduct}
              editingProduct={editingProduct}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;