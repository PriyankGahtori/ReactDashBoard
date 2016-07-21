import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {hashHistory } from 'react-router';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class Instrumentation extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'a',
    };
  }

  handleChange(value){
    console.log("value in handlechamge--",value)
    this.setState({value: value});
    hashHistory.push(value);
  }

  render() {
    return (
      <div>
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Service Entry Point" value="/" >
        </Tab>

        <Tab label="Backend Detection" value="/instrumentation/backenddetection" >
          
        </Tab>

         <Tab label="Transaction Configuration" value="c">
          
        </Tab>

        <Tab label="Error Detection" value="d">
          <div>
            <h2 style={styles.headline}>Controllable Tab D</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>

        <Tab label="Instrument Monitors" value="e">
          <div>
            <h2 style={styles.headline}>Controllable Tab E</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>
      </Tabs>
      {this.props.children}
      </div>

    );
  }
}