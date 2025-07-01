interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string | null;
}

interface CreateCustomerPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  address?: string | null;
}

interface UpdateCustomerPayload extends Partial<CreateCustomerPayload> {}

// --- Funciones de Llamada a la API para Clientes ---

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/customers`);
  if (!response.ok) {
    throw new Error(`Error fetching customers: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data.customers; // Ajusta según la estructura real de tu respuesta del backend
};

export const getCustomerById = async (id: number): Promise<Customer> => {
  const response = await fetch(`${process.env.API_BASE_URL}/customers/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching customer with ID ${id}: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data.customer;
};

export const createCustomer = async (payload: CreateCustomerPayload): Promise<Customer> => {
  console.log('Enviando datos al backend (createCustomer):', payload);
  const response = await fetch(`${process.env.API_BASE_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error creating customer: ${errorData.message || response.statusText}`);
  }
  const data = await response.json();
  return data.data.customer;
};

export const updateCustomer = async (id: number, payload: UpdateCustomerPayload): Promise<Customer> => {
  console.log('Enviando datos al backend (updateCustomer):', { id, payload });
  const response = await fetch(`${process.env.API_BASE_URL}/customers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error updating customer with ID ${id}: ${errorData.message || response.statusText}`);
  }
  const data = await response.json();
  return data.data.customer;
};

export const deleteCustomer = async (id: number): Promise<void> => {
  const response = await fetch(`${process.env.API_BASE_URL}/customers/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error deleting customer with ID ${id}: ${errorData.message || response.statusText}`);
  }
};