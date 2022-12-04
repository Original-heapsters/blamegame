import axios from 'axios';

const { REACT_APP_API_SERVER } = process.env;

export default function getGames() {
  return axios.get(`${REACT_APP_API_SERVER}/games`)
    .then(({ data }) => data);
}
