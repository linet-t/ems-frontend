import React from 'react';
import Navbar1 from './Navbar1';
import image1 from '../images/photo-1499750310107-5fef28a66643 (1) (1) (1).png';
import Footer from './Footer'; // Import Footer component

const Admin = () => {
  return (
    <div>
      <Navbar1 />
      <img src={image1} alt="Description of the image" style={{ width: '100vw', height: 'auto' }} />
      <Footer /> {/* Include Footer component */}
    </div>
  );
};

export default Admin;
