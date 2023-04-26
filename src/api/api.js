import axios from 'axios';

const apiURLs = {
  development: 'https://api.github.com/',
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

export { api };
