import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'semantic-ui-react';

const TOGGLE_CONTEXT = '__toggle__';

function ToggleOn({ children }, context) {
  const { on } = context[TOGGLE_CONTEXT];
  return on ? children : null;
}
ToggleOn.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};
function ToggleOff({ children }, context) {
  const { on } = context[TOGGLE_CONTEXT];
  return on ? null : children;
}
ToggleOff.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};
function ToggleButton(props, context) {
  const { toggle } = context[TOGGLE_CONTEXT];

  return <Radio toggle onChange={toggle} {...props} />;
}
ToggleButton.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};

class Toggle extends Component {
    static On = ToggleOn
    static Off = ToggleOff
    static Button = ToggleButton
    static childContextTypes = {
      [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
    }
    state = { on: false }

    getChildContext() {
      return {
        [TOGGLE_CONTEXT]: {
          on: this.state.on,
          toggle: this.toggle,
        },
      };
    }


    toggle = () => this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on);
      },
    )

    render() {
      // const children = React.Children.map(
      //   this.props.children,
      //   child => React.cloneElement(child, {
      //     on: this.state.on,
      //     toggle: this.toggle,
      //   }),
      // );

      return (
        <div>{this.props.children}</div>
      );
    }
}

export default Toggle;
