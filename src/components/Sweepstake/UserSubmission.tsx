import React from 'react';
import SubmitButton from '../Generic/SubmitButton';

import { sweepstake } from '../../config';
import { currencies } from '../../config/constants';

interface UserSubmissionProps {
  prediction: any;
  handlePredictionChange: any;
  currentPrice: number;
  warning: string;
  initialVal: string;
  submitPrediction: () => void;
}

const UserSubmission = (props: UserSubmissionProps) => (
  <div className="card mb-5">
    <div className="card-body text-center">
      <h5 className="text-center font-weight-bold">
        Submit your prediction!{' '}
        <span role="img" aria-label="Rocket">
          🚀
        </span>
      </h5>
      <hr className="w-25" />
      <h1 className="display-3 font-weight-bold">
        {currencies[sweepstake.predictionCurrency]} {props.prediction}
      </h1>
      <div className="slidecontainer">
        <input
          type="range"
          defaultValue={props.initialVal}
          min={sweepstake.minAmount}
          max={sweepstake.maxAmount}
          step="0.01"
          onChange={props.handlePredictionChange}
          className="slider mb-3"
          id="myRange"
        />
      </div>
      <small className="text-muted d-block mb-5">
        Current {sweepstake.coinToPredict} price:{' '}
        {props.currentPrice
          ? `${currencies[sweepstake.predictionCurrency]} ${props.currentPrice}`
          : 'N/A'}
      </small>
      <SubmitButton submitPrediction={props.submitPrediction} submission={props.prediction} />

      {props.warning.length > 0 && (
        <div className="row justify-content-center">
          <div className="alert alert-warning w-50 mt-5 mb-5" role="alert">
            {props.warning}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default UserSubmission;
