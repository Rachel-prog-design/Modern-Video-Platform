import axios from "axios";

const BASE_URL = "https://youtube-v311.p.rapidapi.com";

// Temporary debug log - remove after confirming key is loaded
console.log("API KEY:", import.meta.env.VITE_RAPID_API_KEY);

const options = {
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "youtube-v311.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    const status = error.response?.status;
    console.error("API Error:", status);

    if (status === 429) {
      console.warn("Rate limit reached. Please wait and try again later.");
    } else if (status === 401) {
      console.warn("Unauthorized. Check your API key in the .env file.");
    }

    return null;
  }
};