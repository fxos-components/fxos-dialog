;(function(define){define(function(require,exports,module){
/*jshint esnext:true*/
'use strict';

/**
 * Dependencies
 */

var GaiaDialog = require('gaia-dialog');


var proto = GaiaDialog.extend();

/**
 * Runs when an instance of `GaiaTabs`
 * is first created.
 *
 * The initial value of the `select` attribute
 * is used to select a tab.
 *
 * @private
 */
proto.createdCallback = function() {
  this.onCreated();
  this.els.submit = this.shadowRoot.querySelector('.submit');
  this.els.submit.addEventListener('click', this.close.bind(this));
};

proto.template = `
<style>
.shadow-host {
  display: none;
}

.shadow-host[opened],
.shadow-host.animating {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>

<gaia-dialog>
  <section>
    <content></content>
  </section>
  <div>
    <button class="submit">Ok</button>
  </div>
</gaia-dialog>`;

// Register and expose the constructor
module.exports = document.registerElement('gaia-dialog-alert', { prototype: proto });
module.exports.proto = proto;

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('gaia-dialog-alert',this));
