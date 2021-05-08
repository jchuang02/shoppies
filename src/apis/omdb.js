import axios from 'axios';
import env from "react-dotenv";

const KEY = env.API_KEY;

export default axios.create({
    baseURL: `https://www.omdbapi.com/?apikey=${KEY}`,
    params: {
        s: "",
        type: "movie",
    }
});