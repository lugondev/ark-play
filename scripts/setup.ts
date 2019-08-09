const fs = require('fs');
const path = require('path');
const constants = require('./constants');
const readlineSync = require('readline-sync');
const figlet = require('figlet');
const chalk = require('chalk');
const createTickets = require('./create-tickets').createTickets;
const config = require('./boilerplate.json');

readlineSync.setDefaultOptions({ prompt: '> ' });

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const currencyOptions: string[] = Object.keys(constants.currencies);
const networkOptions: string[] = Object.keys(constants.networkSettings);

const notEmptyOption = {
  limit: [/.+/],
  limitMessage: 'Invalid input.'
};

const log = console.log;

const logHeader = (msg: string) => {
  const spacer = '\n-------------------------------------\n';
  log(chalk.bold(spacer, msg, spacer));
};

const logQ = (msg: string) => {
  log(chalk.bold(msg));
};

const logAlt = (msg: string) => {
  log(chalk.grey(msg));
};

const logInput = (msg: string) => {
  log('\x1b[32m%s\x1b[0m', `✔ ${msg}`);
};
const logDanger = (msg: string) => {
  log('\x1b[31m%s\x1b[0m', msg);
};

/* -------------------------------------------------------------------------------- */

log('\033[2J');

log(
  '\x1b[33m%s\x1b[0m',
  figlet.textSync('ARK Play', {
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })
);

log(
  `\nThis configuration wizard will guide you through the
setup of your event. 
    
If you are not sure on what to enter, please use the
suggested or default value.
    
The configuration will be saved to /src/config/config.json
and can be edited later.\n`
);

logHeader('EVENT METADATA');

logQ('Event name?');
logAlt(`Example: ARK Play!`);
config.meta.eventName = readlineSync.prompt(notEmptyOption);
logInput(`Event name: ${config.meta.eventName}`);

logQ('\nEvent subheader?');
logAlt(`Example: My Summer Sweepstake Event!`);
config.meta.eventSubHeader = readlineSync.prompt(notEmptyOption);
logInput(`Event subheader: ${config.meta.eventSubHeader}`);

logQ('\nEvent description?');
logAlt(`A the description of your event. This field supports HTML tags.`);
config.meta.description = readlineSync.prompt(notEmptyOption);

logQ('\nEvent rules?');
logAlt('Add a rule by typing: add "this is my rule"');
logAlt('Stop adding rules by typing: done');
readlineSync.promptCLLoop({
  add: (rule: string) => {
    config.meta.rules.push(`${rule}`);
    logInput('Rule added');
  },
  done: () => true
});
logInput(`Succesfully added ${config.meta.rules.length} rule(s)`);

logQ('\nPrize distribution?');
logAlt(`Configure the amount of winners/prizes by entering`);
logAlt(`decimal numbers seperated by a comma. Leave empty for`);
logAlt(`one single winner that takes the full prize.`);
logAlt(`Eg: 0.7, 0.2, 0.1 means that there are 3 winners.`);
logAlt(`First place would take 70%, second place 20%, third place 10%`);
logAlt(`The entered numbers should add up to 1`);
while (true) {
  let userInput: string = '';

  userInput = readlineSync.prompt({
    defaultInput: 1
  });

  const floatArr = userInput
    .replace(' ', '')
    .split(',')
    .map(num => parseFloat(num) * 100);

  if (Math.round(floatArr.reduce((a, b) => a + b)) === 100) {
    config.event.prizes = floatArr.map(num => num / 100);
    logInput(`Number of prizes: ${config.event.prizes.length}`);
    logInput(
      `Prize distribution: ${config.event.prizes.map(
        (prize, index) => `${index + 1}. ${prize * 100}%`
      )}`
    );
    break;
  } else {
    logDanger('Invalid prize input.\n');
  }
}

logHeader('LAYOUT');

logQ('Theme?');
const themeKey = readlineSync.keyInSelect(constants.themeOptions, '> ', {
  guide: false,
  cancel: false,
  defaultInput: 0
});

config.layout.theme = constants.themeOptions[themeKey];
logInput(`Theme: ${config.layout.theme}`);

logHeader('EVENT RULESET');

logQ('Event type?');
const typeIndex = readlineSync.keyInSelect(constants.gameTypes, '> ', {
  guide: false,
  cancel: false
});
config.event.type = constants.gameTypes[typeIndex];
logInput(`Event type: ${config.event.type}`);

logQ('\nWhen should the event open?');
logAlt(`Example: 2019-06-01`);
config.event.contestOpen = readlineSync.prompt({
  limit: [dateRegex],
  limitMessage: 'Date must be in yyyy-mm-dd.'
});
logInput(`Contest open: ${config.event.contestOpen}`);

logQ('\nWhen should the event close?');
logAlt(`Example: 2019-07-01`);
config.event.contestClosed = readlineSync.prompt({
  limit: [(test: string) => Date.parse(config.event.contestOpen) < Date.parse(test) && dateRegex],
  limitMessage:
    'Date must be in yyyy-mm-dd format and\ncan not be earlier than the contest open date.'
});
logInput(`Contest closed: ${config.event.contestClosed}`);

logQ('\nSubmission price?');
logAlt('Integers only. Example: 5');
config.event.submissionPrice = readlineSync.questionInt('> ');
logInput(`Submission price: ${config.event.submissionPrice}`);

logQ('\nContest address?');
logAlt('The address that all submissions will be sent to.');
logDanger(`\n!!! ATTENTION !!! `);
logDanger('You, the host, are responsible for creating,\nmanaging and securing this address.');
config.event.address = readlineSync.prompt();
logInput(`Contest address: ${config.event.address}`);

logHeader('NETWORK');

const usePreset = readlineSync.keyInYNStrict('Use a network preset?');

if (usePreset) {
  logQ('Choose network:');
  const coinIndex = readlineSync.keyInSelect(networkOptions, '> ', {
    guide: false,
    cancel: false
  });
  const networkPreset = constants.networkSettings[networkOptions[coinIndex]];
  config.network = networkPreset;
  logInput(`Using network preset: ${networkOptions[coinIndex]}`);
  logAlt(JSON.stringify(constants.networkSettings[networkOptions[coinIndex]], null, 2));
} else {
  logQ('\nAPI address?');
  logAlt('Example: https://api.ark.io/api');
  config.network.api = readlineSync.prompt({
    limit: [urlRegex],
    limitMessage: 'Invalid URL.'
  });
  logInput(`API address: ${config.network.api}`);

  logQ('\nExplorer address:');
  logAlt('Example: https://explorer.ark.io/');
  config.network.explorer = readlineSync.prompt({
    limit: [urlRegex],
    limitMessage: 'Invalid URL.'
  });
  logInput(`Explorer address: ${config.network.explorer}`);

  logQ('\nURI prefix:');
  logAlt('Example: ark');
  config.network.uri = readlineSync.prompt(notEmptyOption);
  logInput(`URI prefix: ${config.network.uri}`);

  logQ('\nNumber of units in one coin?');
  logAlt('Leave empty for default (100000000)');
  config.network.arktoshis = readlineSync.questionInt('', {
    defaultInput: 100000000
  });
  logInput(`Arktoshis: ${config.network.arktoshis}`);
}

if (config.event.type === 'sweepstake') {
  logHeader('SWEEPSTAKE GAME SETTINGS');

  logQ('Coin to predict (ticker)?');
  logAlt('Example: ARK, BTC, etc..');
  config.sweepstake.coinToPredict = readlineSync.prompt().toUpperCase();
  logInput(`Coin to predict: ${config.sweepstake.coinToPredict}`);

  logQ('\nDate to predict?');
  logAlt('Example: 2019-10-01');
  config.sweepstake.dateToPredict = readlineSync.prompt({
    limit: [
      (input: string) => Date.parse(config.event.contestClosed) < Date.parse(input) && dateRegex
    ],
    limitMessage:
      'Date must be in yyyy-mm-dd format and can\nnot be earlier than the contest close date.'
  });
  logInput(`Date to predict: ${config.sweepstake.dateToPredict}`);

  logQ('\nCurrency of value to predict?');
  const predictionCurrencyIndex = readlineSync.keyInSelect(currencyOptions, '> ', {
    guide: false,
    cancel: false
  });
  config.sweepstake.predictionCurrency = currencyOptions[predictionCurrencyIndex];
  logInput(`Currency to predict: ${config.sweepstake.predictionCurrency}`);

  while (true) {
    logQ('\nMinimum prediction amount?');
    logAlt('Example: 0.01');
    config.sweepstake.minAmount = readlineSync.questionFloat('> ', {
      limitMessage: 'Please enter a valid amount.'
    });

    logQ('\nMaximum prediction amount?');
    logAlt('Eg: 2.00');
    config.sweepstake.maxAmount = readlineSync.questionFloat('> ', {
      limitMessage: 'Please enter a valid amount.'
    });

    if (config.sweepstake.minAmount < config.sweepstake.maxAmount) {
      logInput(`Minimum prediction amount: ${config.sweepstake.minAmount}`);
      logInput(`Maximum prediction amount: ${config.sweepstake.maxAmount}`);
      break;
    } else {
      logDanger('Maximum amount should be less than minimum amount.\n');
    }
  }

  logQ('\nChart floor?');
  logAlt('The lowest amount the charts will display. Leave empty for automatic calculation.');
  config.sweepstake.chartFloor = parseInt(
    readlineSync.prompt({
      defaultInput: Math.floor(config.sweepstake.minAmount)
    })
  );

  logQ('\nSlider step size?');
  logAlt('Leave empty for default (0.01)');
  config.sweepstake.sliderStepSize = readlineSync.prompt({
    defaultInput: '0.01'
  });
  logInput(`Slider step size:: ${config.sweepstake.sliderStepSize}`);
} else if (config.event.type === 'raffle') {
  logHeader('RAFFLE GAME SETTINGS');

  logQ('Number of tickets?');
  logAlt('Leave empty for default of 100');
  const numOfTickets = readlineSync.questionInt('> ', {
    defaultInput: 100
  });
  logInput(`Number of tickets: ${numOfTickets}`);

  logQ('\nTicket prefix?');
  logAlt("Eg: Prefix 'TEST' will become TEST-000, TEST-001, TEST-002, etc");
  const ticketId = readlineSync
    .prompt({
      limit: [/^.{0,4}$/],
      limitMessage: 'Prefix can not be longer than 4 characters.'
    })
    .toUpperCase();
  logInput(`Ticket prefix: ${ticketId}`);

  config.raffle.prefix = ticketId;
  config.raffle.tickets = createTickets(ticketId, numOfTickets);

  if (config.raffle.tickets.length > 0) logInput('Tickets created succesfully');

  logQ('\nNumber of available tickets that will be displayed?');
  logAlt('Leave empty for default of 12 (recommended)');
  config.raffle.displayTickets = readlineSync.questionInt('> ', {
    defaultInput: 12
  });
  logInput(`Ticket displayed: ${config.raffle.displayTickets}`);
}

logHeader('END');

fs.writeFile(
  path.resolve(__dirname, '../src/config/config.json'),
  JSON.stringify(config, null, 2),
  (err: ErrorEvent) => {
    if (err) {
      log('Could not save file, exiting now..');
      process.exit(1);
    }

    logInput(`Config succesfully saved to ./src/config/config.json`);
    log(
      `\nYou can now run 'npm start' to start the app in development mode,\nor run 'npm run build' to create a production build for deployment.`
    );
    process.exit(0);
  }
);
