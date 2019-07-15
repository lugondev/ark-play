import React, { useEffect } from 'react';

import { sweepstake } from '../../config';
import { currencies } from '../../config/constants';
import { ContestSubmission } from '../../interfaces/general';

const Chart = require('chart.js');

interface TrendsProps {
  submissions: ContestSubmission[];
}

const calculateStepSize = (): number =>
  (sweepstake.maxAmount - sweepstake.chartFloor) / sweepstake.chartBars;

const determineDecimals = (num: number): number => {
  if (num < 1) return 3;
  if (num < 1000) return 2;
  return 0;
};

const generateLabels = (): string[] => {
  /* This function temporarily multiplies and divides the 
  amounts by 1000 to properly handle decimal numbers*/

  const labels: string[] = [];
  let barValue: number = sweepstake.chartFloor * 1000;

  const stepSize = calculateStepSize() * 1000;

  for (let i = 0; i < sweepstake.chartBars; i++) {
    const fromValue: number = barValue / 1000;
    const toValue: number = (barValue + stepSize - 1) / 1000;
    labels.push(
      `${currencies[sweepstake.predictionCurrency]} ${fromValue.toFixed(
        determineDecimals(fromValue)
      )} - $ ${toValue.toFixed(determineDecimals(toValue))}`
    );

    barValue += stepSize;
  }
  return labels;
};

const generateData = (submissions: ContestSubmission[]): number[] => {
  const data: number[] = [];
  const stepSize: number = calculateStepSize() * 1000;
  let valueRange: number = sweepstake.chartFloor * 1000;

  for (let i = 0; i < sweepstake.chartBars; i++) {
    const fromValue: number = valueRange;
    const toValue: number = valueRange + stepSize - 1;

    const matches = submissions.filter((sub: ContestSubmission) => {
      const input = parseFloat(sub.vendorField) * 1000;
      return input >= fromValue && input < toValue;
    });

    data.push(matches.length);
    valueRange += stepSize;
  }

  return data;
};

const generateChartInput = (submissions: ContestSubmission[]) => ({
  type: 'bar',
  data: {
    labels: generateLabels(),
    datasets: [
      {
        label: '# of Submittions',
        data: generateData(submissions),
        backgroundColor: [
          'rgba(255, 99, 132, 0.35)',
          'rgba(54, 162, 235, 0.35)',
          'rgba(255, 206, 86, 0.35)',
          'rgba(75, 192, 192, 0.35)',
          'rgba(153, 102, 255, 0.35)',
          'rgba(255, 159, 64, 0.35)',
          'rgba(255, 59, 248, 0.35)',
          'rgba(59, 219, 255, 0.35)'
        ]
      }
    ]
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          },
          gridLines: {
            drawBorder: false,
            display: false
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            display: false
          }
        }
      ]
    }
  }
});

const Trends = (props: TrendsProps) => {
  useEffect(() => {
    const ctx = document.getElementById('chartData');
    new Chart(ctx, generateChartInput(props.submissions));
  }, [props.submissions]);

  return (
    <div className="card mb-5">
      <div className="card-body text-center">
        <h5 className="text-center font-weight-bold">
          Submission Trends{' '}
          <span role="img" aria-label="Chart">
            📊
          </span>
        </h5>

        <hr className="w-25" />
        <canvas id="chartData" height="100" />
      </div>
    </div>
  );
};

export default Trends;
