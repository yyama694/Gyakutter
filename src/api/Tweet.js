import axios from "axios";
const url = "https://twitter-ore-j.herokuapp.com/tweet/";

export default async function getTweetById(id, maxIdStr) {
  return await axios
    .get(url + id + "/50" + "?max_id=" + maxIdStr)
    .then(function(response) {
      return response.data.reverse();
    });
}
