import axios from 'axios';

const api = axios.create({
  //pelo usb utilizar ip da m�quina
  baseURL: 'http://localhost:3333'
})

export default api;