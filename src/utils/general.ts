import { event, network } from '../config';

const submit = (prediction: string): void => {
  const paymentUrl: string = generateDataUrl(prediction);

  window.open(paymentUrl, '_self');
};

const generateDataUrl = (prediction: string): string =>
  `${network.uri}:${event.address}?amount=${event.submissionPrice}&vendorField=${prediction}`;

const fetchCurrentPrize = async (): Promise<number> => {
  const options = {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'API-Version': '2' }
  };

  const url: string = `${network.api}/wallets/${event.address}`;

  const balance: number = await fetch(url, options)
    .then(res => res.json())
    .then(json => json.data.balance)
    .catch(err => new Error(err));

  return balance / network.arktoshis;
};

export { submit, fetchCurrentPrize, generateDataUrl };
