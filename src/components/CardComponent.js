
import React from 'react';
import { Link } from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, FlatButton, CardText, List, ListItem, Divider} from 'material-ui';

class CardComponent extends React.Component {
  
  constructor(props){
    super(props); 
    console.log(this.props);
    this.renderCard = this.renderCard.bind(this);
  }
 
renderCard(data){

  //get the length of data.value
  let length = data.value.length;

  let listItemArr =[];  

    //case 1: length = 0
  if(length === 0){
    listItemArr.push(<ListItem primaryText="No data available" style={{color: '#FFF'}}/>);
      
  }

/* handling case if length < 4 and if loop is made to iterate 4 times than 4th entry would be blank i.e 
* component will be created but with no data
*/

  else if(length <4)
  {
    for(let i=0; i< length; i++)
    {
      listItemArr.push(<Link to ={`/${data.type.toLowerCase()}/${data.value[i].id}`}><ListItem primaryText={data.value[i].name} innerDivStyle={{padding:'10px 12px'}} style={{color: '#FFF'}}/></Link>);
    }
  }  
  else
  {
    for(let i=0; i< 4; i++)
    {
      listItemArr.push(<Link to ={`/${data.type.toLowerCase()}/${data.value[i].id}`}><ListItem primaryText={data.value[i].name} innerDivStyle={{padding:'10px 12px'}} style={{color: '#FFF'}}/></Link>);
    }
  }


return (listItemArr) ;

}

  render() {    
  var myStyle ={
    background: 'rgba(0,0,0,0.3)',
    color: 'white'
    //margin:'0px 2px'
   };

    return (
   <div className="col-md-4" style={{padding:'10px'}}>
    <Card style={{myStyle}}>
    <CardTitle title={this.props.data.type} titleColor='#FFF' titleStyle={{padding:'5px 10px', fontSize:'18px', lineHeight:'28px'}} style={{padding:'0px', background:'#113631'}} />
     <Divider />
      <List style={{background: '#74ACA0', minHeight: '160px'}}>
             {this.renderCard(this.props.data)}
                 
      </List>      
    <Divider />
    <CardActions style={{background: '#456965',height: '38px',padding:'0px'}}>
      <Link to={`/${this.props.data.type.toLowerCase()}`}><FlatButton label="Show ALL" style={{color: '#FFF',float:'right'}}/></Link>      
    </CardActions>
    
    </Card>
   </div>
    
    );
  }
}


export default CardComponent;