const fs = require('fs');
const path = require('path');

/* Declare functionality */
const logError = (msg: string | ErrorEvent): void => console.log('\x1b[31m%s\x1b[0m', `✖️ ${msg}`);

export const createTickets = (id: string, amount: number): string[] => {
  const tickets: string[] = [];
  for (let i = 0; i < amount; i += 1)
    tickets.push(`${id.toUpperCase()}-${String(i).padStart(3, '0')}`);
  return tickets;
};

export const run = (): void => {
  /* Declare input variables */
  const fn = 'tickets.json';
  const id: string = process.argv[2];
  const amount: number = parseInt(process.argv[3]);

  /* Run standalone script */
  if (!id || !amount) {
    logError('Invalid input arguments, exiting now..');
    process.exit(1);
  }

  console.log(`⚙️ Creating ${amount} tickets with ID '${id}'..`);

  const tickets = createTickets(id, amount);

  console.log('✅ Tickets created succesfully.');

  /* Save as JSON */
  fs.writeFile(path.resolve(__dirname, fn), JSON.stringify(tickets), (err: ErrorEvent) => {
    if (err) {
      logError('Could not save file, exiting now..');
      process.exit(1);
    }

    console.log(`✅ Tickets saved to: ${fn}`);
    process.exit(0);
  });
};

if (!module.parent) run();
