import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interfaces actualizadas basadas en tu esquema Drizzle para Products ---
export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string | null;
  price: number; // CAMBIADO: 'unit_price' a 'price' para coincidir con el backend
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
}

// Interfaz para el payload de creación de un producto (ajustada para el backend)
export interface CreateProductPayload {
  name: string;
  sku: string;
  price: number; // CAMBIADO: 'unit_price' a 'price' para coincidir con el backend
  description?: string | null;
  category?: string | null;
  sedeId: number; // Agregado para coincidir con el backend
  initialStockAtSede: number; // Agregado para coincidir con el backend
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}

// --- NUEVA INTERFAZ Y FUNCIÓN PARA SEDE_PRODUCT_ASSOCIATIONS ---
// Puedes tener una interfaz para una Sede si la necesitas
export interface Sede {
  id: number;
  name: string;
  address: string;
}

export interface CreateSedeProductAssociationPayload {
  sede_id: number;
  product_id: number;
  stock_at_sede: number;
}

// --- Funciones de Llamada a la API para Productos (con Axios) ---

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data.data.products;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.data.product;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
  try {
    console.log('Enviando datos al backend (createProduct):', payload);
    const response = await api.post('/products', payload);
    return response.data.data.product;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateProduct = async (id: number, payload: UpdateProductPayload): Promise<Product> => {
  try {
    console.log('Enviando datos al backend (updateProduct):', { id, payload });
    const response = await api.put(`/products/${id}`, payload);
    return response.data.data.product;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// **NUEVA FUNCIÓN API:** para crear la asociación producto-sede-stock
export const createSedeProductAssociation = async (payload: CreateSedeProductAssociationPayload): Promise<any> => {
  try {
    console.log('Enviando datos al backend (createSedeProductAssociation):', payload);
    // ASUME que tienes un endpoint en tu backend para esto, por ejemplo: /api/sede-product-associations
    const response = await api.post('/sede-product-associations', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// OPCIONAL: Función para obtener sedes (necesaria para el dropdown en el formulario)
export const getSedes = async (): Promise<Sede[]> => {
  try {
    // ASUME que tienes un endpoint en tu backend para obtener sedes, por ejemplo: /api/sedes
    const response = await api.get('/sedes');
    return response.data.data.sedes; // Ajusta según la estructura de tu respuesta
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};