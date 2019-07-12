import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import SubmitButton from '../Generic/SubmitButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { raffle } from '../../config';
import { submit } from '../../utils/general';
import { shuffle } from '../../utils/raffle';
import { ContestSubmission } from '../../interfaces/general';

interface UserSubmissionPropTypes {
  availableTickets: string[];
  submissions: ContestSubmission[];
  eventIsOpen: boolean;
}

const UserSubmission = (props: UserSubmissionPropTypes) => {
  const [displayTickets, setDisplayTickets] = useState<string[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<string>('');

  const shuffleDisplayTickets = (): void => {
    setSelectedTicket('');

    const numOfTickets = props.availableTickets.length;
    const shuffledTickets = shuffle(props.availableTickets);

    setDisplayTickets(
      numOfTickets > raffle.displayTickets
        ? shuffledTickets.slice(0, raffle.displayTickets)
        : shuffledTickets
    );
  };

  const submitPrediction = (): void => {
    submit(selectedTicket);
  };

  useEffect(() => {
    shuffleDisplayTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.availableTickets]);

  return (
    <>
      <div className="card mb-5 shadow">
        <div className="card-body text-center">
          <h5 className="text-center font-weight-bold">
            Claim your ticket!{' '}
            <span role="img" aria-label="Rocket">
              🚀
            </span>
          </h5>
          <small className="text-muted">(Total available: {props.availableTickets.length})</small>
          <hr className="w-25 mb-5" />
          {props.availableTickets.length > 0 && props.eventIsOpen && (
            <div className="row">
              <div className="col-md-12 col-lg-6 mb-5">
                {props.availableTickets.length > 0 &&
                  displayTickets.map((ticket: string) => (
                    <div
                      key={ticket}
                      className="d-inline-block"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <Ticket number={ticket} claimed={false} active={ticket === selectedTicket} />
                    </div>
                  ))}
                <br />
                <span className="pointer text-secondary" onClick={shuffleDisplayTickets}>
                  <FontAwesomeIcon className="mt-3" icon={faSyncAlt} size="2x" />
                  <small className="text-muted d-block mt-1">Shuffle</small>
                </span>
              </div>
              <div className="col-md-12 col-lg-6 mb-3">
                <div className="text-center">
                  Your ticket:
                  <div className="mb-5">
                    {props.availableTickets.includes(selectedTicket) ? (
                      <>
                        <h1 className="display-3 font-weight-bold animated flash fast mb-4">
                          <span className="text-muted">#</span> {selectedTicket}
                        </h1>
                        <SubmitButton
                          submitPrediction={submitPrediction}
                          submission={selectedTicket}
                        />
                      </>
                    ) : (
                      <h1 className="font-weight-bold animated pulse infinite">Pick one!</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {props.availableTickets.length === 0 && (
            <h1 className="mb-5">All tickets are claimed!</h1>
          )}
          {!props.eventIsOpen && <h1 className="mb-5">Event deadline has passed!</h1>}
        </div>
      </div>
    </>
  );
};

export default UserSubmission;
