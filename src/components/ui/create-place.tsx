'use client';
import { useState } from "react";

export default function CreatePlace() {
  const [placeData, setPlaceData] = useState({
    name: "",
    description: "",
    heartPlace: false,
    geoCoordinate: { latitude: "", longitude: "" },
    openingHours: "",
    picture: "",
  });

  const handleChange = (field: string, value: string) => {
    setPlaceData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGeoChange = (field: string, value: string) => {
    setPlaceData((prev) => ({
      ...prev,
      geoCoordinate: { ...prev.geoCoordinate, [field]: value },
    }));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Place</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter the name of the place"
            value={placeData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the place"
            value={placeData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={() =>
              setPlaceData((prev) => ({ ...prev, picture: "pictureset" }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700 mr-2">Is this a "place in your heart"?</label>
          <input
            type="checkbox"
            checked={placeData.heartPlace}
            onChange={(e) =>
              setPlaceData((prev) => ({ ...prev, heartPlace: e.target.checked }))
            }
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        {!placeData.heartPlace && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                placeholder="Latitude"
                value={placeData.geoCoordinate.latitude}
                onChange={(e) => handleGeoChange("latitude", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                placeholder="Longitude"
                value={placeData.geoCoordinate.longitude}
                onChange={(e) => handleGeoChange("longitude", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">Opening Hours</label>
          <textarea
            id="openingHours"
            name="openingHours"
            placeholder="e.g., Monday-Friday: 9:00 AM - 5:00 PM"
            value={placeData.openingHours}
            onChange={(e) => handleChange("openingHours", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={() => console.log(placeData)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Place
        </button>
      </div>
    </div>
  );
}
