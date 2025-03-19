// src/App.jsx
import React from 'react';
import CategoryForm from './components/CategoryForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>API de Categorías</h1>
      </header>
      <main>
        <CategoryForm />
      </main>
    </div>
  );
}

export default App;