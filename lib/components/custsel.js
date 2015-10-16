import React, {Component, PropTypes} from 'react';
import SelButton from './selbutton.js';
import Menu from './custselmenu.js';
import {winResize, getWinSize} from 'winresize-event';
// import isTouch from 'has-touch';

 /* eslint no-use-before-define: 0 */

class CustSelect extends Component {
  constructor(props) {
    super(props);
    this.menuState = false;
    this.myCallBack = this.myCallBack.bind(this);
    this.userCallBack = props.callBack; // this is the callback to the owner, called with selection changes
    this.myCallBack = this.myCallBack.bind(this);

    // document.body.insertAdjacentHTML('afterBegin', `<div class="menuCtr menutop" id="${this.controls}"></div>`);
    this.winSize = this.winSize.bind(this);
    winResize.on(this.winSize);
    let vPort = getWinSize();
    this.state = {showMenu: false, vPort, selectedItem: this.props.selectedItem};
  }

  render() {
    let {callBack, ...props} = this.props;
    return (
      <div style={{position: 'relative'}}>
        <SelButton {...props}
          focusButton={this.state.focusButton}
          callBack={this.myCallBack}
          selectedItem={this.state.selectedItem}
        />
        <Menu {...props}
          btnBox={this.state.btnBox}
          showMenu={this.state.showMenu}
          selectedItem={this.state.selectedItem}
        />
      </div>
    );
  }

  getBtnRect() {
    let bb = this.btnElem.getBoundingClientRect();
    let btnBox = {top: bb.top, left: bb.left, bottom: bb.bottom, right: bb.right};
    btnBox.width = bb.width ? bb.width : bb.right - bb.left;
    btnBox.height = bb.height ? bb.height : bb.bottom - bb.top;
    return btnBox;
  }

  myCallBack(stat) {
    switch (stat.action) {
    case 'btnClick':
      this.setState({showMenu: true, btnBox: this.getBtnRect(), focusButton: false});
      break;
    case 'btnDidMount':
      this.btnElem = stat.btnElem;
      break;
    case 'selected':
      this.setState({selectedItem: stat.item, showMenu: false, focusButton: true});
      this.userCallBack(this.props.selId ? this.props.selId : '', stat.item);
      break;
    case 'userRequestsClose':
      this.setState({showMenu: false, focusButton: true});
      break;
    default:
      break;
    }

    this.render();
  }

  winSize(ws) {
    this.conf.vPort = ws;
    this.render();
  }

  hideMenu() {
    if (this.conf.showMenu) {
      this.conf.showMenu = false;
      this.render();
    }
  }
}

CustSelect.propTypes = {
  selectedItem: PropTypes.string,
  callBack: PropTypes.func.isRequired,
  selId: PropTypes.string
};

export default CustSelect;