import { event, network, raffle } from '../config';
import { dateIsValid } from './dates';

import { ContestSubmission } from '../interfaces/general';
import { apiResponse } from '../interfaces/general';

const fetchSubmissions = async (): Promise<ContestSubmission[]> => {
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'API-Version': '2' },
    body: JSON.stringify({
      recipientId: event.address,
      orderBy: 'timestamp:asc'
    })
  };

  const url = `${network.api}/transactions/search`;
  const submissions: any = [];

  const pageCount = await fetch(url, options)
    .then(res => res.json())
    .then(json => json.meta.pageCount)
    .catch(err => new Error(err));

  for (let i = 1; i <= pageCount; i++) {
    const submissionData = await fetch(`${url}?page=${i}`, options)
      .then(res => res.json())
      .then(json => json.data)
      .catch(err => new Error(err));

    submissionData.forEach((submission: apiResponse) =>
      submissions.push({
        id: submission.id,
        amount: submission.amount,
        sender: submission.sender,
        vendorField: submission.vendorField,
        timestamp: submission.timestamp.unix
      })
    );
  }

  return submissions;
};

const isRegexMatch = (submission: string) => {
  if (event.type === 'sweepstake') {
    return submission.match(/^\d+\.\d+$/);
  }
  return submission.match(new RegExp(`${raffle.prefix}-\\d+`));
};

const validateSubmissions = (submissions: ContestSubmission[]): ContestSubmission[] => {
  const uniqueAccounts: any = [];
  const uniqueSubmissions: any = [];
  const validSubmissions: any = [];

  submissions.forEach(sub => {
    if (
      !sub.vendorField ||
      !isRegexMatch(sub.vendorField) ||
      uniqueAccounts.includes(sub.sender) ||
      uniqueSubmissions.includes(sub.vendorField) ||
      parseInt(sub.amount) / network.arktoshis < event.submissionPrice ||
      !dateIsValid(sub.timestamp, event.contestOpen, event.contestClosed)
    ) {
      console.log(`Submission rejected ❌`);
    } else {
      uniqueAccounts.push(sub.sender);
      uniqueSubmissions.push(sub.vendorField);
      validSubmissions.push(sub);
    }
  });
  return validSubmissions;
};

const processSubmissions = async (): Promise<ContestSubmission[]> => {
  const submissions = await fetchSubmissions();
  const validated = validateSubmissions(submissions);

  /* Sort chronologically */
  validated.sort((a: ContestSubmission, b: ContestSubmission) =>
    a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
  );

  return validated;
};

export { processSubmissions };
