import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://leetcode-project-yzas.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;
