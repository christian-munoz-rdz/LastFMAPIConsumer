import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'https://ws.audioscrobbler.com/2.0',
    timeout: 10000,
});

export default apiClient;