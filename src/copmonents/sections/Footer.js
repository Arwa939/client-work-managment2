import React from 'react';
import zak from '../assets/profile1.jpeg';
import gh from '../assets/profile2.png';
import arwa from '../assets/profile3.png';
import insta from '../assets/instagram.png';
import face from '../assets/facebook.png';
import twitter from '../assets/twitter.png';


const Footer = () => {
  return (
    <div>
      <div className="container-fluid my-5">
        <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: '#ECEFF1' }}>
          <section className="d-flex justify-content-between p-4 text-white" style={{ backgroundColor: '#1f4f5a' }}>
            <div className="me-5">
              <span>Work Management System</span>
            </div>
            <div>
              <a href="#" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </section>

          <section>
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Company Developers</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <div class="row">
                        <div class="col-md-3">
                            <div class="d-flex">
                                <div class="text-center me-5">
                                    <img src={zak} alt="John Doe" class="rounded-circle" width="50px" height="50px"/>
                                    <p style={{ fontSize:"11px" , textAlign:'center' ,marginTop:'5px'}}><strong>Zakariya
                                    Front-end Developer</strong></p>
                                </div>
                                <div class="text-center me-5">
                                    <img src={gh} alt="Jane Smith" class="rounded-circle" width="50px" height="50px"/>
                                    <p style={{ fontSize:"11px" , textAlign:'center' ,marginTop:'5px'}}><strong>AlGhaliya
                                    Database Designer</strong></p>
                                </div>
                                <div class="text-center">
                                    <img src={arwa} alt="Sam Wilson" class="rounded-circle" width="50px" height="50px"/>
                                    <p style={{ fontSize:"11px" , textAlign:'center' ,marginTop:'5px'}}><strong>Arwa
                                    Back-end Developer</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">References</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p><a href="https://getbootstrap.com/" className="text-dark">Bootstrap Docs</a></p>
                  <p><a href="https://developer.mozilla.org/" className="text-dark">MDN Web Docs</a></p>
                  <p><a href="https://www.geeksforgeeks.org/reactjs-reactstrap/" className="text-dark">React Docs</a></p>
                  <p><a href="https://www.uxpin.com/studio/blog/user-interface-elements-every-designer-should-know/" className="text-dark">Studio PinUX</a></p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Media</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p className="text-dark"><img src={insta} alt="insta" class="rounded-circle" width="15px" height="15px"/>&nbsp;
                  Manag_TM</p>
                   <p className="text-dark"><img src={face} alt="facebook" class="rounded-circle" width="15px" height="15px"/>&nbsp;
                   Management Team</p>
                   <p className="text-dark"><img src={twitter} alt="twitter" class="rounded-circle" width="15px" height="15px"/>&nbsp;
                   _mang_tm</p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p><i className="fas fa-home mr-3"></i> OMAN, Muscat 0012, OM</p>
                  <p><i className="fas fa-envelope mr-3"></i> ManagementTM@gmail.com</p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2024 Copyright: ManagementTM
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
