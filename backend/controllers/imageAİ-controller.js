const axios = require("axios").default;
const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/image/generation",
  headers: {
    authorization: process.env.API_KEY,
  },
  data: {
    providers: "openai",
    text: "a red flying balloon.",
    resolution: "512x512",
    fallback_providers: "",
  },
};

axios
  .request(options)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });