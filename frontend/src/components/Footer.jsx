import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { useTheme } from '../ThemeContext';
import { GoVerified } from "react-icons/go";


const Footer = () => {
  const { theme } = useTheme();

  const footerClasses = `py-5 bg-${theme} text-${theme === 'dark' ? 'white' : 'black'}`;
  const iconClasses = `fa-3x mb-3 text-${theme === 'dark' ? 'gray-500' : 'muted'}`;
  const devfooter = "</> by ";

  return (
    <>
      <footer className={footerClasses}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mt-0 text-${theme === 'dark' ? 'white' : 'muted'}">Contact us</h2>
              <hr className="divider my-4" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
              <FaPhone className={iconClasses} />
              <div className="text-${theme === 'dark' ? 'white' : 'black'}">(+92) 61 9210134</div>
            </div>
            <div className="col-lg-4 mr-auto text-center">
              <FaEnvelope className={iconClasses} />
              <a className="d-block" href="mailto:cs@bzu.edu.pk">cs@bzu.edu.pk</a>
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          {/* <div className={`small text-center text-${theme === 'dark' ? 'gray-400' : 'muted'}`}>
            Copyright © 2024 - Junaid Rana | <a href="https://junaidrana.vercel.app" target="_blank">Portfolio</a>
          </div> */}
          <div className={`small text-center text-${theme === 'dark' ? 'gray-400' : 'muted'}`}>
            Copyright © 2024 - CS BZU |  {devfooter} <a
              href="https://junaidrana.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Junaid Rana<GoVerified style={{ fontSize: "12px", marginLeft: "2px", color:"#03b3ff" }} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
