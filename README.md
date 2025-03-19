# API de Categorías - Cliente React

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)

Un cliente React moderno para consumir la API de Prevalidador UNSPSC, especializado en la gestión de categorías UNSPSC. Esta aplicación permite la creación, visualización y gestión de categorías dentro del sistema de prevalidación.

## 📋 Contenido

- [API de Categorías - Cliente React](#api-de-categorías---cliente-react)
  - [📋 Contenido](#-contenido)
  - [✨ Características](#-características)
  - [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
  - [🏗️ Arquitectura](#️-arquitectura)
  - [🚀 Instalación](#-instalación)
  - [⚙️ Configuración](#️-configuración)
    - [Variables de Entorno](#variables-de-entorno)
  - [📖 Uso](#-uso)
    - [Desarrollo](#desarrollo)
    - [Producción](#producción)
  - [📚 API Reference](#-api-reference)
    - [Crear Categoría](#crear-categoría)
  - [💻 Desarrollo](#-desarrollo)
    - [Estructura de Componentes](#estructura-de-componentes)
    - [Manejo de Errores](#manejo-de-errores)

## ✨ Características

- Interfaz de usuario intuitiva y moderna para la gestión de categorías
- Formularios de creación con validación en tiempo real
- Visualización de respuestas de la API
- Manejo de errores robusto
- Diseño responsive para múltiples dispositivos


## 🛠️ Tecnologías Utilizadas

- **React** - Biblioteca de JavaScript para la interfaz de usuario
- **Vite** - Herramienta de compilación y desarrollo ultrarrápida
- **JavaScript (ES6+)** - Para la lógica de la aplicación
- **CSS3** - Para los estilos y diseño responsivo
- **Fetch API** - Para las peticiones HTTP a la API
- **Versión Node** - Para este ejemplo usar Node v20 o superior

## 🏗️ Arquitectura

El proyecto sigue una arquitectura de componentes con servicios separados para la comunicación con la API:

```
src/
├── components/         # Componentes React reutilizables
│   └── CategoryForm.jsx  # Formulario de creación de categorías
├── services/           # Servicios para interactuar con APIs
│   └── api.js          # Funciones para consumir la API
├── App.jsx             # Componente principal
├── main.jsx           # Punto de entrada
└── App.css            # Estilos globales
```

## 🚀 Instalación

1. Clona el repositorio
   ```bash
   git clone https://github.com/tu-usuario/api-categorias-client.git
   cd api-categorias-client
   ```

2. Instala las dependencias
   ```bash
   npm install
   ```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_URL=https://api-prevalidator-67779491282.us-east1.run.app
```

## 📖 Uso

### Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev -- --port 8080
```

La aplicación estará disponible en `http://localhost:8080`.

### Producción

Para compilar la aplicación para producción:

```bash
npm run build
```

Para previsualizar la versión de producción:

```bash
npm run preview
```

## 📚 API Reference

### Crear Categoría

```javascript
POST /api/v1/ontology/main_category/

// Request Body
{
  "name": "Nombre de la Categoría",
  "description": "Descripción detallada",
  "sinonyms": "sinónimo1, sinónimo2, sinónimo3"
}

// Response 201 Created
{
  "id": "123456",
  "name": "Nombre de la Categoría",
  "description": "Descripción detallada",
  "sinonyms": "sinónimo1, sinónimo2, sinónimo3",
  "created_at": "2025-03-19T23:30:00Z"
}
```

## 💻 Desarrollo

### Estructura de Componentes

El componente principal `CategoryForm` gestiona:

1. Estado del formulario
2. Validación de datos
3. Envío de peticiones a la API
4. Visualización de resultados y errores

### Manejo de Errores

La aplicación implementa un sistema de manejo de errores que:

- Captura errores de red
- Muestra mensajes de error descriptivos
- Maneja correctamente los códigos de estado HTTP
- Proporciona feedback visual al usuario

