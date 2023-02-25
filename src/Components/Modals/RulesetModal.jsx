import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import getRuleset from '../../Api/Game/getRuleset';

function RulesetModal({ rulesetOpen, setRulesetOpen, currentGame }) {
  const [rules, setRules] = useState();

  useEffect(() => {
    if (currentGame) {
      getRuleset(currentGame.name)
        .then((gameRules) => {
          setRules(gameRules);
        });
    }
  }, [currentGame]);

  const handleClose = () => {
    setRulesetOpen(false);
  };

  const headerText = `${currentGame && currentGame.name} Rules`;

  const columns = [
    {
      field: 'id',
      headerName: 'Hook Id',
      flex: 1.25,
    },
    {
      field: 'rule',
      headerName: 'Consequence',
      type: 'number',
      flex: 1,
      editable: false,
    },
    {
      field: 'points',
      headerName: 'Pts',
      flex: 0.5,
      editable: false,
    },
    {
      field: 'cause',
      headerName: 'Cause',
      flex: 2,
      editable: false,
    },
  ];

  return (
    <Dialog open={rulesetOpen} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>{headerText}</DialogTitle>
      <DialogContent sx={{ height: '60vh' }}>
        <DataGrid
          rows={rules}
          columns={columns}
          pageSize={13}
          disableSelectionOnClick
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RulesetModal;
