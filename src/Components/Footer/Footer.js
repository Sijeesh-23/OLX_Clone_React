import React from 'react';

import './Footer.css';
import { useHistory } from 'react-router-dom';

function Footer() {
  const history = useHistory();
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}><span> kolkata </span></li>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}><span> Mumbai </span></li>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}><span> Mumbai </span></li>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}><span> Chennai </span></li>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}><span> Pune </span></li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}>About OLX Group</li>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}>Careers</li>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}>Contact Us</li>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}>OLXPeople</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>OLX</p>
          </div>
          <div className="list">
            <ul>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}>Help</li>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}}>Sitemap</li>
              <li onClick={() => history.push('/about')} style={{cursor:'pointer'}} >Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Other Countries Pakistan - South Africa - Indonesia</p>
        <p>Free Classifieds in India. © 2006-2021 OLX</p>
      </div>
    </div>
  );
}

export default Footer;
