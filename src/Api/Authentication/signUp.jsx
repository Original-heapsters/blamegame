import axios from 'axios';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;

async function signUp(postInfo) {
  const apiServer = REACT_APP_TEST_LOCAL === 'true' ? REACT_APP_API_SERVER_LOCAL : REACT_APP_API_SERVER;
  const { data } = await axios({
    url: `${apiServer}/signUp`,
    data: postInfo,
    method: 'POST',
    withCredentials: true,
  });
  return data;
}

export default signUp;
