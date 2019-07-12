import React from 'react';
import Ticket from './Ticket';

interface SubmissionsListProps {
  claimedTickets: string[];
}

const SubmissionsList = (props: SubmissionsListProps) => (
  <div className="card mb-5">
    <div className="card-body text-center">
      <h5 className="text-center font-weight-bold">
        Claimed Tickets{' '}
        <span role="img" aria-label="Ticket">
          📜
        </span>
      </h5>

      <small className="text-muted">(Total claimed: {props.claimedTickets.length})</small>
      <hr className="w-25 mb-5" />
      {props.claimedTickets.length > 0 ? (
        props.claimedTickets.map((ticket: string) => (
          <Ticket key={ticket} number={ticket} claimed={true} active={false} />
        ))
      ) : (
        <h5 className="mb-5 text-muted">No tickets have been claimed yet.</h5>
      )}
    </div>
  </div>
);

export default SubmissionsList;
