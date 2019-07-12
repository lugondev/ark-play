import React from 'react';

interface EventIsClosedProps {
  dateToPredict: string;
}

const EventClosed = (props: EventIsClosedProps) => (
  <div className="card mb-5">
    <div className="card-body text-center">
      <h5 className="text-center font-weight-bold">
        Results{' '}
        <span role="img" aria-label="Rocket">
          🚀
        </span>
      </h5>
      <hr className="w-25" />

      <p>The submission deadline has passed and you can no longer submit your prediction.</p>
      <p>The final results will be displayed here from {props.dateToPredict}.</p>
    </div>
  </div>
);

export default EventClosed;
