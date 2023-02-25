import axios from 'axios';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;

export default function getRuleset(gameName) {
  const apiServer = REACT_APP_TEST_LOCAL === 'true' ? REACT_APP_API_SERVER_LOCAL : REACT_APP_API_SERVER;
  return axios.get(`${apiServer}/game/${gameName}`)
    .then(({ data }) => data)
    .then(({ ruleset }) => {
      const formattedRules = Object.keys(ruleset).map((key) => ({
        id: key,
        ...ruleset[key],
      }));
      return formattedRules;
    });
}
