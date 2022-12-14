import axios from 'axios';

const { REACT_APP_API_SERVER } = process.env;

export default function getRuleset(gameName) {
  return axios.get(`${REACT_APP_API_SERVER}/game/${gameName}`)
    .then(({ data }) => data)
    .then(({ ruleset }) => ruleset);
}
