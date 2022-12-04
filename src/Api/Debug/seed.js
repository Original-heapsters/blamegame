import axios from 'axios';

const { REACT_APP_API_SERVER } = process.env;

export default function seedBackend() {
  return axios.get(`${REACT_APP_API_SERVER}/debug/seed`)
    .then(({ data }) => data);
}
