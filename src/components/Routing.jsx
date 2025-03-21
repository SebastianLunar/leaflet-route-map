import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ origin, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingContainer = document.getElementById("routing-instructions");

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(origin.lat, origin.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      createMarker: () => null, // Evita crear marcadores adicionales
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
    }).addTo(map);

    if (routingContainer) {
      routingContainer.innerHTML = ""; // Limpia contenido previo
      routingContainer.appendChild(routingControl.onAdd(map)); // Mueve instrucciones
    }

    return () => map.removeControl(routingControl);
  }, [map, origin, destination]);

  return null;
};

export default RoutingMachine;
