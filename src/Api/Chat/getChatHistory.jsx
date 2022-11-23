import axios from 'axios';

const { REACT_APP_API_SERVER } = process.env;

export default function getChatHistory(gameName) {
  return axios.get(`${REACT_APP_API_SERVER}/game/${gameName}/chat`)
    .then(({ data }) => data);
}
