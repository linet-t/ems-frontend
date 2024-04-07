
import React from 'react';
import Navbar2 from './Navbar2';

import Footer from './Footer'; // Import Footer component
import Section1 from './Section1';

const Admin = () => {
  return (
    <div className='row'>
      <Navbar2 />
      <div className="col-3 col-md-3"><Section1/></div>
      <div className="col-9 col-md-9">
        
      </div>
      <Footer /> {/* Include Footer component */}
    </div>
  );
};

export default Admin;
