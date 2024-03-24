import React from 'react';
import Navbar2 from './Navbar2';
import image2 from '../images/premium_photo-1667516764926-c4ac7e9a14cd.png';
import Footer from './Footer'; // Import Footer component

const Employee = () => {
  return (
    <div>
      <Navbar2 />
      <img src={image2} alt="Description of the image" style={{ width: '100vw', height: 'auto' }} />
      <Footer /> {/* Include Footer component */}
    </div>
  );
};

export default Employee;
