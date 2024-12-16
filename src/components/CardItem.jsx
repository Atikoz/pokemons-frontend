import React from 'react';
import { Card, CardContent, Chip, Grid2, Typography } from '@mui/material';
const CardItem = ({ pokemon, onClick = () => {}, statusSelect = false }) => {
  const { name, base, image, type } = pokemon;

  return (
    <Card
      sx={{
        maxWidth: 250,
        margin: '16px auto',
        boxShadow: 3,
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: statusSelect ? '#d4e5fa' : '#fff',
        cursor: 'pointer'
      }}

      onClick={onClick}
    >
      <img
        src={image.hires}
        alt={name}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'contain',
          backgroundColor: '#f0f0f0'
        }}
      />

      <CardContent
        style={{
          padding: '0px 15px'
        }}>
        <Typography variant="h7" component="div" gutterBottom align="center">
          {name}
        </Typography>
        <Grid2 container spacing={1} justifyContent="center" sx={{ marginBottom: 1 }}>
          {type.map((typeName, index) => (
            <Grid2 item key={index}>
              <Chip label={typeName} color="success" variant="outlined" />
            </Grid2>
          ))}
        </Grid2>
        <Typography variant="body2" color="textSecondary" component="div">
          <strong>Base Stats:</strong>
          <ul style={{ paddingLeft: '16px', marginTop: 0 }}>
            <li>HP: {base.HP}</li>
            <li>Attack: {base.Attack}</li>
            <li>Defense: {base.Defense}</li>
            <li>Speed: {base.Speed}</li>
          </ul>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardItem;
