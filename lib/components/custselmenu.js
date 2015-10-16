/* eslint react/no-did-update-set-state: 0 */
import React, {Component, PropTypes} from 'react';
import isTouch from 'has-touch';

/*
 * This component is the menu part of custom select.
 * If the showMenu prop is true, then we go through a
 * three-step process to correctly size, position, and
 * set internal scrolling.
 *
 * Step one: with display set to none, populate the menu
 * and position it so it is entirely within the viewport.
 *
 * Step two: allow display but set visibility to hidden.
 * Take DOM measurements and position and size.
 *
 * Step three: Completely unhide and scroll the selected item
 * into position, then set focus.
 */

const SETUP = 0,
  FINALIZING = 1,
  DONE = 2,
  FIRST = Symbol('first'); // use in finding first selectable item.

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {status: SETUP};
    this.clickFunc = this.clickFunc.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  setCtrStyles() { // return styles for the outer container based on props and state
    let styles = {};
    if (!this.props.showMenu) {
      styles.display = 'none';
    } else {
      if (this.state.status === SETUP) {
        styles.visibility = 'hidden';
      }
      if (this.state.physProps) {
        styles.top = this.state.physProps.top + 'px';
        styles.left = this.state.physProps.left + 'px';
        styles.height = this.state.physProps.height + 'px';
        styles.width = this.state.physProps.width + 'px';
      }
    }
    return styles;
  }

  clickFunc(e) {
    console.log('clicked');
    e.preventDefault();
    e.stopPropagation();
    this.props.callBack({
      action: 'selected',
      item: e.currentTarget.dataset.value
    });
  }

  onKeyDown(e) {
    let theKey = e.keyCode;
    if (theKey === 13) {
      this.clickFunc(e);
      return;
    }
    if (theKey === 27) {
      e.preventDefault();
      e.stopPropagation();
      this.props.callBack({
        action: 'userRequestsClose'
      });
      return;
    }
  }

  computeNewSizeAndLoc(props) {
    // called from componentWillReceiveProps when status is SETUP
    // compute horizontal positioning, use most of viewport for height (for now)
    // This will cause the upcoming render to render the menu entirely within the
    // viewport (with visibility: hidden) in order to take its measurements and
    // prepare for a final visible render.
    console.log('Computing new size and loc');
    let width = props.maxWidth;
    let left = props.btnBox.left - (width - props.btnBox.width) / 2;
    let adj = isTouch ? 2 : 18;
    adj = left + width > props.vPort.width ? left + width - props.vPort.width + adj : 0;
    left -= adj;
    left = Math.max(left, 2);
    let height = Math.min(props.vPort.height - props.topMargin - props.bottomMargin, props.maxHeight);
    let physProps = {
      height,
      top: props.topMargin,
      width,
      left: left + props.vPort.scroll.left
    };
    this.setState({physProps});
  }

  adjustWithDOM() {
    // called from componentDidUpdate when status is SETUP
    // Take some measurements then do vertical sizing and positioning.
    let topListNode = this.refs.topList;
    let height = topListNode.offsetHeight;
    let liHeight = topListNode.firstElementChild.offsetHeight + this.props.itemBorderWidth;
    let physProps = this.state.physProps;
    if (height > 0) {
      height = Math.min(height + 2 * this.props.borderWidth, physProps.height);
      if (liHeight) {
        let rem = height % liHeight;
        if (rem < liHeight / 2) {
          height -= rem;
        } else {
          height += liHeight - rem;
        }
      }
      physProps.height = height;
    }
    let top,
      heightAdj = (liHeight - this.props.btnBox.height) / 2,
      aligningBelow = height - heightAdj + this.props.btnBox.top < this.props.vPort.height;
    if (aligningBelow) {
      top = this.props.btnBox.top - (liHeight - this.props.btnBox.height) / 2;
      if (!this.refs.selectedItem) {
        top = Math.max(top, this.props.topMargin);
      } else {
        let selNode = this.refs.selectedItem;
        let itemTop = selNode.offsetTop,
          scrollMax = topListNode.offsetHeight - height;
        if (itemTop <= scrollMax) {
          physProps.scrollAmt = itemTop; // can center selected item on button
        } else {
          let scrollDiff = itemTop - scrollMax; // cannot center on button
          top = Math.max(top - scrollDiff, this.props.topMargin);
          physProps.scrollAmt = scrollMax;
        }
      }
    } else {
      // aligning above
      top = this.props.btnBox.bottom + ((liHeight - this.props.btnBox.height) / 2) - height;
      if (this.refs.selectedItem) {
        let selNode = this.refs.selectedItem;
        let itemTop = selNode.offsetTop + selNode.offsetHeight - height;
        if (itemTop < 0) {
          top += Math.abs(itemTop);
          if (top + height > this.props.vPort.height) {
            top -= (top + height) - this.props.vPort.height;
          }
        } else {
          physProps.scrollAmt = itemTop;
        }
      }
      top = Math.max(top, this.props.topMargin);
    }
    if (top !== undefined) {
      physProps.top = top + this.props.vPort.scroll.top;
      if (height !== undefined) {
        if (top + height > this.props.vPort.height - this.props.bottomMargin) {
          height -= (top + height) - (this.props.vPort.height - this.props.bottomMargin);
          physProps.height = height;
        }
      }
    }
    // Now that we know where menu should go and how big it should be, trigger a render
    this.setState({physProps});
  }

  renderList(list, level, parId) {
    // render a UL (may be top level or a group)
    let paddingLeft = (this.props.levelPadding * (level + 1)) + 'px';
    return (
      <ul
        className={this.props.ulClass}
        aria-labelledby={parId}
        ref={level === 0 ? 'topList' : null}
        role="listbox"
      >
        {list.map(item => {
          let tabIndex, className, id, role, clickFunc,
            refType = null;
          if (item.children) {
            className = this.props.groupClass;
            id = this.props.idPrefix + item.value;
          } else {
            className = this.props.leafClass;
            tabIndex = '0';
            role = 'option';
            clickFunc = this.clickFunc;
            if (this.props.selectedItem) {
              if (this.props.selectedItem === item.value) {
                refType = 'selectedItem';
              }
            } else if (!this[FIRST]) {
              this[FIRST] = true;
              refType = 'firstItem';
            }
          }
          return (
            <li
              key={item.value || item.label}
              data-value={item.value}
              aria-selected={item.value === this.props.selectedItem ? 'true' : null}
              className={className}
              tabIndex={tabIndex}
              ref={refType}
              role={role}
              onClick={clickFunc}
              onKeyDown={this.onKeyDown}
            >
              <div
                style={{paddingLeft}}
                id={id}
              >{item.label}</div>
              {item.children ? this.renderList(item.children, level + 1, id) : null}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    let ctrStyles = this.setCtrStyles();
    this[FIRST] = false;
    return (
      <div style={ctrStyles} ref="theContainer">
        {this.renderList(this.props.menuItems.children, 0)}
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.status === DONE &&
      nextProps.showMenu &&
      this.props.vPort.height === nextProps.vPort.height) {
      console.log('state is done and suppressing update');
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.showMenu) {
      this.setState({status: SETUP});
    } else if (this.state.status === SETUP) {
      this.computeNewSizeAndLoc(nextProps);
    }
  }

  componentDidUpdate(/* prevProps, prevState */) {
    if (this.state.status === SETUP) {
      if (this.props.showMenu) {
        this.adjustWithDOM();
        console.log('setting to FINALIZING');
        this.setState({status: FINALIZING});
      }
    } else if (this.state.status === FINALIZING) {
      console.log('setting to DONE');
      this.setState({status: DONE});
      if (this.state.physProps.scrollAmt) {
        this.refs.theContainer.scrollTop = this.state.physProps.scrollAmt;
      }
      if (this.refs.selectedItem) {
        setTimeout(() => this.refs.selectedItem.focus(), 50);
      } else if (this.refs.firstItem) {
        setTimeout(() => this.refs.firstItem.focus(), 50);
      }
    }
  }
}

Menu.displayName = 'Menu';

Menu.defaultProps = {
  topMargin: 10,
  bottomMargin: 10,
  maxWidth: 250,
  maxHeight: 800,
  borderWidth: 1,
  itemBorderWidth: 1,
  levelPadding: 10,
  ulClass: 'menu-ul',
  groupClass: 'menu-group',
  leafClass: 'menu-leaf',
  idPrefix: 'mnuId-'
};

Menu.propTypes = {
  selectedItem: PropTypes.string,           // value of the selected item
  menuItems: PropTypes.object.isRequired,   // the (possibly nested) menu
  callBack: PropTypes.func.isRequired,      // callBack to the customSelect component
  vPort: PropTypes.object.isRequired,       // viewport and window scroll data
  btnBox: PropTypes.object.isRequired,      // location and dimensions of the element we anchor to
  showMenu: PropTypes.bool.isRequired,      // true to render as visible
  topMargin: PropTypes.number,              // minimum space between top of viewport and top of menu
  bottomMargin: PropTypes.number,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  borderWidth: PropTypes.number,
  itemBorderWidth: PropTypes.number,
  levelPadding: PropTypes.number,           // pixels to indent per nesting level
  ulClass: PropTypes.string,                // CSS class for UL elements
  groupClass: PropTypes.string,             // CSS class for nested group label element
  leafClass: PropTypes.string,              // CSS class for leaf (non group heading) elements
  idPrefix: PropTypes.string
};

export default Menu;
