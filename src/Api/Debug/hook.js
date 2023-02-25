import axios from 'axios';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;

export default async function triggerHook(userEmail, gameName) {
  const apiServer = REACT_APP_TEST_LOCAL === 'true' ? REACT_APP_API_SERVER_LOCAL : REACT_APP_API_SERVER;
  const game = await axios.get(`${apiServer}/game/${gameName}`);
  const hooks = Object.keys(game.data.ruleset);
  const random = Math.floor(Math.random() * hooks.length);

  const postInfo = {
    playerEmail: userEmail,
    repoName: gameName,
    hookAction: hooks[random],
  };

  const resp = await axios({
    url: `${apiServer}/hooks/local`,
    data: postInfo,
    method: 'POST',
    withCredentials: true,
  });

  return resp.data;
}
