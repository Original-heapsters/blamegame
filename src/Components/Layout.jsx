import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import io from 'socket.io-client';
import styles from './layout.module.css';
import OnlineCard from './User/OnlineCard';
import ContentArea from './Chat/ContentArea';
import GameListItem from './Game/GameListItem';
import AuthSection from './Header/AuthSection';
import getGames from '../Api/Game/getGames';
import getPlayers from '../Api/Game/getPlayers';
import * as api from '../Api/Authentication/index';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;
const apiServer = REACT_APP_TEST_LOCAL === 'true' ? REACT_APP_API_SERVER_LOCAL : REACT_APP_API_SERVER;

const socket = io.connect(apiServer);

export default function Layout() {
  // ///////////////////////////////// STATE ///////////////////////////////////
  const [signingIn, setSigningIn] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [jwt, setJwt] = useState();
  const [playerList, setPlayerList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [currentGame, setCurrentGame] = useState();

  // ///////////////////////////////// EFFECTS ///////////////////////////////////
  useEffect(() => {
    // Check for existing login token
    const token = Cookies.get('token');
    setJwt(token);
  }, []);

  useEffect(() => {
    if (jwt) {
      const decoded = jwtDecode(jwt);
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
  }, [jwt]);

  useEffect(() => {
    if (currentGame) {
      getPlayers(currentGame.name)
        .then((players) => {
          setPlayerList(players);
        });
    }
  }, [currentGame]);

  // ///////////////////////////////// HANDLERS ///////////////////////////////////
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
  };

  const logoutHandler = () => {
    setGameList([]);
    setPlayerList([]);
    setLoggedInUser(null);
    setSigningIn(false);
    Cookies.remove('token');
    setCurrentGame('general');
  };

  const switchRooms = (game) => {
    const prevGame = currentGame.name;
    if (currentGame.id === game.id) {
      return;
    }
    socket.emit('leave', { game: prevGame, user: username });
    setCurrentGame(game);
    socket.emit('join', { game: game.name, user: username });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1>BLAME GAME</h1>
        </div>
        <AuthSection
          signingIn={signingIn}
          setSigningIn={setSigningIn}
          loggedInUser={loggedInUser}
          logoutHandler={logoutHandler}
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
          loginHandler={loginHandler}
        />
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
        </div>
        <div className={styles.content}>
          { loggedInUser
            ? (
              <ContentArea
                currentGame={currentGame}
                username={username}
                profileUrl={loggedInUser.profileUrl}
                socket={socket}
              />
            )
            : <div />}
        </div>
      </div>
    </div>
  );
}
