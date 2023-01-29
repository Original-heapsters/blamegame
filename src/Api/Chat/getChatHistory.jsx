import axios from 'axios';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;

export default function getChatHistory(gameName) {
  const apiServer = REACT_APP_TEST_LOCAL === 'true' ? REACT_APP_API_SERVER_LOCAL : REACT_APP_API_SERVER;
  return axios.get(`${apiServer}/game/${gameName}/chat`)
    .then(({ data }) => data);
}
