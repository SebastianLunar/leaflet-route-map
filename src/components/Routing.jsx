import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ origin, destination }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Si ya hay un control de rutas, eliminarlo antes de crear uno nuevo
    if (routingControlRef.current) {
      try {
        map.removeControl(routingControlRef.current);
      } catch (error) {
        console.warn("No se pudo eliminar el control de rutas:", error);
      }
    }

    const routingContainer = document.getElementById("routing-instructions");

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(origin.lat, origin.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
    }).addTo(map);

    routingControlRef.current = routingControl;

    if (routingContainer) {
      routingContainer.innerHTML = "";
      try {
        routingContainer.appendChild(routingControl.onAdd(map));
      } catch (error) {
        console.warn("No se pudo agregar el contenedor de instrucciones:", error);
      }
    }

    return () => {
      if (routingControlRef.current) {
        try {
          routingControlRef.current.getPlan().setWaypoints([]); // Borra los puntos de la ruta
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        } catch (error) {
          console.warn("Error al limpiar la ruta:", error);
        }
      }
    };
  }, [map, origin, destination]);

  return null;
};

export default RoutingMachine;
