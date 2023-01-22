import React, { useState, useEffect, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import styles from './layout.module.css';
import OnlineCard from './User/OnlineCard';
import LoggedInUser from './User/LoggedInUser';
import ContentArea from './Chat/ContentArea';
import GameListItem from './Game/gameListItem';
import AuthenticationModal from './Modals/AuthenticationModal';
import getGames from '../Api/Game/getGames';
import seedBackend from '../Api/Debug/seed';
import * as api from '../Api/Authentication/index';

const { REACT_APP_API_SERVER } = process.env;

const socket = io.connect(REACT_APP_API_SERVER);

export default function Layout() {
  const [signingIn, setSigningIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState('PaPaBl3SsS');
  const [email, setEmail] = useState('PaPaBl3SsS');
  const [loggedInUser, setLoggedInUser] = useState();
  const [jwt, setJwt] = useState();
  const [playerList, setPlayerList] = useState([]);
  const [gameList, setGameList] = useState([]);

  const [currentGame, setCurrentGame] = useState();

  const switchRooms = (game) => {
    const prevGame = currentGame.name;
    if (currentGame.id === game.id) {
      return;
    }
    socket.emit('leave', { game: prevGame, user: username });
    setCurrentGame(game);
    socket.emit('join', { game: game.name, user: username });
  };

  useEffect(() => {
    const debugPlayers = [
      {
        id: '1',
        username: 'wuddy',
        profileUrl: 'https://appamatix.com/wp-content/uploads/2016/05/04-450x427.jpg',
        isOnline: true,
      },
      {
        id: '2',
        username: 'ye',
        profileUrl: 'https://1fid.com/wp-content/uploads/2022/07/funny-profile-pic-9.jpg',
        isOnline: false,
      },
      {
        id: '3',
        username: 'kash',
        profileUrl: 'https://i.pinimg.com/736x/f6/64/d2/f664d2e17e2e6649ddf66c12a7c7c84c.jpg',
        isOnline: true,
      },
      {
        id: '4',
        username: 'huahua',
        profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPS8h-UPnSt4aC84WsbaWBVWabuqR_UDQ3FzuW_kHs6slDy0BFjAhSUGe2_SoXla2cyNY&usqp=CAU',
        isOnline: true,
      },
      {
        id: '5',
        username: 'milton',
        profileUrl: 'https://i.pinimg.com/550x/6b/95/01/6b9501905d858837e8258c474c1f99c5.jpg',
        isOnline: false,
      },
    ];
    setPlayerList(debugPlayers);
  }, []);

  const loginHelper = useCallback((token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const loginUser = {
        profileUrl: 'https://i.natgeofe.com/k/e094f0a9-3cb3-40c3-afaf-314b6437ef14/ww-funny-animal-faces-goat_3x2.jpg',
        ...decoded,
      };
      setLoggedInUser(loginUser);
      getGames()
        .then((games) => {
          if (games && games.length > 0) {
            setGameList(games);
            setCurrentGame(games[0]);
          }
        });
    }
  }, []);

  useEffect(() => {
    loginHelper(jwt);
  }, [jwt, loginHelper]);

  useEffect(() => {
    // Check for existing login token
    const token = Cookies.get('token');
    setJwt(token);
    // loginHelper(token);
  }, []);

  const seedHandler = () => {
    seedBackend();
    window.location.reload(0);
  };

  const logoutHandler = () => {
    setCurrentGame(null);
    setGameList([]);
    setLoggedInUser(null);
    setSigningIn(false);
    Cookies.remove('token');
  };

  const modalHandler = (userSigningIn = false) => {
    setSigningIn(userSigningIn);
    setModalOpen(!modalOpen);
  };

  const modalHideHandler = () => {
    setModalOpen(!modalOpen);
  };

  const loginHandler = async () => {
    const creds = {
      username,
      email,
      password,
    };
    let token;
    if (signingIn) {
      const { token: signInToken } = await api.signIn(creds);
      token = signInToken;
    } else {
      const { token: signUpToken } = await api.signUp(creds);
      token = signUpToken;
    }
    setJwt(token);
    // loginHelper(token);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1>BLAME GAME</h1>
        </div>
        <div className={styles.credentials}>
          {
            loggedInUser
              ? <LoggedInUser user={loggedInUser} logoutHandler={logoutHandler} />
              : (
                <div>
                  <button type="button" onClick={seedHandler}>Re-Seed</button>
                  <button type="button" onClick={() => modalHandler(true)}>Sign in</button>
                  <button type="button" onClick={() => modalHandler(false)}>Sign up</button>
                  <AuthenticationModal
                    closeModal={modalHideHandler}
                    loggingIn={modalOpen}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setEmail={setEmail}
                    login={loginHandler}
                  />
                </div>
              )
          }
        </div>
      </div>
      <div className={styles.menuContentContainer}>
        <div className={styles.menu}>
          <div className={styles.games}>
            <h5>games</h5>
            <div className={styles.gamesContainer}>
              <ul>
                {
                  gameList.map((game) => (
                    <GameListItem
                      key={game.id}
                      game={game}
                      isCurrentGame={currentGame && game.name === currentGame.name}
                      switchRooms={switchRooms}
                    />
                  ))
                }
              </ul>
            </div>
          </div>
          <div className={styles.online}>
            <h5>online</h5>
            <div className={styles.onlineCardContainer}>
              {
                playerList.map((player) => (
                  <OnlineCard
                    key={player.id}
                    name={player.username}
                    img={player.profileUrl}
                    isOnline={player.isOnline}
                  />
                ))
              }
            </div>
          </div>
          <div className={styles.loggedInUser}>
            { loggedInUser
              ? (
                <OnlineCard
                  name={loggedInUser.username}
                  img={loggedInUser.profileUrl}
                  isOnline
                  isCurrentUser
                />
              )
              : <div />}
          </div>
        </div>

        <div className={styles.content}>
          {
            currentGame
              ? <ContentArea currentGame={currentGame} username={username} socket={socket} />
              : <h3>Please sign up/in</h3>
          }
        </div>
      </div>
    </div>
  );
}
