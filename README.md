# &lt;gaia-dialog&gt; [![](https://travis-ci.org/gaia-components/gaia-dialog.svg)](https://travis-ci.org/gaia-components/gaia-dialog) [![devDependency Status](https://david-dm.org/gaia-components/gaia-dialog/dev-status.svg)](https://david-dm.org/gaia-components/gaia-dialog#info=devDependencies)

gaia-dialog contains several type of dialogs, including alert, confirm, prompt, action, select, and menu.

## Installation

```bash
$ bower install gaia-components/gaia-dialog
```

## Alert Dialog

Include folowing files in HTML

```html
<script src="bower_components/gaia-list/gaia-dialog.js"></script>
<script src="bower_components/gaia-list/gaia-dialog-alert.js"></script>
```

### Usage

```html
<gaia-dialog-alert>No SIM card is present</gaia-dialog-alert>
```

## Confirm Dialog

Include folowing files in HTML

```html
<script src="bower_components/gaia-list/gaia-dialog.js"></script>
<script src="bower_components/gaia-list/gaia-dialog-confirm.js"></script>
```

### Usage

```html
<gaia-dialog-confirm>Are you sure you want to delete this contact?</gaia-dialog-confirm>
```

## Prompt Dialog

Include folowing files in HTML

```html
<script src="bower_components/gaia-list/gaia-dialog.js"></script>
<script src="bower_components/gaia-list/gaia-dialog-prompt.js"></script>
```

### Usage

```html
<gaia-dialog-prompt>Device name</gaia-dialog-prompt>
```

## Action Dialog

Include folowing files in HTML

```html
<script src="bower_components/gaia-list/gaia-dialog.js"></script>
<script src="bower_components/gaia-list/gaia-dialog-action.js"></script>
```

### Usage

```html
<gaia-dialog-action>
  <h1>Descriptions...</h1>
  <button>Action 1</button>
  <button>Action 2</button>
</gaia-dialog-action>
```

## Select Dialog

Include folowing files in HTML

```html
<script src="bower_components/gaia-list/gaia-dialog.js"></script>
<script src="bower_components/gaia-list/gaia-dialog-select.js"></script>
```

### Usage

```html
<gaia-dialog-select>
  <h1>Ring tone</h1>
  <li>Classic prism</li>
  <li>Wallphone</li>
</gaia-dialog-select>
```

#### Multiple Select

Add `multiple` attribute in `gaia-dialog-select` element to enable multiple selection.

```html
<gaia-dialog-select multiple>
  <h1>Ring tone</h1>
  <li>Classic prism</li>
  <li>Wallphone</li>
</gaia-dialog-select>
```

## Menu Dialog

Include folowing files in HTML

```html
<script src="bower_components/gaia-list/gaia-dialog.js"></script>
<script src="bower_components/gaia-list/gaia-dialog-menu.js"></script>
```

### Usage

```html
<gaia-dialog-menu>
  <button data-icon="firefox">Open in new window</button>
  <button data-icon="firefox">Add to Home Screen</button>
  <button data-icon="firefox">Share link</button>
  <button data-icon="firefox">Settings</button>
</gaia-dialog-menu>
```


## Examples

- [Example](http://gaia-components.github.io/gaia-dialog/)


## Tests

1. Ensure Firefox Nightly is installed on your machine. (Visit: [Firefox Nightly Page](https://nightly.mozilla.org/))
2. `$ npm install`
3. `$ npm run test-unit`

If you would like tests to run on file change use:

`$ npm run test-unit-dev`

If your would like run integration tests, use:

`$ export FIREFOX_NIGHTLY_BIN=/absolute/path/to/nightly/firefox-bin`
`$ npm run test-integration`

## Lint check

Run lint check with command:

`$ npm run test-lint`
