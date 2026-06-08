import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import "./Branches.css";
import massiv from "../../assets/photo_2026-03-23_16-54-02.jpg";
import honabot from "../../assets/photo_2026-03-23_16-54-03.jpg";

// Custom marker icons
const branchIcon1 = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const branchIcon2 = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

// Branches coordinates
const branches = [
  { name: "Хонобод филиал", lat: 41.2443, lng: 69.2876, icon: branchIcon1 },
  { name: "68 поликлиника", lat: 41.2391, lng: 69.2753, icon: branchIcon2 },
];

// Center map on load
const AnimateMap = () => {
  const map = useMap();
  map.setView([41.2417, 69.2815], 14);
  return null;
};

const Branches = () => {
  return (
    <section className="branches-map-section" id="branches">
      <h2 className="branches-map-title">
        Наши <span>филиалы</span>
      </h2>

      <div className="branches-container">
        {/* Left block: Map */}
        <div className="branches-map">
          <MapContainer
            center={[41.2417, 69.2815]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%", borderRadius: "15px" }}
          >
            <AnimateMap />
            <TileLayer
              url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {branches.map((branch, idx) => (
              <Marker key={idx} position={[branch.lat, branch.lng]} icon={branch.icon}>
                <Popup>
                  <div className="popup-content">
                    <h3>{branch.name}</h3>
                    <p><FaPhoneAlt /> +998 71 200 00 00</p>
                    <p><FaEnvelope /> info@intellectacademy.uz</p>
                    <p><FaMapMarkerAlt /> Tashkent, Uzbekistan</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Right block: Images */}
        <div className="branches-images">
          <img src={massiv} alt="Хонобод" className="branch-image" />
          <img src={honabot} alt="68 поликлиника" className="branch-image" />
        </div>
      </div>
    </section>
  );
};

export default Branches;