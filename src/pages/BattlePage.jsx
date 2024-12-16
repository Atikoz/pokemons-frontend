import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Button, Container, Card } from '@mui/material';
import { useWebSocket } from '../hooks/useWebSocket.js'
import Navbar from '../ui/Navbar.jsx';
import { useLocation } from 'react-router-dom';
import Loader from '../ui/Loader.jsx';
import CardItem from '../components/CardItem.jsx';
import errorNotify from '../notify/errorNotify.js';
import doneNotify from '../notify/doneNotify.js';
import { Bounce, ToastContainer } from 'react-toastify';
import { useAccessToken } from '../hooks/useAccessToken.js';

const webSocketUrl = 'http://192.168.8.2:5000';

function BattlePage() {
  const [ws, isConnected, error] = useWebSocket(webSocketUrl);
  const [battleState, setBattleState] = useState(null);
  const [computerHp, setComputerHp] = useState(0);
  const [playerHp, setPlayerHp] = useState(0);
  const [logs, setLogs] = useState([]);
  const [disable, setDisable] = useState(true);
  const [accessToken] = useAccessToken();

  const location = useLocation();
  const { selectedPokemon } = location.state || {};

  useEffect(() => {
    if (ws && isConnected && selectedPokemon) {
      const message = {
        action: 'START_BATTLE',
        payload: {
          playerPokemonId: selectedPokemon.id,
        },
      };

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not open yet!');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws, isConnected])

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);

        switch (data.action) {
          case 'BATTLE_STARTED':
            setBattleState(data.payload);
            setComputerHp(data.payload.computer.base.HP)
            setPlayerHp(data.payload.player.base.HP)
            setLogs(data.payload.logs)

            if (data.payload.turn === 'player') setDisable(false)
            break;

          case 'BATTLE_UPDATE':
            setBattleState(data.payload);
            setLogs(data.payload.logs);

            if (data.payload.turn === 'player') setDisable(false)

            if (data.payload.attacker === 'player') {
              setComputerHp(data.payload.remainingHP)
            } else {
              setPlayerHp(data.payload.remainingHP)
            }
            break;

          case 'GAME_END':
            setLogs(data.payload.logs);
            setComputerHp(data.payload.computerHP);
            setPlayerHp(data.payload.playerHP);

            if (data.payload.winner === 'player') {
              doneNotify('You win!', 3000);
            } else {
              errorNotify('You loss!', 3000)
            }

            const message = {
              action: 'BATTLE_FINISH',
              payload: {
                accessToken,
                winner: data.payload.winner,
                playerPokemon: data.payload.playerPockemon,
                computerPokemon: data.payload.computerPockemon,
                logs: data.payload.logs
              }
            };

            ws.send(JSON.stringify(message))
            break

          default:
            break;
        }
      };
    }
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
        console.log('WebSocket закрито при розмонтуванні компонента.');
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  useEffect(() => {
    console.log(battleState)
  }, [battleState])

  const handleAttack = () => {
    setDisable(true)
    const message = {
      action: 'PLAYER_ATTACK'
    };

    ws.send(JSON.stringify(message));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        {isConnected ? (
          <>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Battle Started
            </Typography>
            {battleState ? (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Computer
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      HP: {computerHp.toFixed(2)}
                    </Typography>
                    <CardItem pokemon={battleState.computer} />
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Player
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      HP: {playerHp.toFixed(2)}
                    </Typography>
                    <CardItem pokemon={battleState.player} />
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={handleAttack}
                      disabled={disable}
                    >
                      ATTACK
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Card elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Battle Logs
                    </Typography>
                    <Box sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
                      {logs.map((log, index) => (
                        <Typography key={index} variant="body2">
                          {log}
                        </Typography>
                      ))}
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <Box textAlign="center">
                <Typography variant="h6">Loading battle...</Typography>
                <Loader />
              </Box>
            )}
          </>
        ) : error ? (
          <Typography color="error" variant="h6">
            Error: {error.message}
          </Typography>
        ) : (
          <Box textAlign="center">
            <Typography variant="h6">Connecting to server...</Typography>
            <Loader />
          </Box>
        )}
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Box>
  );
}

export default BattlePage