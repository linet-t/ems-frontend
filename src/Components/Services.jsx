import React from 'react';
import image2 from '../images/Embedded System.jpg';
import image3 from '../images/Simulation.jpg';
import image4 from '../images/Chip modifiers.jpg';
import image5 from '../images/consulting1 (1).jpg';

import './Services.css'
const Services = () => {
  return (
    <div>

    <div>
      <h1 className='head'>OUR SERVICES</h1>
      <br />
      <p className='txt'>At IEC (Innovative Electronics Corporation), we are driven by a relentless passion for innovation and excellence in the field of electronics. With a rich history of pioneering advancements and a forward-thinking approach, we stand at the forefront of technological evolution. Our dedicated team of experts is committed to delivering unparalleled solutions that redefine the boundaries of possibility. From crafting state-of-the-art embedded systems to providing strategic consulting services that navigate the complexities of the industry, we are your trusted partner in realizing your vision. With a focus on quality, reliability, and customer satisfaction, we strive to exceed expectations and leave a lasting impact on the world. Join us on our journey of innovation, and together, let's shape a future powered by cutting-edge electronics.</p>
    <div style={{ backgroundColor: '#f5f5f5' }}> {/* Added a container div with a grey background */}
      <div className="container py-5"> {/* Wrapped the cards inside a container */}
      <div className="row row-cols-1 row-cols-md-4 g-4">
        <div className="col">
          <div className="card border-gray">
            <br />
            <img src={image2} className="img-fluid mx-auto d-block" alt="..." style={{ width: '200px', height: 'auto' }}/>
            <div className="card-body">
              <h5 className="card-title">Embedded Services</h5>
              </div>
              <p className="card-text" style={{ textAlign: 'justify', fontFamily: 'Times New Roman' }}> Developing embedded systems for various applications, such as IoT devices, wearable technology, automotive electronics, and industrial automation.
</p>
              <br />
            
          </div>
        </div>
        <div className="col">
          <div className="card border-gray">
            <br />
            <img src={image5} className="img-fluid mx-auto d-block" alt="..." style={{ width: '200px', height: 'auto' }}/>
            <div className="card-body">
              <h5 className="card-title">Consulting</h5>
              </div>
              <p className="card-text" style={{ textAlign: 'justify', fontFamily: 'Times New Roman' }}> Providing consulting and advisory services on technology trends, regulatory compliance, standards, and best practices in the electronics industry.

</p>
              <br />
            
          </div>
        </div>
        <div className="col">
          <div className="card border-gray">
            <br />
            <img src={image3} className="img-fluid mx-auto d-block" alt="..." style={{ width: '200px', height: 'auto' }}/>
            <div className="card-body">
              <h5 className="card-title">Product Design</h5>
              </div>
 <p className="card-text" style={{ textAlign: 'justify', fontFamily: 'Times New Roman' }}>Offering expertise in designing and developing electronic products from concept to prototype, including hardware and software development.
</p><br />
            </div>
        </div>
        <div className="col">
          <div className="card border-gray">
            <br />
            <img src={image4} className="img-fluid mx-auto d-block" alt="..." style={{ width: '200px', height: 'auto' }}/>
            <div className="card-body">
              <h5 className="card-title">Electronics Solutions</h5>
              </div>
              <p className="card-text" style={{ textAlign: 'justify', fontFamily: 'Times New Roman' }}>Tailoring electronic solutions to meet specific customer requirements, including custom circuit design, firmware development, and system integration.
</p>
        <br />      
           
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Services;