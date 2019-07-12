const config = require('./config.json');

/* General information of the event */
const meta = config.meta;

/* UI theme picker. Available options: default, dark  */
const layout = config.layout;

/* Rules for the event */
const event = config.event;

/* Network/bridgechain configuration */
const network = config.network;

/* Settings specific for the 'sweekstake' type game */
const sweepstake = config.sweepstake;

/* Settings specific for the 'raffle' type game */
const raffle = config.raffle;

export { meta, layout, event, network, sweepstake, raffle };
