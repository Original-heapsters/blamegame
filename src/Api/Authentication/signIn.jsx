import axios from 'axios';

const { REACT_APP_API_SERVER } = process.env;

async function signIn(postInfo) {
  const { data } = await axios({
    url: `${REACT_APP_API_SERVER}/signIn`,
    data: postInfo,
    method: 'POST',
    withCredentials: true,
  });
  return data;
}

export default signIn;
