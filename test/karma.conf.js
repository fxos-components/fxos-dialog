'use strict';
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['firefox_latest'],
    client: {
      captureConsole: true,
      mocha: {'ui': 'tdd'}
    },
    basePath: '../',

    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: {
          'dom.webcomponents.enabled': true
        }
      }
    },

    files: [
      'bower_components/base/base.css',
      'bower_components/gaia-theme/gaia-theme.css',
      'bower_components/gaia-fonts/style.css',
      'bower_components/gaia-icons/gaia-icons.css',
      'bower_components/gaia-component/gaia-component.js',
      'bower_components/pressed/pressed.js',
      'bower_components/gaia-button/gaia-button.js',
      'bower_components/gaia-text-input/gaia-text-input.js',
      'gaia-dialog.js',
      'gaia-dialog-alert.js',
      'gaia-dialog-confirm.js',
      'gaia-dialog-prompt.js',
      'gaia-dialog-action.js',
      'gaia-dialog-select.js',
      'gaia-dialog-menu.js',
      'node_modules/test-utils/node_modules/axe-core/axe.min.js',
      'node_modules/test-utils/src/utils.js',
      'node_modules/test-utils/src/accessibility.js',
      'test/test-unit.js',
      {
        pattern: 'bower_components/gaia-icons/gaia-icons.css',
        included: false
      },
      {
        pattern: 'bower_components/gaia-icons/fonts/gaia-icons.ttf',
        included: false
      }
    ],

    proxies: {
      '/bower_components/': 'http://localhost:9876/base/bower_components/',
      '/node_modules/': 'http://localhost:9876/base/node_modules/'
    }
  });
};
