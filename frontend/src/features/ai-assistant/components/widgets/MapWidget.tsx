import { Map } from "lucide-react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
  data: {
    center: [number, number];
    zoom: number;
    markers: Array<{ lat: number; lng: number; label: string; type: string }>;
  };
}

export function MapWidget({ data }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-4 shadow-2xs font-sans"
    >
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center gap-2">
        <Map className="h-4 w-4 text-[#2563EB]" />
        <h3 className="text-xs font-bold text-[#1E293B] tracking-wider uppercase">GIS Incident Analysis</h3>
      </div>
      <div className="h-[350px] w-full z-0 relative">
        <MapContainer 
          center={data.center} 
          zoom={data.zoom} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          />
          
          {data.markers.map((marker, i) => (
            <CircleMarker
              key={i}
              center={[marker.lat, marker.lng]}
              pathOptions={{
                color: marker.type === 'Hotspot' ? '#dc2626' : '#2563eb',
                fillColor: marker.type === 'Hotspot' ? '#dc2626' : '#2563eb',
                fillOpacity: 0.4
              }}
              radius={marker.type === 'Hotspot' ? 25 : 10}
            >
              <Popup>
                <div className="text-[#1E293B] font-bold text-xs">{marker.label}</div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </motion.div>
  );
}
