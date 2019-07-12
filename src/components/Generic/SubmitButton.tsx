import React, { useState } from 'react';
import { event } from '../../config';

interface SubmitButtonProps {
  submitPrediction: () => void;
  submission: string;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const [showManualInfo, setShowManualInfo] = useState(false);

  const toggleManualInfo = (): void => setShowManualInfo(!showManualInfo);

  return (
    <>
      <button
        onClick={props.submitPrediction}
        className="btn btn-outline-secondary font-weight-bold pl-5 pr-5 pt-3 pb-3 mb-5"
      >
        Submit
      </button>
      <small className="d-block btn-link text-secondary mb-3 pointer" onClick={toggleManualInfo}>
        Show / hide manual info
      </small>
      {showManualInfo && (
        <div className="row justify-content-center">
          <div className="card manual-info">
            <div className="card-body">
              <small className="d-block text-left">
                Recipient: <span className="font-weight-bold">{event.address}</span>
                <br />
                Amount: <span className="font-weight-bold">{event.submissionPrice}</span>
                <br />
                SmartBridge: <span className="font-weight-bold">{props.submission}</span>
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitButton;
