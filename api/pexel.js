import axios from "axios";

export const getImage = async(searchTerm = 'Programming') => 
    await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
        headers: {
            Authorization: '0XweRWjRCi7TTGE4p5nXtvOT9Xso4jj74uN9362ci4a47RwWsW8rOl50'
        }
    });

    