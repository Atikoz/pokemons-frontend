import React, { useState } from 'react'
import { Card, CardContent, Typography, Box, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function BattleHistoryItem({ objHistory }) {
  const [expanded, setExpanded] = useState(false);

  console.log(objHistory)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {objHistory.pokemonPlayer} vs {objHistory.pokemonComputer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Player:</strong> {objHistory.user}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Winner:</strong> {objHistory.winner === 'computer' ? 'Computer' : 'Player'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Date:</strong> {new Date(objHistory.data).toLocaleString()}
        </Typography>

        <Box sx={{ marginTop: 1 }}>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Logs:
            </Typography>
            <ul>
              {objHistory.logs.map((log, index) => (
                <li key={index}>
                  <Typography variant="body2">{log}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}
