import axios from "axios";

export const generateImage = async(dText) => {
  const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/image/generation",
  headers: {
    authorization: `Bearer ${process.env.API_KEY}`,
  },
  data: {
    providers: "openai",
    text: dText,
    resolution: "1024x1024",
    fallback_providers: "",
  },
};
try {
  const response = await axios.request(options);
  return response.data;
} catch (error) {
  console.error(error);
  throw error;
}
};