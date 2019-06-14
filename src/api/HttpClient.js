import axios from "axios";

export default async function getOg(url) {
  return await axios
    .get("https://twitter-ore-j.herokuapp.com/http/getog?url=" + url, {
      responseType: "text"
    })
    .then(function(response) {
      return JSON.parse(JSON.stringify(response.data).replace(/og:/g, "og_"));
    });
}
