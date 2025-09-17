import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { LandProperty } from '../data/nigerianLands';

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

interface GoogleMapProps {
  properties: LandProperty[];
  selectedProperty?: LandProperty | null;
  onMarkerClick?: (property: LandProperty) => void;
  height?: string;
  zoom?: number;
  center?: { lat: number; lng: number };
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  properties,
  selectedProperty,
  onMarkerClick,
  height = '500px',
  zoom = 12,
  center
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  // Nigerian coordinates (centered on Lagos by default)
  const defaultCenter = { lat: 6.5244, lng: 3.3792 };

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: center || defaultCenter,
          zoom: zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        setMap(mapInstance);
        setInfoWindow(new google.maps.InfoWindow());
      }
    });

    return () => {
      // Clean up markers when component unmounts
      markers.forEach(marker => marker.setMap(null));
    };
  }, []);

  // Update markers when properties or map changes
  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    // Create markers for each property
    properties.forEach(property => {
      // In a real app, you would have actual coordinates for each property
      // Here we're generating random coordinates near the center for demonstration
      const propertyCoords = getPropertyCoordinates(property);
      
      const marker = new google.maps.Marker({
        position: propertyCoords,
        map: map,
        title: property.title,
        animation: google.maps.Animation.DROP,
        icon: {
          url: selectedProperty?.id === property.id 
            ? 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' 
            : 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(40, 40),
        },
      });

      // Create info window content
      const contentString = `
        <div style="width: 200px; padding: 10px;">
          <h3 style="margin: 0 0 5px; font-size: 16px;">${property.title}</h3>
          <p style="margin: 0 0 5px; font-size: 14px;">${property.address}</p>
          <p style="margin: 0; font-weight: bold; color: #2563eb;">
            ₦${property.price.toLocaleString()}
          </p>
          <p style="margin: 5px 0 0; font-size: 13px;">
            ${property.size.toLocaleString()} sqm | ${property.zoning}
          </p>
        </div>
      `;

      // Add click event to marker
      marker.addListener('click', () => {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
        
        if (onMarkerClick) {
          onMarkerClick(property);
        }
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // If there are properties, fit bounds to show all markers
    if (properties.length > 0 && !center) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition()!);
      });
      map.fitBounds(bounds);
      
      // Don't zoom in too far
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom()! > 15) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }

    // If a property is selected, center on it
    if (selectedProperty && map) {
      const selectedCoords = getPropertyCoordinates(selectedProperty);
      map.setCenter(selectedCoords);
      map.setZoom(16);
      
      // Open info window for selected property
      const selectedMarker = newMarkers.find(
        marker => marker.getTitle() === selectedProperty.title
      );
      
      if (selectedMarker) {
        const contentString = `
          <div style="width: 200px; padding: 10px;">
            <h3 style="margin: 0 0 5px; font-size: 16px;">${selectedProperty.title}</h3>
            <p style="margin: 0 0 5px; font-size: 14px;">${selectedProperty.address}</p>
            <p style="margin: 0; font-weight: bold; color: #2563eb;">
              ₦${selectedProperty.price.toLocaleString()}
            </p>
            <p style="margin: 5px 0 0; font-size: 13px;">
              ${selectedProperty.size.toLocaleString()} sqm | ${selectedProperty.zoning}
            </p>
          </div>
        `;
        
        infoWindow.setContent(contentString);
        infoWindow.open(map, selectedMarker);
      }
    }
  }, [map, properties, selectedProperty, infoWindow]);

  // Helper function to get coordinates for a property
  // In a real app, you would store actual coordinates with each property
  const getPropertyCoordinates = (property: LandProperty) => {
    // This is a simplified mapping of Nigerian locations to coordinates
    // In a real app, you would have precise coordinates for each property
    const locationCoordinates: Record<string, { lat: number; lng: number }> = {
      'Lagos': { lat: 6.5244, lng: 3.3792 },
      'Lekki': { lat: 6.4698, lng: 3.5852 },
      'Victoria Island': { lat: 6.4281, lng: 3.4219 },
      'Ikoyi': { lat: 6.4500, lng: 3.4333 },
      'Ajah': { lat: 6.4698, lng: 3.5654 },
      'Yaba': { lat: 6.5104, lng: 3.3741 },
      'Banana Island': { lat: 6.4392, lng: 3.4242 },
      'Ibeju-Lekki': { lat: 6.5001, lng: 3.8595 },
      'Epe': { lat: 6.5944, lng: 3.9831 },
      'Magodo': { lat: 6.6144, lng: 3.3792 },
      'FCT (Abuja)': { lat: 9.0765, lng: 7.3986 },
      'Jahi': { lat: 9.0913, lng: 7.4256 },
      'Mpape': { lat: 9.1151, lng: 7.4951 },
      'Wuse': { lat: 9.0667, lng: 7.4833 },
      'Ogun': { lat: 7.0000, lng: 3.3500 },
      'Agbara': { lat: 6.5301, lng: 3.1136 },
      'Abia': { lat: 5.4307, lng: 7.5247 },
      'Aba': { lat: 5.1167, lng: 7.3667 },
    };

    // Try to find coordinates for the city first, then state
    let coordinates = locationCoordinates[property.city];
    if (!coordinates) {
      coordinates = locationCoordinates[property.state];
    }
    
    // If no coordinates found, use default (Lagos)
    if (!coordinates) {
      coordinates = defaultCenter;
    }
    
    // Add a small random offset to prevent markers from overlapping
    const latOffset = (Math.random() - 0.5) * 0.01;
    const lngOffset = (Math.random() - 0.5) * 0.01;
    
    return {
      lat: coordinates.lat + latOffset,
      lng: coordinates.lng + lngOffset
    };
  };

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height, 
        borderRadius: '0.75rem',
        overflow: 'hidden'
      }}
    />
  );
};

export default GoogleMap;
