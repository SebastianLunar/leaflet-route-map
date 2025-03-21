import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyMap = ({ lat, lng, children }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ width: "100%", height: "400px", borderRadius: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
      <Marker position={[lat, lng]}>
        <Popup>Mi ubicación</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
