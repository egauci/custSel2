import 'set-touch-class';
import {output, dateItems} from './dataItems.js';
import React from 'react';
import ReactDOM from 'react-dom';
import CustSel from './components/custSel.js';
import {winResize, getWinSize} from 'winresize-event';

/*
 * example implementation for CustSelect.
 *
 * The minimum parameter set for CustSelect:
 *  - A selector for the button container
 *  - An ID string to identify the selector on callback (required even if you
 *    are using a separate callback for each CustSelect)
 *  - A callback function (see above for signature)
 *  - Menu items (see dataItems.js for structure)
 *  - ariaLabel - a WAI-ARIA label string for the button
 *
 * For additional parameters (all optional) see the component source files.
 */

function callBack(selId, newItem) {
  console.log(`Select ${selId}: ${newItem}`);
}

function render() {
  ReactDOM.render(<CustSel
    menuItems={output}
    ariaLabel="Select an output format"
    callBack={callBack}
    selId="1"
    maxHeight={800}
    maxWidth={250}
    selectedItem={null}
  />, document.querySelector('#s1'));
  ReactDOM.render(<CustSel
    menuItems={dateItems}
    ariaLabel="Select a date"
    callBack={callBack}
    selId="2"
    maxHeight={800}
    maxWidth={250}
    selectedItem={null}
  />, document.querySelector('#s3'));
}

render();

function winSized(wsize) { // make sure doc covers viewport
  if (document.body.offsetHeight < wsize.height) {
    document.documentElement.style.height = wsize.height + 'px';
  } else {
    document.documentElement.style.height = 'auto';
  }
}
winResize.on(winSized);
winSized(getWinSize());
