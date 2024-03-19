import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you are using axios for HTTP requests
import LawyerCard from './LawyerCard'; // Assuming you have the LawyerCard component in the same directory

const ShowLawyers = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/lawyers'); // Assuming your backend API endpoint for fetching lawyers is '/api/lawyers'
        setLawyers(response.data);
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      }
    };

    fetchLawyers();
  }, []);

  return (
    <div>
      {lawyers.map(lawyer => (
        <LawyerCard
          key={lawyer._id}
          firstName={lawyer.firstName}
          lastName={lawyer.lastName}
          email={lawyer.email}
          location={lawyer.location}
          occupation={lawyer.occupation}
          picturePath={lawyer.picturePath}
        />
      ))}
    </div>
  );
}

export default ShowLawyers;
