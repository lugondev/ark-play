import React, { useState, useEffect } from 'react';

import { generateResults } from '../../utils/sweepstake';
import { SweepstakeSubmission } from '../../interfaces/sweepstake';
import { ContestSubmission } from '../../interfaces/general';
import { sweepstake, event, network } from '../../config';
import { currencies, cryptos } from '../../config/constants';

interface ResultsProps {
  submissions: ContestSubmission[];
  prizePool: number;
}

interface FinalResults {
  finalPrice: number;
  winners: SweepstakeSubmission[];
}

const Results = (props: ResultsProps) => {
  const [results, setResults] = useState<FinalResults>({
    finalPrice: 0,
    winners: []
  });
  const [error, setError] = useState<string>('');

  useEffect((): void => {
    generateResults(props.submissions)
      .then((calculatedResults: FinalResults) => {
        setResults({
          finalPrice: calculatedResults.finalPrice,
          winners: calculatedResults.winners
        });
      })
      .catch(err => {
        console.error(err);
        setError('Could not load pricing data.');
      });
  }, [props.submissions]);

  return (
    <div className="card  mb-5">
      <div className="card-body text-center">
        <h5 className="text-center font-weight-bold">
          Results{' '}
          <span role="img" aria-label="Rocket">
            🚀
          </span>
        </h5>
        <hr className="w-25" />

        {results.winners.length > 0 && (
          <>
            <div className="mb-5">
              The opening price of {sweepstake.coinToPredict} on {sweepstake.dateToPredict} was:
              <h1 className="display-3 mt-2 font-weight-bold text-secondary animated pulse infinite">
                {currencies[sweepstake.predictionCurrency]}
                {results.finalPrice.toFixed(2)}
              </h1>
              <div>
                <h5 className="mt-4 text-center font-weight-bold">
                  {event.prizes.length > 1 ? 'Winners' : 'Winner'}:
                </h5>
                <hr className="w-25" />
                <table className="mx-auto">
                  {event.prizes.map((percentage: number, index: number) => (
                    <tr className="text-left">
                      <td className="mr-5">{results.winners[index].sender}</td>
                      <td>
                        <strong className="ml-4">
                          {props.prizePool * percentage} {cryptos[network.coin]}{' '}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
            <h1 className="mb-3">
              <span role="img" aria-label="Medal">
                🏅
              </span>{' '}
              Top 10{' '}
              <span role="img" aria-label="Medal">
                🏅
              </span>
            </h1>
            <table className="table table-sm table-responsive-md borderless">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Prediction</th>
                  <th scope="col">Address</th>
                  <th scope="col">Difference</th>
                </tr>
              </thead>
              <tbody>
                {results.winners
                  .slice(0, 10)
                  .map((submission: SweepstakeSubmission, index: number) => (
                    <tr className="submission-row" key={`${submission} + ${index}`}>
                      <td># {index + 1}</td>
                      <td>
                        <span className="font-weight-bold">
                          {currencies[sweepstake.predictionCurrency]} {submission.vendorField}
                        </span>
                      </td>
                      <td>{submission.sender}</td>
                      <td>
                        Δ {currencies[sweepstake.predictionCurrency]} {submission.diff.toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}

        {error.length > 0 && (
          <div className="row justify-content-center">
            <div className="alert alert-danger w-50 mt-5 mb-5" role="alert">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
