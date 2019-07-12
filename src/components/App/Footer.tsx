import React from 'react';
import Disclaimer from './Disclaimer';

const Footer: React.FC = () => (
  <div>
    <div className="text-center text-white">
      <small>
        Made by delegate Lemii | <Disclaimer />
      </small>
      <a href="https://arkcommunity.fund/" target="_blank" rel="noopener noreferrer">
        <img src="./assets/badge-1.svg" className="acf align-middle mt-2 mb-5" alt="acf" />
      </a>
    </div>
  </div>
);

export default Footer;
