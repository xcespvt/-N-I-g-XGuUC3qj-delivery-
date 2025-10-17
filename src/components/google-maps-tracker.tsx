'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (Bangalore)
const center = {
  lat: 12.9716,
  lng: 77.5946
};

interface Location {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

interface GoogleMapsTrackerProps {
  restaurantLocation: Location;
  customerLocation: Location;
  currentLocation?: Location;
  stage: 'Pickup' | 'AtRestaurant' | 'PickedUp' | 'AtCustomer' | 'Complete' | 'Cancelled';
}

const GoogleMapsTracker: React.FC<GoogleMapsTrackerProps> = ({
  restaurantLocation,
  customerLocation,
  currentLocation,
  stage
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyAU2Rh9JljXzGtpUREn7dWkc1Hckj2LnGU',
    libraries: ['geometry', 'drawing'],
    version: 'weekly'
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  // Calculate and display route
  useEffect(() => {
    if (isLoaded && map) {
      const directionsService = new google.maps.DirectionsService();
      
      let origin: google.maps.LatLng | string;
      let destination: google.maps.LatLng | string;
      let waypoints: google.maps.DirectionsWaypoint[] = [];

      // Determine route based on current stage
      if (stage === 'Pickup' || stage === 'AtRestaurant') {
        // Route from current location to restaurant
        origin = currentLocation ? 
          new google.maps.LatLng(currentLocation.lat, currentLocation.lng) : 
          new google.maps.LatLng(restaurantLocation.lat, restaurantLocation.lng);
        destination = new google.maps.LatLng(restaurantLocation.lat, restaurantLocation.lng);
      } else if (stage === 'PickedUp' || stage === 'AtCustomer') {
        // Route from restaurant to customer
        origin = new google.maps.LatLng(restaurantLocation.lat, restaurantLocation.lng);
        destination = new google.maps.LatLng(customerLocation.lat, customerLocation.lng);
      } else {
        // Complete route: restaurant -> customer
        origin = new google.maps.LatLng(restaurantLocation.lat, restaurantLocation.lng);
        destination = new google.maps.LatLng(customerLocation.lat, customerLocation.lng);
      }

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirectionsResponse(result);
          } else {
            console.warn('Directions request failed due to ' + status);
            // Clear any existing directions on failure
            setDirectionsResponse(null);
          }
        }
      );
    }
  }, [isLoaded, map, restaurantLocation, customerLocation, currentLocation, stage]);

  // Handle loading error
  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Failed to load map</p>
          <p className="text-xs text-muted-foreground">Please check your internet connection</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
          <p className="text-xs text-muted-foreground mt-1">This may take a moment on mobile</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy', // Better for mobile
        clickableIcons: false,
        keyboardShortcuts: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      }}
    >
      {/* Restaurant Marker */}
      <Marker
        position={{ lat: restaurantLocation.lat, lng: restaurantLocation.lng }}
        title={restaurantLocation.name}
        icon={{
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#10B981"/>
              <path d="M12 10h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
        }}
      />

      {/* Customer Marker */}
      <Marker
        position={{ lat: customerLocation.lat, lng: customerLocation.lng }}
        title={customerLocation.name}
        icon={{
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#EF4444"/>
              <circle cx="16" cy="12" r="4" fill="white"/>
              <path d="M16 18c-3 0-6 2-6 4v2h12v-2c0-2-3-4-6-4z" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
        }}
      />

      {/* Current Location Marker (if available) */}
      {currentLocation && (
        <Marker
          position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
          title="Your Location"
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#3B82F6"/>
                <circle cx="12" cy="12" r="6" fill="white"/>
                <circle cx="12" cy="12" r="3" fill="#3B82F6"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24),
          }}
        />
      )}

      {/* Directions */}
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#3B82F6',
              strokeWeight: 4,
              strokeOpacity: 0.8,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default GoogleMapsTracker;