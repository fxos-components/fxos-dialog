;(function(define){define(function(require,exports,module){
/*jshint esnext:true*/
'use strict';

/**
 * Dependencies
 */

var GetTextInput = require('gaia-text-input');
var GaiaDialog = require('gaia-dialog');
var component = require('gaia-component');

// Register and expose the constructor
module.exports = component.register('gaia-dialog-prompt', {

extends: GaiaDialog,

/**
 * Runs when an instance of `GaiaTabs`
 * is first created.
 *
 * The initial value of the `select` attribute
 * is used to select a tab.
 *
 * @private
 */
created: function() {
  this.onCreated();

  this.els.input = this.shadowRoot.querySelector('gaia-text-input');
  this.els.submit = this.shadowRoot.querySelector('.submit');
  this.els.cancel = this.shadowRoot.querySelector('.cancel');

  this.els.input.placeholder = this.firstChild.textContent;
  this.els.cancel.addEventListener('click', this.close.bind(this));
  this.els.submit.addEventListener('click', this.close.bind(this));
},

template: `
<style>
gaia-dialog-prompt {
  display: none;
}

gaia-dialog-prompt[opened],
gaia-dialog-prompt.animating {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
}

gaia-text-input {
  margin: 16px !important;
}
</style>

<gaia-dialog>
  <div><gaia-text-input></gaia-text-input></div>
  <fieldset>
    <button class="cancel">Cancel</button>
    <button class="submit primary">Ok</button>
  </fieldset>
</gaia-dialog>`
});


});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('gaia-dialog-prompt',this));
