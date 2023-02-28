import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33993020-4283f84b424eee68d8095b48f';

async function fetchImages(searchQuery, page, perPage) {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
    return response;
}

export { fetchImages };