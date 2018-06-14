import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'semantic-ui-react';

const TOGGLE_CONTEXT = '__toggle__';

function withToggle(WrappedComponent) {
  function Wrapper(props, context) {
    const toggleContext = context[TOGGLE_CONTEXT];

    return <WrappedComponent toggle {...toggleContext} {...props} />;
  }
  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  };

  return Wrapper;
}

export const ToggleOn = withToggle(({ children, on }) => {
  const { on } = context[TOGGLE_CONTEXT];
  return on ? children : null;
});

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


export const MyToggleButton = withToggle(({ on, toggle }) => (
  <button onClick={toggle}>
    {on ? 'on' : 'off'}
  </button>
));

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
