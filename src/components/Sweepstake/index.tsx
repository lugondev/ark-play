import React, { useState, useEffect } from 'react';
import UserSubmission from './UserSubmission';
import Trends from './Trends';
import EventClosed from './EventClosed';
import Results from './Results';
import SubmissionsList from './SubmissionsList';

import { sweepstake } from '../../config';
import { currencies } from '../../config/constants';
import { submit } from '../../utils/general';
import { fetchCurrentValue } from '../../utils/sweepstake';
import { shouldShowResults } from '../../utils/dates';
import { ContestSubmission } from '../../interfaces/general';

interface SweepstakeProps {
  eventIsOpen: boolean;
  submissions: ContestSubmission[];
  prizePool: number;
}

const initialVal = (
  Math.floor(((sweepstake.maxAmount - sweepstake.minAmount) / 2 + sweepstake.minAmount) * 100) / 100
).toString();

const Sweepstake = (props: SweepstakeProps) => {
  const [prediction, setPrediction] = useState<string>(initialVal);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [warning, setWarning] = useState<string>('');

  const handlePredictionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { value } = e.target;
    if (value > sweepstake.maxAmount) value = sweepstake.maxAmount;
    if (value < sweepstake.minAmount) value = sweepstake.minAmount;

    setPrediction(value.toString());
  };

  const updateCurrentPrice = async (): Promise<void> => {
    const currentPrice = await fetchCurrentValue();
    setCurrentPrice(currentPrice);
  };

  const submitPrediction = (): void => {
    const previousSubmissions = props.submissions.map(sub => sub.vendorField);

    if (!previousSubmissions.includes(prediction)) {
      submit(prediction);
    } else {
      setWarning('Prediction already exist, please choose a different one.');
      setTimeout(() => {
        setWarning('');
      }, 3000);
    }
  };

  useEffect((): void => {
    updateCurrentPrice();
  }, []);

  return (
    <>
      {props.eventIsOpen && (
        <UserSubmission
          prediction={prediction}
          handlePredictionChange={handlePredictionChange}
          currentPrice={currentPrice}
          submitPrediction={submitPrediction}
          warning={warning}
          initialVal={initialVal}
        />
      )}

      {!shouldShowResults(sweepstake.dateToPredict) && !props.eventIsOpen && (
        <EventClosed dateToPredict={sweepstake.dateToPredict} />
      )}

      {shouldShowResults(sweepstake.dateToPredict) && !props.eventIsOpen && (
        <Results submissions={props.submissions} prizePool={props.prizePool} />
      )}

      <Trends submissions={props.submissions} />

      <SubmissionsList
        submissions={props.submissions}
        symbol={currencies[sweepstake.predictionCurrency]}
      />
    </>
  );
};

export default Sweepstake;
