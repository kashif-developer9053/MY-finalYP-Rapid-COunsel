import React, { useEffect } from 'react';
import './style.css';

const LawyerCard = ({ lawyer }) => {
  console.log(lawyer)
  useEffect(() => {




    const handleMouseLeave = () => {
      const hoverElements = document.querySelectorAll('.hover');
      hoverElements.forEach(element => {
        element.classList.remove('hover');
      });
    };

    const hoverElements = document.querySelectorAll('.hover');
    hoverElements.forEach(element => {
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      hoverElements.forEach(element => {
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div>
      <figure className="snip1336">
        <img src={lawyer.picturePath} alt={lawyer.firstName} />
        <figcaption>
          <img src={lawyer.picturePath} alt={lawyer.firstName} className="profile" />
          <h2>{`${lawyer.firstName} ${lawyer.lastName}`}<span>{lawyer.occupation}</span></h2>
          <p>{lawyer.email}</p>
          <button className="follow">Learn More</button>
          <button className="info">Contact</button>
        </figcaption>
      </figure>
    </div>
  );
}

export default LawyerCard;
