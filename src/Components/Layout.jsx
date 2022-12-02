import React, { useState } from 'react';
import styles from './layout.module.css';
import OnlineCard from './OnlineCard';
import ContentArea from './Chat/ContentArea';
import AuthenticationModal from './Modals/AuthenticationModal';
import Header from './Modals/Header';

export default function Layout() {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('PaPaBl3SsS');
  const [password, setPassword] = useState('PaPaBl3SsS');
  const [email, setEmail] = useState('PaPaBl3SsS');

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
                <li>blame game</li>
                <li>pin the tail on dev</li>
                <li>whos there</li>
                <li>tic tac drink</li>
                <li>truth or dare </li>
                <li>blame game</li>
              </ul>
            </div>
          </div>
          <div className={styles.online}>
            <h5>online</h5>
            <div className={styles.onlineCardContainer}>
              <OnlineCard
                img="https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2022/06/linkedin-headshot-photography-examples-3-1.jpg"
                name="michael look"
              />
              <OnlineCard
                img="https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2022/06/linkedin-headshot-photography-examples-6-1.jpg"
              />
              <OnlineCard
                img="https://upload.wikimedia.org/wikipedia/commons/f/fe/Michelle_Borromeo_Actor_Headshots_30.jpg"
              />
              <OnlineCard />
              <OnlineCard />
              <OnlineCard />
              <OnlineCard />
              <OnlineCard />
            </div>
          </div>
          <div className={styles.user}>rotciv93</div>
        </div>
        <div className={styles.content}>
          <ContentArea />
        </div>
      </div>
    </div>
  );
}
