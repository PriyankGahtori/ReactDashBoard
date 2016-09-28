
import React from 'react';
import { Link } from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, FlatButton, CardText, List, ListItem, Divider} from 'material-ui';

class CardComponent extends React.Component {
  
  constructor(props){
    super(props); 
    console.log(this.props);
  }
 
  render() {    
  var myStyle ={
    //margin:'0px 2px'
   };

    return (
   <div className="col-md-4" style={{padding:'10px'}}>
    <Card style={{myStyle}}>
    <CardTitle title={this.props.data.type} style={{padding:'10px'}} />
     <Divider />
      <List>
          {
            this.props.data.value.map((value, index) => (
            <Link to ={`/${this.props.data.type.toLowerCase()}/${value.id}`}><ListItem primaryText={value.name} /></Link>
            ))
           }      
      </List>      
    <Divider />
    <CardActions>
      <Link to={`/${this.props.data.type.toLowerCase()}`}><FlatButton label="Show ALL" /></Link>      
    </CardActions>
    
    </Card>
   </div>
    
    );
  }
}


export default CardComponent;