import React, { Component } from 'react';
import { Radio } from 'semantic-ui-react';

class Switch extends Component {
  render() {
    return (
      <Radio toggle onChange={this.props.onChange} />
    );
  }
}

export default Switch;

