import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const LawyerCard = ({ lawyer }) => {
  const { name, specialization, contact } = lawyer;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {specialization}
        </Typography>
        <Button variant="outlined" color="primary" href={`tel:${contact}`}>
          Contact
        </Button>
      </CardContent>
    </Card>
  );
};

export default LawyerCard;
