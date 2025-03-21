// src/App.jsx
import React, { useEffect, useState } from 'react'
import CategoryForm from './components/CategoryForm'
import './App.css'
import RoutingMachine from './components/Routing'
import MyMap from './components/Map'

function App () {
  const [latitud, setLatitud] = useState(1.22227)
  const [longitud, setLongitud] = useState(-77.2812207)

  const [currentLocation, setCurrentLocation] = useState(null)
  const destination = { lat: 1.2222, lng: -77.28055 } // Ejemplo: San Francisco

  useEffect(() => {
    const obtenerUbicacion = () => {
      if (!navigator.geolocation) {
        console.error("❌ Geolocalización no soportada en este navegador.");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log("✅ Ubicación obtenida:", position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("❌ Error obteniendo la ubicación:", error.message);
        },
        {
          enableHighAccuracy: true, // 🚀 Intenta usar GPS en lugar de IP
          timeout: 10000, // ⏳ Espera máximo 10 segundos
          maximumAge: 0, // 🔄 Siempre obtener una nueva ubicación
        }
      );
    };

    const obtenerUbicacionPorIP = async () => {
      try {
        const respuesta = await fetch("https://ipapi.co/json/");
        const data = await respuesta.json();
        setCurrentLocation({ lat: data.latitude, lng: data.longitude });
        console.log("🌍 Ubicación por IP:", data.latitude, data.longitude);
      } catch (error) {
        console.error("❌ Error obteniendo ubicación por IP:", error);
      }
    };
  
    obtenerUbicacionPorIP();
  }, []);
  

  if (!currentLocation) return <p>Cargando ubicación...</p>

  return (
    <div className='app'>
      <main>
        {/* <CategoryForm /> */}
        <div className='p-6'>
          <h1 className='text-2xl font-bold mb-4'>Mapa con OpenStreetMap</h1>
          <input
            type='number'
            placeholder='latitud'
            onChange={e => {
              setLatitud(e.target.value)
            }}
          />
          <input
            type='number'
            placeholder='longitud'
            onChange={e => {
              setLongitud(e.target.value)
            }}
          />
          <h1 className='text-2xl font-bold mb-4'>Ruta desde mi ubicación</h1>
          <MyMap lat={1.2105179} lng={-77.2749852}>
            <RoutingMachine
              origin={{
                lat: 1.2105179,
                lng: -77.2749852
              }}
              destination={destination}
            />
          </MyMap>
          <div id="routing-instructions" className="mt-4 p-4 border rounded bg-gray-100"></div> {/* 🔥 Instrucciones debajo */}
        </div>
      </main>
    </div>
  )
}

export default App
