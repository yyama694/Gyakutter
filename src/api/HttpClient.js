import axios from "axios";

export default async function getHttpContents(url) {
  return await axios.get(url, {}).then(function(response) {
    return response;
  });
}
