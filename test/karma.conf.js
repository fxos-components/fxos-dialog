'use strict';

module.exports = function(config) {
  config.set({
    basePath: '..',
    browsers: ['firefox_latest'],
    client: {
      captureConsole: true,
      mocha: { 'ui': 'tdd' }
    },

    frameworks: [
      'mocha',
      'chai-sinon'
    ],

    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: {
          'dom.webcomponents.enabled': true
        }
      }
    },

    files: [
      'node_modules/fxos-icons/fxos-icons.css',
      'node_modules/fxos-component/fxos-component.js',
      'node_modules/pressed/pressed.js',
      'node_modules/fxos-button/fxos-button.js',
      'node_modules/fxos-text-input/fxos-text-input.js',
      'fxos-dialog.js',
      'fxos-dialog-alert.js',
      'fxos-dialog-confirm.js',
      'fxos-dialog-prompt.js',
      'fxos-dialog-action.js',
      'fxos-dialog-select.js',
      'fxos-dialog-menu.js',
      'node_modules/axe-core/axe.min.js',
      'node_modules/test-utils/src/utils.js',
      'node_modules/test-utils/src/accessibility.js',
      'test/test-unit.js',
      {
        pattern: 'node_modules/fxos-icons/fxos-icons.css',
        included: false
      },
      {
        pattern: 'node_modules/fxos-icons/fonts/fxos-icons.ttf',
        included: false
      }
    ],

    proxies: {
      '/node_modules/': 'http://localhost:9876/base/node_modules/',
    }
  });
};
