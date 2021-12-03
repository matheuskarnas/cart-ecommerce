import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const callApi = async (parms : string) => {
  api.get(`/${parms}`)
  .then(data => console.log(data))
}

