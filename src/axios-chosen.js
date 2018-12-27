import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://stenzo.firebaseio.com/'
});

export default instance;