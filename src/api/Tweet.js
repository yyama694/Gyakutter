import axios from "axios";
const url = "https://twitter-ore-j.herokuapp.com/tweet/";

export default async function getTweetById(id) {
  return await axios
    .get(url + id + "/50")
    .then(function(response) {
      return response.data.reverse();
    });
}
