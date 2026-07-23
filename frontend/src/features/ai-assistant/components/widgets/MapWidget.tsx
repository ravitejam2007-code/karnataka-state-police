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
      className="bg-slate-800 border border-slate-700 rounded-md overflow-hidden mb-4"
    >
      <div className="bg-slate-900/50 border-b border-slate-700 px-4 py-2 flex items-center gap-2">
        <Map className="h-4 w-4 text-emerald-400" />
        <h3 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">GIS Analysis</h3>
      </div>
      <div className="h-[400px] w-full z-0 relative">
        <MapContainer 
          center={data.center} 
          zoom={data.zoom} 
          style={{ height: '100%', width: '100%' }}
        >
          {/* Using a dark themed map tile provider */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {/* We will place some dummy hotspots based on the provided markers */}
          {data.markers.map((marker, i) => (
            <CircleMarker
              key={i}
              center={[marker.lat, marker.lng]}
              pathOptions={{
                color: marker.type === 'Hotspot' ? '#ef4444' : '#3b82f6',
                fillColor: marker.type === 'Hotspot' ? '#ef4444' : '#3b82f6',
                fillOpacity: 0.4
              }}
              radius={marker.type === 'Hotspot' ? 25 : 10}
            >
              <Popup>
                <div className="text-slate-900 font-semibold">{marker.label}</div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </motion.div>
  );
}
