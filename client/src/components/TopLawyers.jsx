import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import LawyerCard from './LawyerCard'; // Assuming you have a LawyerCard component to display lawyer details

const TopLawyers = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/lawyers/top');
        setLawyers(response.data);
      } catch (error) {
        console.error('Error fetching top lawyers:', error);
      }
    };

    fetchLawyers();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Top Lawyers
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {lawyers.map(lawyer => (
          <LawyerCard key={lawyer._id} lawyer={lawyer} />
        ))}
      </Box>
      <Button variant="contained" color="primary">
        Contact Us
      </Button>
    </Box>
  );
};

export default TopLawyers;
