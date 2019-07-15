import React from 'react';
import Disclaimer from './Disclaimer';

const Footer: React.FC = () => (
  <div>
    <div className="text-center text-white">
      <small>
        Powered by{' '}
        <a
          href="https://github.com/Lemii/ark-play"
          className="text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          ARK Play
        </a>{' '}
        | <Disclaimer />
      </small>

      <a href="https://arkcommunity.fund/" target="_blank" rel="noopener noreferrer">
        <img
          src="./assets/badge-1.svg"
          className="acf d-inline-block align-middle mt-2 mb-5"
          alt="acf"
        />
      </a>
    </div>
  </div>
);

export default Footer;
