interface BasicObject {
  [key: string]: string;
}

const currencies: BasicObject = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
  AUD: '$',
  CAD: '$',
  CHF: 'CHf',
  CNH: '¥',
  SEK: 'kr',
  NZD: '$'
};

const cryptos: BasicObject = {
  ARK: 'Ѧ',
  BTC: '₿',
  DGT: '⌬',
  LSK: 'Ⱡ',
  PRAX: '☧',
  XQR: 'XQR'
};

export { currencies, cryptos };
