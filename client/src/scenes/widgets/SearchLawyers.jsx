// SearchLawyers.js
import { TextField, Button, Typography } from '@mui/material';

import React, { useState, useEffect } from 'react';

const SearchLawyers = () => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3001/search/getlawyers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      // ... rest of the code
    } catch (error) {
      console.error('Error in handleSearch:', error);
    }
  };

  useEffect(() => {
    if (query.trim() !== '') {
      handleSearch();
    }
  }, [query, handleSearch]); // Include handleSearch in the dependency array

  return (
    <div>
      <TextField
        label="Search Lawyers"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <div>
        {results.map((lawyer) => (
          <Typography key={lawyer._id}>{`${lawyer.firstName} ${lawyer.lastName}`}</Typography>
          // Add more details based on the lawyer object
        ))}
      </div>
    </div>
  );
};

export default SearchLawyers;
