import { GOOGLE_MAPS_GEOCODER_API_KEY } from "@env";
import axios from "axios";

export const getGeoLocation = async (place_id) => {
  if (!place_id) return;
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${GOOGLE_MAPS_GEOCODER_API_KEY}`;
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const lat = response.data.results[0].geometry.location.lat.toFixed(6);
      const lng = response.data.results[0].geometry.location.lng.toFixed(6);
      return { lat, lng };
    } else {
      console.log("No results found");
    }
  } catch (error) {
    console.error(error);
  }
};
