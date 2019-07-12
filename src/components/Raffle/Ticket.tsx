import React from 'react';

interface TicketPropTypes {
  number: string;
  claimed: boolean;
  active: boolean;
}

const Ticket = (props: TicketPropTypes) => (
  <div
    className={`shadow card ticket d-inline-block m-2 
      ${props.claimed ? 'ticket-claimed' : 'ticket-unclaimed'} 
      ${props.active ? 'active' : ''}`}
  >
    <span className="text-light">#</span>{' '}
    <span className="text-white font-weight-bold d-inline">{props.number}</span>
  </div>
);

export default Ticket;
