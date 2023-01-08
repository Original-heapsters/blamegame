import React, { useEffect, useState } from 'react';
import RuleDisplay from './RuleDisplay';
import Accordion from '../modal/Accordion';
import getRuleset from '../../Api/Game/getRuleset';

function Ruleset({
  game,
}) {
  const [loadingRules, setLoadingRules] = useState(true);
  const [rules, setRules] = useState();

  useEffect(() => {
    getRuleset(game.name)
      .then((gameRules) => {
        setRules(gameRules);
        setLoadingRules(false);
      });
  }, [game.name]);

  return (
    <div>
      { loadingRules
        ? <h3>Loading...</h3>
        : Object.keys(rules).map((rule) => {
          const ruleConsequence = rules[rule];
          return (
            <Accordion title={rule} content={<RuleDisplay ruleConsequence={ruleConsequence} />} />
          );
        })}
    </div>
  );
}

export default Ruleset;
