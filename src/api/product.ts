import axios from 'axios';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product data structure
export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string | null;
  price: number;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
}

// Payload for creating new products
export interface CreateProductPayload {
  name: string;
  sku: string;
  price: number;
  description?: string | null;
  category?: string | null;
  sedeId: number;
  initialStockAtSede: number;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}

// Location/branch data structure
export interface Sede {
  id: number;
  name: string;
  address: string;
}

// Association between products and locations with stock
export interface CreateSedeProductAssociationPayload {
  sede_id: number;
  product_id: number;
  stock_at_sede: number;
}

// API functions for product management
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

// Create product-location association with initial stock
export const createSedeProductAssociation = async (payload: CreateSedeProductAssociationPayload): Promise<any> => {
  try {
    console.log('Enviando datos al backend (createSedeProductAssociation):', payload);
    const response = await api.post('/sede-product-associations', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Get all available locations/branches
export const getSedes = async (): Promise<Sede[]> => {
  try {
    const response = await api.get('/sedes');
    return response.data.data.sedes;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};