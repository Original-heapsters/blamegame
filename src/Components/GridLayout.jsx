import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Header from './Header/Header';
import styles from './gridLayout.module.css';
import getGames from '../Api/Game/getGames';
import getPlayers from '../Api/Game/getPlayers';
import * as api from '../Api/Authentication/index';

export default function GridLayout() {
  const [signingIn, setSigningIn] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [jwt, setJwt] = useState();
  const [playerList, setPlayerList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [currentGame, setCurrentGame] = useState();

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
    console.log(`${jwt}${playerList}${gameList}${currentGame}`);
  };

  return (
    <Grid container className={styles.mainContainer}>
      <Grid container xs={12} className={styles.headerBlank}>
        <Header
          signingIn={signingIn}
          setSigningIn={setSigningIn}
          loggedInUser={loggedInUser}
          logoutHandler={logoutHandler}
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
          loginHandler={loginHandler}
        />
      </Grid>
      <Grid container xs={12} className={styles.bodyContainer}>
        <Grid xs={3} className={styles.sidebar}>
          <h1>sidebar</h1>
        </Grid>
        <Grid container xs={9} className={styles.interfaceContainer}>
          <Grid xs={12} className={styles.gameName}>
            <h1>Game Name</h1>
          </Grid>
          <Grid xs={12} className={styles.chatWindow}>
            <h1>chatWindow</h1>
          </Grid>
          <Grid container xs={12} className={styles.textEntryContainer}>
            <Grid xs={10} className={styles.textInput}>
              <h1>text input</h1>
            </Grid>
            <Grid xs={2} className={styles.textSubmit}>
              <h1>textSubmit</h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
