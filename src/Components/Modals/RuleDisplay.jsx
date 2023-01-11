import React from 'react';
import styles from './ruledisplay.module.css';

function RuleDisplay({
  ruleConsequence,
}) {
  return (
    <div>
      <h4 title={ruleConsequence.cause} className={styles.rule_text}>
        {ruleConsequence.rule}
        <div title={ruleConsequence.cause} className={styles.rule_info}>
          ⓘ
        </div>
        <h4 title={ruleConsequence.cause} className={styles.rule_points}>
          {`${ruleConsequence.points} pts`}
        </h4>
      </h4>
    </div>
  );
}

export default RuleDisplay;
