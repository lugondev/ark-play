import { sweepstake } from '../config';
import { returnTimestamp } from './dates';

import { SweepstakeSubmission } from '../interfaces/sweepstake';
import { ContestSubmission } from '../interfaces/general';

const fetchCurrentValue = (): Promise<any> => {
  return fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${sweepstake.coinToPredict}&tsyms=${sweepstake.predictionCurrency}`
  )
    .then(res => res.json())
    .then(json => json[sweepstake.predictionCurrency]);
};

const fetchFinalPrice = async (): Promise<number> => {
  const ts = returnTimestamp(sweepstake.dateToPredict);

  const price = await fetch(
    `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${
      sweepstake.coinToPredict
    }&tsyms=${sweepstake.predictionCurrency}&ts=${ts - 1}`
  )
    .then(res => res.json())
    .then(json => json[sweepstake.coinToPredict][sweepstake.predictionCurrency]);

  return price;
};

const calculateDiffs = (
  finalPrice: number,
  submissions: ContestSubmission[]
): SweepstakeSubmission[] => {
  return submissions.map(sub => {
    const prediction = parseFloat(sub.vendorField);
    const diff = prediction > finalPrice ? prediction - finalPrice : finalPrice - prediction;
    return { ...sub, diff };
  });
};

const generateResults = async (
  submissions: ContestSubmission[]
): Promise<{ finalPrice: number; winners: SweepstakeSubmission[] }> => {
  const finalPrice = await fetchFinalPrice();
  const diffs = calculateDiffs(finalPrice, submissions);
  const winners = diffs.sort((a, b) => (a.diff > b.diff ? 1 : b.diff > a.diff ? -1 : 0));

  return { finalPrice, winners };
};

export { fetchFinalPrice, generateResults, fetchCurrentValue };
