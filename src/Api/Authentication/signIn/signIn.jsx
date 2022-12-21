import axios from 'axios';

const { REACT_APP_API_SERVER } = process.env;

async function signIn(username, password, email) {
  console.log(username);
  console.log(password);
  console.log(email);
  const { data } = await axios({
    url: `${REACT_APP_API_SERVER}/signIn`,
    username,
    password,
    email,
    method: 'POST',
  });
  return data;
}

export default signIn;
