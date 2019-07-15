# ARK Play 🕹️

ARK Play is an easy to use and configurable ‘on-chain’ web app that can serve numerous types of events and competitions in the ARK Ecosystem and its bridgechains.

The following game types are currently supported:

- Sweepstake
- Raffle

The following projects are currently supported (including network presets):

- ARK
- ARK (devnet)
- DGT
- XQR

Demos: [Sweepstake](https://arkrelay.com/play/sweepstake) / [Raffle](https://arkrelay.com/play/raffle)

## Disclaimer

ARK Play is entirely a community initiative and has no affiliation to the business entities of ARK or ARK ECOSYSTEM.

The sole purpose of this app is to generate community engagement in the ARK Ecosystem.

The creator of this app as well as its backers are in no way or form responsible for the actions of the entities that will make use of ARK Play. As stated in the MIT license:

> IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

Rules and restrictions in regards to hosting these kinds of events may vary per country. Please DYOR and use this app wisely.

## Prerequisites

- A recent version of NodeJS ([link](https://nodejs.org/en/))
- A webserver to host the event

## Usage

### Clone repository and install dependencies

```
git clone https://github.com/Lemii/ark-play
cd ark-play
npm install
```

### Set up rules and configuration of your event

The easiest way to setup your event is to use the configuration wizard. This script will validate your inputs and contains game type and network presets that you can pick from.

```
npm run setup
```

The setup script will generate a configuration file and save it to `./src/config/config.json`.

If you are a more experienced user, you can go ahead and edit the `config.json` file directly without using the wizard.

### (Optional) Test the app in your development environment

Start the app by running:

```
npm start
```

Take a look at your app, and make adjustments to the `config.json` file if needed.

### Enter your site address

Open `package.json` and change the homepage variable to the address where your site will be hosted (eg: https://arkrelay.com/mycontest).

### Create a production build

To be able to deploy your site you'll need to create a production build first.

```
npm run build
```

This command will bundle and optimize all code that you can host on your webserver. The files will be saved in the `./build` folder.

### Deploy

Upload the contents of the `./build` folder to your webserver, and you're done 🚀

## Features

### Submission validation

Submissions are automatically validated on:

- Date of prediction (submission may not occur before start date and not after end date)
- Duplicates (only one submission per account is allowed)
- Submission price (transferred amount must be equal or higher than configured submission price)
- Submission data (the submissions must match a specific RegEx pattern that is based on the event configuration)

### Theming

ARK Play comes with a couple of themes out of the box. However, if you'd like to further customize the UI, you can change the color values in `./src/sass/custom.scss` and set the theme value in the `config.json` file to `custom`.

### Remarks

**General**

- The app comes with a pre-configured `config.json`. You can use this as reference for creating your own.
- It is the host's responsibility to create and manage the event address. This address will be used to receive all submissions.
- Prices must be send out by the host.

**Sweepstake game type**

- Coin pricing data is fetched from CryptoCompare's historical data API. It's recommended that you mention this in the rules (see the default `config.json` for reference).

**Raffle game type**

- ARK Pay only facilitates the distribution of the tickets.
- For security reasons, ARK Pay does not determine the winning ticket(s). It is recommended you configure this with a service such as [RandomResult.com](http://www.randomresult.com).

## License

Licensed under the [MIT license](https://github.com/Lemii/ark-play/blob/master/LICENSE).
