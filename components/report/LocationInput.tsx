import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet"; // Ensure L is imported
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Geolocation control component
function AddGeolocationControl() {
  const map = useMap();

  useEffect(() => {
    // Dynamically load the Geolocation control script and stylesheet
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet-control-geolocation@1.0.0/dist/Control.Geolocate.js";
    script.async = true;
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet-control-geolocation@1.0.0/dist/Control.Geolocate.css";
    document.head.appendChild(link);

    // When the script loads, initialize the control
    script.onload = () => {
      const geolocateControl = new L.Control.Geolocate({
        position: "topright",
        trackUserLocation: true,
      }).addTo(map);

      return () => {
        geolocateControl.remove();
      };
    };

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, [map]);

  return null;
}

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onCoordinatesChange?: (lat: number | null, lng: number | null) => void;
}

export function LocationInput({ value, onChange, onCoordinatesChange }: LocationInputProps) {
  const [locationError, setLocationError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onCoordinatesChange?.(latitude, longitude);
        onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      },
      (error) => {
        setLocationError(error.message);
      }
    );
  };

  const handleAddressSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    try {
      if (query) {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`
        );
        setSuggestions(response.data); // Update suggestions
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  const handleSelectLocation = (latitude: number, longitude: number) => {
    onCoordinatesChange?.(latitude, longitude);
    onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    setSuggestions([]); // Close suggestions after selecting
  };

  // Ensure that the value is a valid coordinate string
  const isValidCoordinates = (coords: string) => {
    const [lat, lng] = coords.split(",").map(parseFloat);
    return !isNaN(lat) && !isNaN(lng);
  };

  // If value is not valid, set it to default (fallback) coordinates
  const defaultCoords = "51.505, -0.09"; // Set default coordinates (London, for example)
  const [lat, lng] = isValidCoordinates(value) ? value.split(",").map(parseFloat) : defaultCoords.split(",").map(parseFloat);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-zinc-400">Location</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            handleAddressSearch(e);
          }}
          placeholder="Enter location or use pin"
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 pl-4 pr-12 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        />

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute bg-white text-black z-10 w-full border border-zinc-800 mt-1 max-h-60 overflow-y-auto rounded-xl shadow-lg">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.place_id}
                className="px-4 py-2 cursor-pointer hover:bg-zinc-100 rounded-lg"
                onClick={() => handleSelectLocation(suggestion.lat, suggestion.lon)}
              >
                {suggestion.display_name}
              </div>
            ))}
          </div>
        )}

        {/* Button to get current location */}
        <button
          type="button"
          onClick={getLocation}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-colors duration-200"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2v4m0 12v4m-4-4h8m-8 0H4m16 0h-4"
            />
          </svg>
        </button>
      </div>

      {/* Error handling */}
      {locationError && (
        <p className="text-sm text-red-400 flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {locationError}
        </p>
      )}

      {/* Map */}
      <MapContainer
        center={[lat, lng]} // Use the parsed coordinates or default coordinates
        zoom={13}
        style={{ width: "100%", height: "400px" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Add Geolocation Control */}
        <AddGeolocationControl />
        {isValidCoordinates(value) && (
          <Marker position={[lat, lng]}>
            <Popup>Selected Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default LocationInput;
