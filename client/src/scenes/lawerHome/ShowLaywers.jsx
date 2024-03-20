import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, useTheme } from "@mui/material";

// import axios from 'axios'; // Assuming you are using axios for HTTP requests
import LawyerCard from './LawyerCard'; // Assuming you have the LawyerCard component in the same directory

const ShowLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch(); // Get dispatch function from Redux store
  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch("http://localhost:3001/lawyers/search", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json(); // Parse the response JSON
        dispatch(setLawyers(data)); // Dispatch setLawyers action with fetched data
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      }
    };

    fetchLawyers();
  }, [token, dispatch]); // Include dispatch in dependency array


  return (
    <div className='lawyers'>
         <Typography color={dark} variant="h5" fontWeight="500">
          Lawyers
        </Typography>
      {lawyers.map(lawyer => (
        <LawyerCard
        key={lawyer._id}
        lawyer={lawyer}
        />
      ))}
    </div>
  );
}

export default ShowLawyers;
