interface BasicObject {
  [key: string]: string;
}

interface NetworkSetting {
  [key: string]: {
    coin: string;
    api: string;
    uri: string;
    explorer: string;
    arktoshis: number;
  };
}

const gameTypes: string[] = ['sweepstake', 'raffle'];

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

const networkSettings: NetworkSetting = {
  ARK: {
    coin: 'ARK',
    api: 'https://explorer.ark.io/api',
    uri: 'ark',
    explorer: 'https://explorer.ark.io',
    arktoshis: 100000000
  },
  'ARK-DEV': {
    coin: 'ARK',
    api: 'https://dexplorer.ark.io/api',
    uri: 'ark',
    explorer: 'https://dexplorer.ark.io',
    arktoshis: 100000000
  },
  DGT: {
    coin: 'DGT',
    api: 'https://api.digitalgemtoken.com/api',
    uri: 'ark',
    explorer: 'http://www.explorer.digitalgemtoken.com:4200/#',
    arktoshis: 100000000
  },
  XQR: {
    coin: 'XQR',
    api: 'https://qredit.cloud/api',
    uri: 'qredit',
    explorer: 'https://explorer.qredit.io',
    arktoshis: 100000000
  }
};

const themeOptions: string[] = ['default', 'ark-red', 'bluerple'];

export { gameTypes, currencies, cryptos, networkSettings, themeOptions };
