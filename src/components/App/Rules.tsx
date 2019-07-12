import React from 'react';

interface RulesProps {
  rules: string[];
}

const Rules = (props: RulesProps) => (
  <div className="card h-100">
    <div className="card-body">
      <h5 className="text-center font-weight-bold">
        Rules{' '}
        <span role="img" aria-label="Police Siren">
          🚨
        </span>
      </h5>
      <hr className="w-25" />
      <ul>
        {props.rules.map((rule: string) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default Rules;
