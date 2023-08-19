import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li><a href="https://www.linkedin.com/in/bryant-stine-447010272/" target="_blank">LinkedIn</a></li>
            <li><a href="https://github.com/ThatGuyNamedBry/IMCritic" target="_blank">Project Github Repo</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-text">
        &copy; {new Date().getFullYear()} IMCritic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
