import React from 'react';
import Slider from 'material-ui/Slider';

export default class SliderWrapper extends React.Component {
 
  onChange(evt, value) {
    
    console.info("event",evt);
    console.info("value",value);
    console.info("props",this.props);

    //if (this.props.onChange) {
      this.props.onChange(evt,value);
    //}
    this.props.onDragStart(evt,value);
    this.props.onDragStop(evt,value);
      
    //Custom callback event handling
    if (this.props.customOnChange){
      this.props.customOnChange(evt, value);
    }

  }
  render() {
    return (
      <Slider {...this.props} onChange={this.onChange.bind(this)}>
        {this.props.children}
      </Slider>
    );
  }
}
