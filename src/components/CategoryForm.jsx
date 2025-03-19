// src/components/CategoryForm.jsx (versión extendida)
import React, { useState } from 'react';
import { createCategory } from '../services/api';

function CategoryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sinonyms: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await createCategory(formData);
      setResult(data);
      // Limpiar formulario después del éxito
      setFormData({
        name: "",
        description: "",
        sinonyms: ""
      });
    } catch (error) {
      setError(error.message || 'Error al crear la categoría');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="category-form">
      <h2>Crear Nueva Categoría</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="sinonyms">Sinónimos (separados por comas):</label>
          <input
            type="text"
            id="sinonyms"
            name="sinonyms"
            value={formData.sinonyms}
            onChange={handleChange}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Creando...' : 'Crear categoría'}
        </button>
      </form>
      
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      
      {result && (
        <div className="result">
          <h3>Categoría creada con éxito:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CategoryForm;