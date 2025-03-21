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

  const obtenerUbicacion = (intentos = 3) => {
    if (!navigator.geolocation) {
      console.error("❌ Geolocalización no soportada.");
      obtenerUbicacionPorIP(); // Si no hay geolocalización, usa la IP
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(
          `📍 Precisión obtenida: ${position.coords.accuracy} metros (Intento: ${4 - intentos})`
        );
  
        if (position.coords.accuracy > 50 && intentos > 0) {
          // Si la precisión es mala (>50m), intenta de nuevo hasta 3 veces
          setTimeout(() => obtenerUbicacion(intentos - 1), 2000);
        } else {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log("✅ Ubicación obtenida con precisión:", position.coords.accuracy, "metros");
        }
      },
      error => {
        console.error("❌ Error en geolocalización:", error.message);
        obtenerUbicacionPorIP(); // Si falla, usa ubicación por IP
      },
      {
        enableHighAccuracy: true, // Forzar GPS en dispositivos compatibles
        timeout: 20000, // Aumentar el tiempo de espera a 20 segundos
        maximumAge: 5000, // Permitir usar ubicación reciente si es precisa
      }
    );
  };
  
  const obtenerUbicacionPorIP = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setCurrentLocation({ lat: data.latitude, lng: data.longitude });
      console.log("🌍 Ubicación obtenida por IP:", data.latitude, data.longitude);
    } catch (error) {
      console.error("❌ Error obteniendo ubicación por IP:", error);
    }
  };
  
  useEffect(() => {
    obtenerUbicacion();
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
          <MyMap lat={currentLocation.lat} lng={currentLocation.lng}>
            <RoutingMachine
              origin={currentLocation}
              destination={destination}
            />
          </MyMap>
          <div
            id='routing-instructions'
            className='mt-4 p-4 border rounded bg-gray-100'
          ></div>{' '}
          {/* 🔥 Instrucciones debajo */}
        </div>
      </main>
    </div>
  )
}

export default App
