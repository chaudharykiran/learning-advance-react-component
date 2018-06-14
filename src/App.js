import React, { Component } from 'react';
import Toggle, { MyToggleButton } from './toggle';


class App extends Component {
  logToogle = (on) => {
    console.log(on);
  }

  render() {
    return (
      <Toggle onToggle={this.logToogle}>
        <MyToggleButton />
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
      </Toggle>
    );
  }
}

export default App;
