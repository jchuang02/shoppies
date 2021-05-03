import axios from 'axios';

const KEY = '7dfd415f';

export default axios.create({
    baseURL: `http://www.omdbapi.com/?apikey=${KEY}`,
    params: {
        s: "",
        type: "movie",
    }
});