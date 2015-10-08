/* global marionette, suite, test */

'use strict';

var assert = require('chai').assert;
marionette.plugin('helper', require('marionette-helper'));

marionette('gaia-dialog', function() {
  var client = marionette.client({
    profile: {
      prefs: {
        // Disable first time run UI
        'browser.feeds.showFirstRunUI': false,
        // Disable default browser check
        'browser.shell.checkDefaultBrowser': false,
        // Disable UI tutorial
        'browser.uitour.enabled': false,
        // Enable chrome debugging
        'devtools.chrome.enabled': true,
        'devtools.debugger.remote-enabled': true,

        // Load integration test page on startup
        'startup.homepage_welcome_url': __dirname + '/test-integration.html',

        // Allow loading test resources oudside of test/ directory
        // (e.g. bower-components)
        'security.fileuri.strict_origin_policy': false,

        // Enable web components
        'dom.webcomponents.enabled': true,
        // Enable touch events
        'dom.w3c_touch_events.enabled': 1
      }
    },
    desiredCapabilities: {
      raisesAccessibilityExceptions: true
    }
  });

  var dialogs = [
    { selector: '#d1' },
    { selector: '#d2' },
    { selector: '#d3' },
    { selector: '#d4' }
  ];

  function openDialog(selector) {
    client.executeScript(function(selector) {
      // XPC constructs that reflect an object from JavaScript into C++.
      // wrappedJSObject will go away when marionette has parity with WebDriver
      // spec.
      // See: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/
      //              Language_bindings/XPConnect/XPConnect_wrappers
      document.querySelector(selector).wrappedJSObject.open();
    }, [selector]);
  }

  function closeDialog(selector) {
    client.executeScript(function(selector) {
      // XPC constructs that reflect an object from JavaScript into C++.
      // wrappedJSObject will go away when marionette has parity with WebDriver
      // spec.
      // See: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/
      //              Language_bindings/XPConnect/XPConnect_wrappers
      document.querySelector(selector).wrappedJSObject.close();
    }, [selector]);
  }

  /**
   * A wrapper around test that tests various user actions such as click and
   * tap.
   * @param  {String} name test name
   * @param  {Function} testFn test function
   */
  function testActions(name, testFn) {
    test(name, function() {
      ['click', 'tap'].forEach(testFn);
    });
  }

  /**
   * Perform a marionette operation and assert if an error is thrown.
   * @param  {Function} testFn operation to perform
   * @param  {String} message error message for the assert statement
   */
  function failOnA11yError(testFn, message) {
    try {
      testFn();
    } catch (err) {
      // Marionette raises an ElementNotAccessibleError exception when
      // raisesAccessibilityExceptions is set to true.
      assert(false, [message, err.message].join(' '));
    }
  }

  test('when shown and then hidden, gaia-dialog has correct visibility state ' +
    'both normally and from the assistive technology standpoint', function() {
    dialogs.forEach(function(dialog) {
      openDialog(dialog.selector);
      failOnA11yError(function() {
        client.helper.waitForElement(dialog.selector);
      }, 'gaia-dialog element should be visible both normally and to ' +
        'assistive technology.');

      closeDialog(dialog.selector);
      failOnA11yError(function() {
        client.helper.waitForElementToDisappear(dialog.selector);
      }, 'gaia-dialog element should be hidden both normally and from ' +
        'assistive technology.');
    });
  });

  suite('gaia-dialog controls, such as buttons are accessible (no error ' +
    'thrown when clicking and tapping)', function() {
    testActions('base gaia-dialog controls are accessible', function(action) {
      var dialog = dialogs[0];
      openDialog(dialog.selector);

      // Click to close dialog
      client.helper.waitForElement('button[on-click="close"]')[action]();
      failOnA11yError(function() {
        client.helper.waitForElementToDisappear(dialog.selector);
      }, 'gaia-dialog element should be hidden both normally and from ' +
        'assistive technology.');
    });

    testActions('select gaia-dialog controls are accessible', function(action) {
      var dialog = dialogs[1];
      openDialog(dialog.selector);

      // Click to close dialog
      var dialogElement = client.helper.waitForElement(dialog.selector);
      client.switchToShadowRoot(dialogElement);
      failOnA11yError(function() {
        client.helper.waitForElement('.cancel')[action]();
      }, 'gaia-dialog-select cancel element should be accessible (no error' +
        'thrown when clicking and tapping');
      client.switchToShadowRoot();

      failOnA11yError(function() {
        client.helper.waitForElementToDisappear(dialog.selector);
      }, 'gaia-dialog element should be hidden both normally and from ' +
        'assistive technology.');
    });

    testActions('multiselect gaia-dialog controls are accessible',
      function(action) {
        var dialog = dialogs[2];
        openDialog(dialog.selector);

        // Click on an option
        var dialogElement = client.helper.waitForElement(dialog.selector);
        var option = client.helper.waitForElement('#option');
        failOnA11yError(function() {
          option[action]();
        }, 'gaia-dialog-select option element should be accessible (no error' +
          'thrown when clicking and tapping');

        // Click to close dialog
        client.switchToShadowRoot(dialogElement);
        failOnA11yError(function() {
          client.helper.waitForElement('.submit.primary')[action]();
        }, 'gaia-dialog-select primary element should be accessible (no error' +
        'thrown when clicking and tapping');
        client.switchToShadowRoot();

        failOnA11yError(function() {
          client.helper.waitForElementToDisappear(dialog.selector);
        }, 'gaia-dialog element should be hidden both normally and from ' +
          'assistive technology.');
      });

    testActions('menu gaia-dialog controls are accessible', function(action) {
      var dialog = dialogs[3];
      openDialog(dialog.selector);

      // Click/tap on a menuitem should close dialog
      var menuitem = client.helper.waitForElement('#menuitem');
      failOnA11yError(function() {
        menuitem[action]();
      }, 'gaia-dialog-menu button element should be accessible (no error' +
        'thrown when clicking and tapping');

      failOnA11yError(function() {
        client.helper.waitForElementToDisappear(dialog.selector);
      }, 'gaia-dialog element should be hidden both normally and from ' +
        'assistive technology.');
    });
  });
});
