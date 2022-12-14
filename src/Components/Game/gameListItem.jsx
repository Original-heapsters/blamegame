import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import RulesetModal from '../Modals/ruleset';
import styles from './gameListItem.module.css';
import getRuleset from '../../Api/Game/getRuleset';

export default function GameListItem({
  game,
  isCurrentGame = false,
}) {
  const [showRules, setShowRules] = useState(false);

  const ruleSetClickHandler = async () => {
    setShowRules(!showRules);
    await getRuleset(game.name);
  };

  const buttonStyle = isCurrentGame ? 'light' : 'outline-light';

  return (
    <li>
      <Button
        className={styles.gameListItem}
        variant={buttonStyle}
        onClick={ruleSetClickHandler}
      >
        {game.name}
      </Button>
      <RulesetModal showRules={showRules} closeModal={ruleSetClickHandler} gameName={game.name} />
    </li>
  );
}
