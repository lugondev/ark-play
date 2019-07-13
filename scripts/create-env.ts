const fs = require('fs');
const path = require('path');
const userConfig = require('../src/config/config.json');

const prodEnv: string = `REACT_APP_THEME=${userConfig.layout.theme}`;

fs.writeFile(
  path.resolve(__dirname, '../.env.production'),
  prodEnv,
  (err: ErrorEvent): void => {
    if (err) console.error('Could not save production environment variables.\n');
    console.log('✅ Successfully created production environment variables\n');
  }
);
