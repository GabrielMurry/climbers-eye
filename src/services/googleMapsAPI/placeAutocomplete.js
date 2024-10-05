import { GOOGLE_MAPS_GEOCODER_API_KEY } from "@env";
import axios from "axios";

export const getAddressSuggestions = async (text) => {
  if (text.length < 3) return; // Avoid API call if input is too short

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
    const response = await axios.get(url, {
      params: {
        input: text,
        key: GOOGLE_MAPS_GEOCODER_API_KEY,
        language: "en", // Optional: Set language for results
      },
    });
    if (response.data.status === "OK") {
      return response.data.predictions; // Return the autocomplete results
    } else {
      return []; // Return empty array (clear) if no results
    }
  } catch (error) {
    console.error(error);
  }
};
