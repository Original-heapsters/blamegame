import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';

export default function getChatHistory(gameName) {
  return axios.get(`${SERVER_URL}/game/${gameName}/chat`)
    .then(({ data }) => data);
}
