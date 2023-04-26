import axios from 'axios';

const apiURLs = {
  development: 'https://api.github.com/',
  production: 'https://brainy-top-hat-bear.cyclic.app',
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

export { api };
