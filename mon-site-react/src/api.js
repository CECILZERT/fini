import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || '';
const api = axios.create({
  baseURL: BASE ? `${BASE}/api` : ''
});

export default api;

