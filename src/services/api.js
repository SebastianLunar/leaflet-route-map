// src/services/api.js

// Acceder a la variable de entorno
const API_URL = import.meta.env.VITE_API_URL;

export const createCategory = async (categoryData = {
  name: "Nueva Faber",
  description: "Descripcion Faber",
  sinonyms: "faber, florez"
}) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/ontology/main_category/`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoryData)
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    throw error;
  }
};