exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'username',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'accesskey',

  hostname: 'hub.browserstack.com',

  services: [
    [
      'browserstack',
      {
        // accessibility: true,
        buildIdentifier: '${BUILD_NUMBER}',
        browserstackLocal: false,
        opts: { forcelocal: false, localIdentifier: "webdriverio-appium-app-browserstack-repo" },
        app: process.env.BROWSERSTACK_APP_PATH || './examples/WikipediaSample.apk',
      }
    ]
  ],

  capabilities: [{
    'bstack:options': {
      deviceName: 'Google Pixel 8',
      osVersion: "14.0"
    }
  }, {
    'bstack:options': {
      deviceName: 'Samsung Galaxy S21',
      osVersion: "11.0"
    }
  }],

  commonCapabilities: {
    'bstack:options': {
      projectName: "WDIO A11y",
      buildName: 'browserstack build',
      sessionName: 'BStack parallel webdriverio-appium',
      debug: true,
      networkLogs: true,
      source: 'webdriverio:appium-sample-sdk:v1.0'
    }
  },

  maxInstances: 10,

  updateJob: false,
  specs: [
    './specs/single_test.js'
  ],
  exclude: [],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 40000
  }
};

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(let key in exports.config.commonCapabilities) 
    caps[key] = { ...caps[key], ...exports.config.commonCapabilities[key]};
});
