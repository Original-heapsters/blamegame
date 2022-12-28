import axios from 'axios';

const { REACT_APP_API_SERVER } = process.env;

async function signIn(postInfo) {
  const { data } = await axios({
    url: `${REACT_APP_API_SERVER}/signUp`,
    data: postInfo,
    method: 'POST',
  });
  return data;
}

export default signIn;
