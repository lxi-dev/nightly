import React, { useEffect, useRef } from 'react';
// import { renderToString } from 'react-dom/server';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';

// Lucide React icons
// import { 
//   type LucideIcon 
// } from 'lucide-react';

// // Styles
import 'ol/ol.css';

// Define the type for location
export interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  color?: string;
  scale?: number;
}

// Utility to convert Lucide icon to SVG marker
// const createIconMarker = (
//   LucideIcon: LucideIcon, 
//   color = '#FF0000', 
//   size = 32
// ): string => {
//   // Create a full SVG with the icon
//   const svgString = renderToString(
//     <svg 
//       xmlns="http://www.w3.org/2000/svg" 
//       width={size} 
//       height={size} 
//       viewBox="0 0 24 24"
//     >
//       <LucideIcon 
//         color={color} 
//         strokeWidth={2} 
//       />
//     </svg>
//   );
  
//   return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
// };

// Define map style types
type MapStyleType = 'default' | 'satellite' | 'black-white';

// Define props interface
interface MapComponentProps {
  locations?: MapLocation[];
  center?: [number, number];
  zoom?: number;
  interactive?: boolean;
  className?: string;
  mapStyle?: MapStyleType;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  locations, 
  center = [-0.09, 51.505],
  zoom = 10,
  interactive = true,
  className = '',
  mapStyle = 'default'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Determine map layer based on style
    let mapLayer;
    switch (mapStyle) {
      case 'satellite':
        mapLayer = new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attributions: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          })
        });
        break;
      case 'black-white':
        mapLayer = new TileLayer({
          source: new OSM(),
          properties: {
            className: 'grayscale-layer'
          }
        });
        break;
      default:
        mapLayer = new TileLayer({
          source: new OSM()
        });
    }

    // Create base map with controlled interactions
    const map = new Map({
      target: mapRef.current,
      layers: [mapLayer],
      view: new View({
        center: fromLonLat(center), 
        zoom: zoom,
        padding: [50, 50, 50, 50]
      }),
      controls: interactive ? defaultControls() : [],
      interactions: interactive 
        ? defaultInteractions() 
        : defaultInteractions({ 
            dragPan: false, 
            mouseWheelZoom: false 
          })
    });

    // Apply grayscale filter for black and white style
    if (mapStyle === 'black-white' && mapRef.current) {
      const style = document.createElement('style');
      style.textContent = `
        .grayscale-layer {
          filter: grayscale(100%) brightness(110%);
        }
      `;
      mapRef.current.appendChild(style);
    }

    // Create vector source for markers
    const vectorSource = new VectorSource();

    if(locations) {
      // Add markers
      locations.forEach(location => {
        const marker = new Feature({
          geometry: new Point(fromLonLat([location.lng, location.lat]))
        });
        
        // Select icon based on location type, with fallback
        //const IconComponent = MapPin;
        
        // Set marker style with Lucide icon
        //   marker.setStyle(new Style({
          //     image: new Icon({
            //       src: createIconMarker(
              //         IconComponent, 
              //         location.color || '#FF0000', 
              //       ),
              //     })
              //   }));
              // marker.setStyle(new Style({
              //   image: new Icon({
              //     src: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Marker-yellow.png?20220504101914', // You'll need to provide a marker icon
              //     scale: 0.075
              //   })
              // }));
              vectorSource.addFeature(marker);
            });
          }

    // Add vector layer with markers
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });
    map.addLayer(vectorLayer);

    // Adjust view to fit markers
    if (locations && locations.length > 0) {
      const extent = vectorSource.getExtent();
      map.getView().fit(extent, { 
        padding: [50, 50, 50, 50],
        maxZoom: zoom
      });
    }

    // Cleanup
    return () => {
      map.setTarget(undefined);
    };
  }, [locations, center, zoom, interactive, mapStyle]);

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '100%'}} 
      className={`map-container ${className}`}
    />
  );
};

export default MapComponent;