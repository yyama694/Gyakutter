import axios from 'axios' 
const url="https://twitter-ore-j.herokuapp.com/tweet/"

export default function getTweetById(id) {
    axios.get(url + 'yyama694/10')
    .then(
        function (response) {
            return response.data;
        }
    )
}