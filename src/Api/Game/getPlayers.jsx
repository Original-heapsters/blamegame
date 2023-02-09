// import axios from 'axios';

// const { REACT_APP_API_SERVER } = process.env;

export default function getPlayers(gameName) {
  const debugPlayers = [
    {
      id: '1',
      username: 'wuddy',
      profileUrl: 'https://appamatix.com/wp-content/uploads/2016/05/04-450x427.jpg',
      isOnline: true,
      gameName,
    },
    {
      id: '2',
      username: 'ye',
      profileUrl: 'https://1fid.com/wp-content/uploads/2022/07/funny-profile-pic-9.jpg',
      isOnline: false,
      gameName,
    },
    {
      id: '3',
      username: 'kash',
      profileUrl: 'https://i.pinimg.com/736x/f6/64/d2/f664d2e17e2e6649ddf66c12a7c7c84c.jpg',
      isOnline: true,
      gameName,
    },
    {
      id: '4',
      username: 'huahua',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPS8h-UPnSt4aC84WsbaWBVWabuqR_UDQ3FzuW_kHs6slDy0BFjAhSUGe2_SoXla2cyNY&usqp=CAU',
      isOnline: true,
      gameName,
    },
    {
      id: '5',
      username: 'milton',
      profileUrl: 'https://i.pinimg.com/550x/6b/95/01/6b9501905d858837e8258c474c1f99c5.jpg',
      isOnline: false,
      gameName,
    },
    {
      id: '6',
      username: 'chad',
      profileUrl: 'https://i.pinimg.com/550x/6b/95/01/6b9501905d858837e8258c474c1f99c5.jpg',
      isOnline: false,
      gameName,
    },
  ];
  return new Promise((res) => {
    res(debugPlayers);
  });

  // Commented until api is implemented
  // return axios.get(`${REACT_APP_API_SERVER}/game/${gameName}/players`)
  //   .then(({ data }) => data);
}
