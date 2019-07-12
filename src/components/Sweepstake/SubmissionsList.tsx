import React from 'react';
import { convertToDate } from '../../utils/dates';

import { ContestSubmission } from '../../interfaces/general';

interface SubmissionsListProps {
  submissions: ContestSubmission[];
}

const SubmissionsList = (props: SubmissionsListProps) => (
  <div className="card mb-5">
    <div className="card-body text-center">
      <h5 className="text-center font-weight-bold mb-5">
        Recent Submissions{' '}
        <span role="img" aria-label="Ticket">
          📜
        </span>
      </h5>

      {props.submissions.length > 0 ? (
        <table className="table table-sm table-responsive-md borderless">
          <thead>
            <tr>
              <th scope="col">Prediction</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {props.submissions.map((submission: ContestSubmission, index: number) => (
              <tr className="submission-row" key={`${submission} + ${index}`}>
                <td className="font-weight-bold">$ {submission.vendorField}</td>
                <td>{submission.sender}</td>
                <td className="no-wrap">{convertToDate(submission.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="mb-5 text-muted">No predictions have been submitted yet.</h5>
      )}
    </div>
  </div>
);

export default SubmissionsList;
