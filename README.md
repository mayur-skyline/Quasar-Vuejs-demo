# quasar-web (quasar-demo) with store data with dbjosn Project README

## GraphQL Overview

- Quasar (pronounced /ˈkweɪ.zɑɹ/) is an MIT licensed open-source Vue.js based framework, which allows you as a web developer to quickly create responsive++ websites/apps in many flavours:

  - SPAs (Single Page App)
  - SSR (Server-side Rendered App) (+ optional PWA client takeover)
  - PWAs (Progressive Web App)
  - BEX (Browser Extension)
  - Mobile Apps (Android, iOS, …) through Cordova or Capacitor
  - Multi-platform Desktop Apps (using Electron)

- When using Quasar, you won’t need additional heavy libraries like Hammer.js, Moment.js or Bootstrap. It’s got those needs covered internally, and all with a small footprint!

## Technology and Versions

- Quasar : 3.12.3
- quasar/cli : 2.4.0
- vue : 3.2.29
- vuex : 4.1.0

## install quasar cli

- yarn global add @quasar/cli

## create quasar project

- quasar create my-demo-project

## run project

- quasar dev

## add validator package

- yarn add @vuelidate/validators

## Json server - use to store dummy data and make dummy api

- npm install -g json-server

  #run json server

  - json-server --watch db.json

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
