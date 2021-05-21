import axios from 'axios';

const http = 'https://empresas.ioasys.com.br'
axios.defaults.timeout = 15000

const api = axios.create({
  baseURL: `${http}/`,
  timeoutErrorMessage: 'Requisição demorou mais que o esperado',
})

export { api, http };
