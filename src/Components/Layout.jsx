import React from 'react';
import styles from './layout.module.css';
import OnlineCard from './OnlineCard';
import ContentArea from './Chat/ContentArea';

export default function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1>BLAME GAME</h1>
        </div>
        <div className={styles.credentials}>
          <button type="button">sign in</button>
          <button type="button">sign up</button>
        </div>
      </div>
      <div className={styles.menucontentcontainer}>
        <div className={styles.menu}>
          <div className={styles.games}>
            <h3>games</h3>
            <div className={styles.gamescontainer}>
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
            <h3>online</h3>
            <div className={styles.onlinecardcontainer}>
              <OnlineCard
                img="https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2022/06/linkedin-headshot-photography-examples-3-1.jpg"
                name="michael look"
                isonline={true}
              />
              <OnlineCard
                img="https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2022/06/linkedin-headshot-photography-examples-6-1.jpg"
                isonline={true}
              />
              <OnlineCard
                img="https://upload.wikimedia.org/wikipedia/commons/f/fe/Michelle_Borromeo_Actor_Headshots_30.jpg"
                isonline={false}
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
        <div className={styles.content}></div>
        <ContentArea />
      </div>
    </div>
  );
}
