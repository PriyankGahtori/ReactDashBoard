
import React from 'react';
import { Link } from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, FlatButton, CardText, List, ListItem, Divider} from 'material-ui';

/*import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions'; 
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
*/

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
   <div className="col-md-4" style={{padding:'15px'}}>
    <Card style={myStyle}>
    <CardTitle title={this.props.data.type} />
     <Divider />
      <List>
          {
            this.props.data.value.map((value, index) => (            
              <Link to={`/${this.props.data.type}/${value}`}><ListItem primaryText={value} /></Link>
              
            ))
           }      
      </List>      
    <Divider />
    <CardActions>
      <Link to="/home"><FlatButton label="Show ALL" /></Link>      
    </CardActions>
    
    </Card>
   </div>
    
    );
  }
}


export default CardComponent;