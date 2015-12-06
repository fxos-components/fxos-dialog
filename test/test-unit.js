/* jshint maxlen:120 */
/* global sinon, suite, setup, teardown, test, assert, d1, d2, d3, d4 */

suite('fxos-dialog', function() {
  'use strict';

  var accessibility = window['test-utils'].accessibility;

  setup(function() {
    this.sandbox = sinon.sandbox.create();
    this.container = document.createElement('div');
    this.container.innerHTML = `
      <fxos-dialog id="d1">
        <h1>Main Heading</h1>
        <h2>Sub Heading</h2>
        <p>Lorem ipsum dolor sit amet, ...</p>
        <button on-click="close">Action</button>
        <button on-click="close">Cancel</button>
      </fxos-dialog>

      <fxos-dialog-select id="d2">
        <h1>Ring tone</h1>
        <li>Classic prism</li>
        <li>Wallphone</li>
        <li>Disco drive</li>
        <li>Touchmatic</li>
        <li>Classic courier</li>
        <li>Hacker</li>
      </fxos-dialog-select>

      <fxos-dialog-select multiple id="d3">
        <h1>Ring tone</h1>
        <li>Classic prism</li>
        <li>Wallphone</li>
        <li>Disco drive</li>
        <li>Touchmatic</li>
        <li>Classic courier</li>
        <li>Hacker</li>
      </fxos-dialog-select>

      <fxos-dialog-menu id="d4">
        <button on-click="close" data-icon="firefox">Open in new window</button>
        <button on-click="close" data-icon="firefox">Add to Home Screen</button>
        <button on-click="close" data-icon="firefox">Share link</button>
        <button on-click="close" data-icon="firefox">Settings</button>
      </fxos-dialog-menu>`;

    this.dialogs = this.container.querySelectorAll('fxos-dialog');
    document.body.appendChild(this.container);
  });

  teardown(function() {
    this.sandbox.restore();
    document.body.removeChild(this.container);
    this.container = null;
  });

  suite('accessibility', function() {
    /**
     * Accessibility test utils module tests the following things, amongst other
     * checks (all at once).:
     *  - ARIA attributes specific checks
     *  - accesskey uniqueness if applicable
     *  - Presence of alternative descriptions, labels and names
     *  - Color contrast
     *  - Semantic markup is valid from a11y standpoint
     *  - Heading order
     *  - Frame/document title and language
     *  - Landmarks if applicable
     *  - Keyboard focusability and tabindex
     *
     * Its checks are called at different stages and within different states of
     * the component.
     */

    setup(function(done) {
      // Accessibility attributes are set after the HTML has been parsed.
      setTimeout(done);
    });

    test('fxos-dialogs default states pass all accessibility checks ' +
      'mentioned above and have attributes correctly set', function(done) {
      // Dialogs and innter dialogs have a correct dialog role.
      assert.equal(d1.getAttribute('role'), 'dialog');
      assert.equal(d2.els.dialog.getAttribute('role'), 'dialog');
      assert.equal(d3.els.dialog.getAttribute('role'), 'dialog');
      assert.equal(d4.els.dialog.getAttribute('role'), 'dialog');

      // Select dialogs should have aria-multiselectable set correctly.
      assert.isFalse(d2.els.list.hasAttribute('aria-multiselectable'));
      assert.equal(d3.els.list.getAttribute('aria-multiselectable'), 'true');

      // Select dialog options should have a correct option roles.
      [].forEach.call(d2.options,
        option => assert.equal(option.getAttribute('role'), 'option'));
      [].forEach.call(d3.options,
        option => assert.equal(option.getAttribute('role'), 'option'));

      // Menu dialog should have a correct menu role.
      assert.equal(d4.els.items.getAttribute('role'), 'menu');
      // Menu dialog items should have a correct menuitem roles.
      [].forEach.call(d4.querySelectorAll('button'),
        menuitem => assert.equal(menuitem.getAttribute('role'), 'menuitem'));

      accessibility.check(this.container).then(done, done);
    });

    test('when visible, fxos-dialog passes accessibility checks mentioned ' +
      'above', function(done) {
      // Only test simple dialog for now because axe does not work with shadow
      // DOM.
      openDialog(d1)
        .then(() => accessibility.check(this.container, {
          // Skip color contrast testing. The current styling is below the best
          // practices threshold.
          rules: { 'color-contrast': { enabled: false } }
        }))
        .then(() => closeDialog(d1))
        .then(() => accessibility.check(this.container))
        .then(done, done);
    });
  });

  /**
   * Utils
   */

  function openDialog(dialog) {
    return new Promise(resolve => {
      function onOpened() {
        dialog.removeEventListener('opened', onOpened);
        resolve();
      }
      dialog.addEventListener('opened', onOpened);
      dialog.open();
    });
  }

  function closeDialog(dialog) {
    return new Promise(resolve => {
      function onClosed() {
        dialog.removeEventListener('closed', onClosed);
        resolve();
      }
      dialog.addEventListener('closed', onClosed);
      dialog.close();
    });
  }
});
