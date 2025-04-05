// services/nominatimService.js

import type { GeoCoordinates } from "nglty/types/funnel";

export async function getGeoCoordinates(query: string) {
    try {
      if (!query) {
        throw new Error("Query parameter is required");
      }
  
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'YourAppName/1.0', // Replace with your app name and version
          'Accept-Language': 'en-US' // Optional, sets the response language
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
  
      if (data.length === 0) {
        throw new Error("No results found for the given query");
      }
  
      // Returning the first result (most relevant)
      return {
        latitude: data[0].lat as string,
        longitude: data[0].lon as string,
        displayName: data[0].display_name as string
      };
    } catch (error) {
      console.error("Error in getGeoCoordinates:", error);
      throw error;
    }
  }

  export async function fetchCoordinates(value: string) {
    try {
      const result: GeoCoordinates = await getGeoCoordinates(value);
      return result;
    } catch (error) {
      console.error('Failed to fetch GeoCoordinates:', error);
    }
  }
  
  // Example Usage
  // (You can call this service in a Next.js API route or directly in your React components.)
  
  // import { getGeoCoordinates } from './services/nominatimService';
  //
  // async function fetchCoordinates() {
  //   try {
  //     const result = await getGeoCoordinates('Berlin, Germany');
  //     console.log('GeoCoordinates:', result);
  //   } catch (error) {
  //     console.error('Failed to fetch GeoCoordinates:', error);
  //   }
  // }
  