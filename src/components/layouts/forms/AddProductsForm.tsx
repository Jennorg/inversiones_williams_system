import React, { useState, useEffect } from 'react';
import { type Sede, getSedes } from '@/api/product';
import { cn } from '@/lib/utils';

// Estructura de datos del formulario
interface FormDataCollected {
  name: string;
  sku: string;
  price: number;
  description?: string | null;
  category?: string | null;
  sedeId: number;
  initialStockAtSede: number;
}

// Props del componente
interface AddProductFormProps {
  onSave: (productData: FormDataCollected) => void;
  onCancel: () => void;
  isLoading?: boolean;
  editingProduct?: {
    id: number;
    name: string;
    sku: string;
    price: number;
    description?: string | null;
    category?: string | null;
  } | null;
}

// Formulario para crear/editar productos
const AddProductForm: React.FC<AddProductFormProps> = ({ onSave, onCancel, isLoading = false, editingProduct = null }) => {
  // Estados del formulario
  const [productName, setProductName] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [selectedSedeId, setSelectedSedeId] = useState<number | undefined>(undefined);
  const [initialStock, setInitialStock] = useState<number>(0);
  
  // Estados para manejar sedes
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [sedesLoading, setSedesLoading] = useState<boolean>(true);
  const [sedesError, setSedesError] = useState<string | null>(null);

  // Cargar sedes disponibles
  useEffect(() => {
    const fetchSedes = async () => {
      try {
        setSedesLoading(true);
        const fetchedSedes = await getSedes();
        setSedes(fetchedSedes);
        if (fetchedSedes.length > 0) {
          setSelectedSedeId(fetchedSedes[0].id);
        }
      } catch (err: any) {
        console.error("Failed to fetch sedes:", err);
        setSedesError(err.message || "No se pudieron cargar las sedes.");
      } finally {
        setSedesLoading(false);
      }
    };
    fetchSedes();
  }, []);

  // Cargar datos del producto si se está editando
  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.name);
      setSku(editingProduct.sku);
      setPrice(editingProduct.price);
      setDescription(editingProduct.description || '');
      setCategory(editingProduct.category || '');
    } else {
      // Limpiar formulario para nuevo producto
      setProductName('');
      setSku('');
      setPrice(0);
      setDescription('');
      setCategory('');
    }
  }, [editingProduct]);

  // Manejar envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData: FormDataCollected = {
      name: productName,
      sku: sku,
      price: price,
      description: description || null,
      category: category || null,
      sedeId: selectedSedeId || 1,
      initialStockAtSede: initialStock,
    };

    onSave(formData);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-slate-200">
      {/* Encabezado del formulario */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
        </h2>
        <p className="mt-2 text-slate-600">
          {editingProduct ? 'Actualiza la información del producto' : 'Completa la información del nuevo producto'}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Campo: Nombre del producto */}
        <div>
          <label htmlFor="productName" className="mb-2 block text-sm font-semibold text-slate-700">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="productName"
            className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
            placeholder="Ingresa el nombre del producto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* Campo: SKU */}
        <div>
          <label htmlFor="sku" className="mb-2 block text-sm font-semibold text-slate-700">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
            placeholder="Ingresa el código SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
        </div>

        {/* Campo: Categoría */}
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-700">
            Categoría
          </label>
          <select
            id="category"
            className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Electronics">Electrónicos</option>
            <option value="Clothing">Ropa</option>
            <option value="Books">Libros</option>
            <option value="Home & Kitchen">Hogar y Cocina</option>
          </select>
        </div>

        {/* Campo: Precio */}
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-semibold text-slate-700">
            Precio
          </label>
          <input
            type="number"
            id="price"
            className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
            placeholder="Ingresa el precio"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Campo: Descripción */}
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">
            Descripción
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
            placeholder="Ingresa la descripción del producto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Campos: Sede y Stock inicial */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="initialSede" className="mb-2 block text-sm font-semibold text-slate-700">
              Sede Inicial
            </label>
            {sedesLoading ? (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-500"></div>
                <span className="text-sm">Cargando sedes...</span>
              </div>
            ) : sedesError ? (
              <p className="text-sm text-red-500">{sedesError}</p>
            ) : (
              <select
                id="initialSede"
                className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
                value={selectedSedeId || ''}
                onChange={(e) => setSelectedSedeId(Number(e.target.value))}
                required
              >
                {sedes.length === 0 && <option value="">No hay sedes disponibles</option>}
                {sedes.map((sede) => (
                  <option key={sede.id} value={sede.id}>
                    {sede.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label htmlFor="initialStock" className="mb-2 block text-sm font-semibold text-slate-700">
              Stock Inicial
            </label>
            <input
              type="number"
              id="initialStock"
              className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
              placeholder="Ingresa el stock inicial"
              value={initialStock}
              onChange={(e) => setInitialStock(Number(e.target.value))}
              required
              min="0"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={cn(
              "rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200",
              "hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
              isLoading && "cursor-not-allowed opacity-60"
            )}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading || sedesLoading || sedes.length === 0}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200",
              "hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
              (isLoading || sedesLoading || sedes.length === 0) && "cursor-not-allowed opacity-60"
            )}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Guardando...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {editingProduct ? 'Actualizar Producto' : 'Guardar Producto'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;