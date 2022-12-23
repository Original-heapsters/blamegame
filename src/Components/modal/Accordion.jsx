import React, { useState } from 'react';
import styles from './accordion.module.css';

function Accordion({ title, content }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.accordion_item}>
      <div role="button" tabIndex={0} className={styles.accordion_title} onClick={() => setIsActive(!isActive)} aria-hidden="true">
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className={styles.accordion_content}>{content}</div>}
    </div>
  );
}

export default Accordion;
