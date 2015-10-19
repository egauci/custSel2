import React, {Component, PropTypes} from 'react';

/*
 * This component is the button portion of custom select.
 */

const SELITEM = Symbol('SelItem');

class SelButton extends Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
    this.getSelectedLabelSome = this.getSelectedLabelSome.bind(this);
  }

  render() {
    let {selectedItem, defaultLabel} = this.props;
    return (
      <div>
        <button
          className={this.props.btnClass}
          onClick={this.buttonClick}
          aria-label={this.props.ariaLabel}
          id={this.props.buttonId}
          aria-haspopup="true"
          ref="theBtn">
          {
            selectedItem !== undefined ?
              this.getSelectedLabel() :
              defaultLabel
          }
        </button>
      </div>
    );
  }

  componentDidMount() {
    // give parent the button's DOM reference so it can be used to align menu.
    this.props.callBack({
      action: 'btnDidMount',
      btnElem: this.refs.theBtn
    });
  }

  componentDidUpdate() {
    if (this.props.focusButton) {
      setTimeout(() => this.refs.theBtn.focus(), 50);
    }
  }

  buttonClick() {
    this.props.callBack({
      action: 'btnClick'
    });
  }

  /*
   * getSelectedLabelSome - function for Array.some that recursively
   * looks for a matching item value. Sets this[SELITEM] if match is found.
   */
  getSelectedLabelSome(itm) {
    if (itm.value && itm.value === this.props.selectedItem) {
      this[SELITEM] = itm;
      return true;
    }
    if (itm.children) {
      return itm.children.some(this.getSelectedLabelSome);
    }
    return false;
  }

  getSelectedLabel() {
    this.props.menuItems.children.some(this.getSelectedLabelSome);
    return this[SELITEM] ? this[SELITEM].label : this.props.defaultLabel;
  }
}

SelButton.displayName = 'SelButton';

SelButton.defaultProps = {
  defaultLabel: 'Select',
  btnClass: 'sel-button',
  focusButton: false,
  buttonId: null
};

SelButton.propTypes = {
  selectedItem: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  menuItems: PropTypes.object.isRequired,
  defaultLabel: PropTypes.string,
  btnClass: PropTypes.string,
  callBack: PropTypes.func.isRequired,
  focusButton: PropTypes.bool,
  buttonId: PropTypes.string
};

export default SelButton;
