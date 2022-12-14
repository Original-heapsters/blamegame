import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import OnlineCard from './User/OnlineCard';
import ContentArea from './Chat/ContentArea';
import GameListItem from './Game/gameListItem';
import AuthenticationModal from './Modals/AuthenticationModal';
import Header from './Modals/Header';
import getGames from '../Api/Game/getGames';
import seedBackend from '../Api/Debug/seed';

export default function Layout() {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('PaPaBl3SsS');
  const [password, setPassword] = useState('PaPaBl3SsS');
  const [email, setEmail] = useState('PaPaBl3SsS');
  const [loggedInUser, setLoggedInUser] = useState();
  const [playerList, setPlayerList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [currentGame, setCurrentGame] = useState();

  useEffect(() => {
    getGames()
      .then((games) => {
        setGameList(games);
        setCurrentGame(games[0]);
      });
  }, []);

  useEffect(() => {
    const debugPlayers = [
      {
        username: 'wuddy',
        profileUrl: 'https://appamatix.com/wp-content/uploads/2016/05/04-450x427.jpg',
        isOnline: true,
      },
      {
        username: 'ye',
        profileUrl: 'https://1fid.com/wp-content/uploads/2022/07/funny-profile-pic-9.jpg',
        isOnline: false,
      },
      {
        username: 'kash',
        profileUrl: 'https://i.pinimg.com/736x/f6/64/d2/f664d2e17e2e6649ddf66c12a7c7c84c.jpg',
        isOnline: true,
      },
      {
        username: 'huahua',
        profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPS8h-UPnSt4aC84WsbaWBVWabuqR_UDQ3FzuW_kHs6slDy0BFjAhSUGe2_SoXla2cyNY&usqp=CAU',
        isOnline: true,
      },
      {
        username: 'milton',
        profileUrl: 'https://i.pinimg.com/550x/6b/95/01/6b9501905d858837e8258c474c1f99c5.jpg',
        isOnline: false,
      },
    ];
    setPlayerList(debugPlayers);
  }, []);

  useEffect(() => {
    seedBackend();
  }, []);

  useEffect(() => {
    // Simulate a login
    const defaultUser = {
      username: 'testUser',
      email: 'testuser@email.com',
      profileUrl: 'https://www.shutterstock.com/image-photo/bearded-man-headshot-portrait-600w-1009304353.jpg',
    };
    setLoggedInUser(defaultUser);
  }, []);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const modalHideHandler = () => {
    setModalOpen(!modalOpen);
  };

  const usernameHandler = () => {
    setUsername(username);
  };

  const passwordHandler = () => {
    setPassword(password);
  };

  const emailHandler = () => {
    setEmail(email);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1>BLAME GAME</h1>
        </div>
        <div className={styles.credentials}>
          <button type="button" onClick={modalHandler}>sign in</button>
          <button type="button" onClick={modalHandler}>sign up</button>
          <Header />
          <AuthenticationModal
            closeModal={modalHideHandler}
            loggingIn={modalOpen}
            setUsername={usernameHandler}
            setPassword={passwordHandler}
            setEmail={emailHandler}
          />
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
                      isCurrentGame={game.name === currentGame.name}
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
        <div className={styles.content}>
          <ContentArea currentGame="wada" />
        </div>
      </div>
    </div>
  );
}
