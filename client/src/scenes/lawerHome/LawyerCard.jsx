import React, { useEffect } from 'react';
import './style.css'; // Assuming you save your CSS in a file named Card.css

const LawyerCard = () => {
  useEffect(() => {
    const handleMouseLeave = () => {
      const hoverElements = document.querySelectorAll('.hover');
      hoverElements.forEach(element => {
        element.classList.remove('hover');
      });
    };

    // Adding event listener to remove hover class on mouse leave
    const hoverElements = document.querySelectorAll('.hover');
    hoverElements.forEach(element => {
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup function to remove event listener
    return () => {
      hoverElements.forEach(element => {
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div>
      <figure className="snip1336">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87" />
        <figcaption>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg" alt="profile-sample4" className="profile" />
          <h2>Hans Down<span>Engineer</span></h2>
          <p>I'm looking for something that can deliver a 50-pound payload of snow on a small feminine target. Can you suggest something? Hello...? </p>
          <button className="follow">Learn More</button>
          <button className="info">Contact</button>
        </figcaption>
      </figure>
     
    </div>
  );
}

export default LawyerCard;
