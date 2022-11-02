import axios from 'axios';

async function signIn(postInfo) {
  const { data } = await axios({
    url: `${process.env.REACT_APP_LOCAL}Api/Authentication/signUp`,
    data: postInfo,
    method: 'POST',
  });
}

export default signIn;
