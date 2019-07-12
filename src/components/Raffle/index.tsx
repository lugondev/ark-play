import React, { useState, useEffect } from 'react';
import UserSubmission from './UserSubmission';
import SubmissionsList from './SubmissionsList';

import { raffle } from '../../config';
import { ContestSubmission } from '../../interfaces/general';

interface RaffleProps {
  eventIsOpen: boolean;
  submissions: ContestSubmission[];
}

const Raffle = (props: RaffleProps) => {
  const [availableTickets, setAvailableTickets] = useState<string[]>([]);
  const [claimedTickets, setClaimedTickets] = useState<string[]>([]);

  useEffect((): void => {
    const filterSubmissions = (): void => {
      const userSubmissions = props.submissions.map(sub => sub.vendorField);
      const claimedTickets = userSubmissions.filter(sub => raffle.tickets.includes(sub));

      const availableTickets = raffle.tickets.filter(
        (ticket: string) => !claimedTickets.includes(ticket)
      );

      setClaimedTickets(claimedTickets);
      setAvailableTickets(availableTickets);
    };

    filterSubmissions();
  }, [props.submissions]);

  return (
    <>
      <UserSubmission
        submissions={props.submissions}
        availableTickets={availableTickets}
        eventIsOpen={props.eventIsOpen}
      />
      <SubmissionsList claimedTickets={claimedTickets} />
    </>
  );
};

export default Raffle;
