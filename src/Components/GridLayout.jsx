import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';
import Header from './Header/Header';
import GameList from './Sidebar/GameList';
import PlayerList from './Sidebar/PlayerList';
import MessageLog from './Chat/MessageLog';
import Reply from './Chat/Reply';
import Modal from './modal/modal';
import Ruleset from './Modals/Ruleset';
import styles from './gridLayout.module.css';
import getGames from '../Api/Game/getGames';
import getPlayers from '../Api/Game/getPlayers';
import * as api from '../Api/Authentication/index';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;
const apiServer = REACT_APP_TEST_LOCAL === 'true' ? REACT_APP_API_SERVER_LOCAL : REACT_APP_API_SERVER;

const socket = io.connect(apiServer);
const cookies = new Cookies();

export default function GridLayout() {
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState();
  const [jwt, setJwt] = useState();
  const [playerList, setPlayerList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [currentGame, setCurrentGame] = useState();

  useEffect(() => {
    // Check for existing login token
    const token = cookies.get('authToken');
    if (token) {
      setJwt(token);
    }
  }, []);

  useEffect(() => {
    if (jwt) {
      const decoded = jwtDecode(jwt);
      const expirationDate = new Date();

      // (Just change 7 for the number of days you want to let this cookie exist)
      expirationDate.setDate(expirationDate.getDate() + 7);
      cookies.set('authToken', jwt, { expires: expirationDate });
      const loginUser = {
        profileUrl: decoded.profileUrl || 'https://i.natgeofe.com/k/e094f0a9-3cb3-40c3-afaf-314b6437ef14/ww-funny-animal-faces-goat_3x2.jpg',
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

  const loginHandler = async (auth, isSigningIn) => {
    let token;
    if (isSigningIn) {
      const { token: signInToken } = await api.signIn(auth);
      token = signInToken;
    } else {
      const { token: signUpToken } = await api.signUp(auth);
      token = signUpToken;
    }
    setJwt(token);
  };

  const logoutHandler = () => {
    setGameList([]);
    setPlayerList([]);
    setLoggedInUser(null);
    cookies.remove('token');
    cookies.remove('authToken');
    setCurrentGame();
  };

  const switchRooms = (game) => {
    const prevGame = currentGame.name;
    if (currentGame.id === game.id) {
      return;
    }
    socket.emit('leave', { game: prevGame, user: loggedInUser.username, profileUrl: loggedInUser.profileUrl });
    setCurrentGame(game);
    socket.emit('join', { game: game.name, user: loggedInUser.username, profileUrl: loggedInUser.profileUrl });
  };

  const modalOpenHandler = () => {
    setModalOpen(!modalOpen);
  };

  const sendMessage = useCallback(() => {
    if (currentGame && message !== '' && loggedInUser) {
      socket.emit('chatMessage', {
        game: currentGame.name,
        user: loggedInUser.username,
        profileUrl: loggedInUser.profileUrl,
        msg: message,
      });
    }
  }, [message, currentGame, loggedInUser]);

  return (
    <Grid container className={styles.mainContainer}>
      <Grid container xs={12} className={styles.headerBlank}>
        <Header
          xs={12}
          loggedInUser={loggedInUser}
          logoutHandler={logoutHandler}
          loginHandler={loginHandler}
        />
      </Grid>
      <Grid container xs={12} className={styles.bodyContainer}>
        <Grid xs={3} className={styles.sidebar}>
          <GameList
            className={styles.gameList}
            gameList={gameList}
            currentGame={currentGame}
            switchRooms={switchRooms}
          />
          <PlayerList playerList={playerList} loggedInUser={loggedInUser} />
        </Grid>
        <Grid container xs={9} className={styles.interfaceContainer}>
          <Grid xs={12} className={styles.gameName}>
            {
              currentGame
                ? <Button onClick={modalOpenHandler}>{currentGame.name}</Button>
                : <Button>General</Button>
            }
            <Modal open={modalOpen} onClose={modalOpenHandler} currentGame={currentGame}>
              <Ruleset game={currentGame} />
            </Modal>
          </Grid>
          <Grid xs={12} className={styles.chatWindow}>
            <MessageLog currentGame={currentGame} socket={socket} />
          </Grid>
          <Grid container xs={12} className={styles.textEntryContainer}>
            <Grid xs={10} className={styles.textInput}>
              <Reply
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </Grid>
            <Grid xs={2} className={styles.textSubmit}>
              <Button variant="contained" className={styles.btnSubmit} onClick={sendMessage}>submit</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
