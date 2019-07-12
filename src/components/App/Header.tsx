import React from 'react';

interface HeaderProps {
  eventName: string;
  eventSubheader: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header className="text-center mb-3">
      <div className="animated bounceInDown">
        <h1 className="display-4 font-weight-bold title mb-0">
          {props.eventName}️{' '}
          <img src="./assets/joystick1.png" className="logo ml-3 mb-3" alt="joystick" />
        </h1>
        <small className="text-light">{props.eventSubheader} </small>
      </div>
      <hr className="title-bar" />
    </header>
  );
};

export default Header;
