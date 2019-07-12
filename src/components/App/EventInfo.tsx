import React from 'react';

import { network, event } from '../../config';
import { cryptos } from '../../config/constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

interface EventInfoProps {
  eventIsOpen: boolean;
  deadline: string;
  prizePool: number;
  participants: number;
}

const EventInfo = (props: EventInfoProps) => (
  <div className="card h-100 ">
    <div className="card-body">
      <h5 className="text-center font-weight-bold">
        Event info{' '}
        <span role="img" aria-label="Crystal Ball">
          🔮
        </span>
      </h5>
      <hr className="w-25" />
      <div className="row">
        <div className="col-5">Type:</div>
        <div className="col-7">
          <span className="accentuated font-weight-bold text-capitalize">{event.type}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-5">Current prize pool:</div>
        <div className="col-7">
          <a
            href={`${network.explorer}/wallets/${event.address}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="accentuated font-weight-bold ">
              {props.prizePool} {cryptos[network.coin]}
            </span>
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-5">Number of participants:</div>
        <div className="col-7">
          <span className="accentuated font-weight-bold">{props.participants}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-5">Contest closes in:</div>
        <div className="col-7">
          <span className="accentuated font-weight-bold">{props.deadline}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-5">Status:</div>
        <div className="col-7">
          <span className="accentuated font-weight-bold">
            {props.eventIsOpen ? (
              <>
                Open <FontAwesomeIcon className="text-success ml-1" icon={faCircle} />
              </>
            ) : (
              <>
                Closed <FontAwesomeIcon className="text-danger ml-1" icon={faCircle} />
              </>
            )}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-5">Network:</div>
        <div className="col-7">
          <span className="accentuated font-weight-bold text-capitalize">{network.coin}</span>
        </div>
      </div>
    </div>
  </div>
);

export default EventInfo;
