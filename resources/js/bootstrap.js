// resources/js/bootstrap.js ou main.js
import axios from 'axios';

axios.defaults.withCredentials = true; // envia cookies
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
