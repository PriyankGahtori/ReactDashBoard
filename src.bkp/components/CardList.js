import React from 'react';
import { Link } from 'react-router'

/*
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
*/
import { fetchInitData } from '../actions/index';
import configStore from '../stores/index';

//import combineReducers from '../reducers/index'

//import ajax from 'superagent';

import CardComponent from './CardComponent'

var defaultState = {
  todo: []
};

const store=configStore(defaultState);

//combineReducers();

class CardList extends React.Component {

constructor() {
    super(); 
    this.state = { data: [] };
    console.log("init Data.......................", this.state);
  }



componentWillMount() {
    store.subscribe(() => {
        console.log("callback function called ");
      var state = store.getState();
      this.setState({
        data: state.todo
      });
    });

    store.dispatch(fetchInitData());
    console.log("before subscribe ");
    

    console.log("After subscribe ");

/*    ajax.get('../data.json')
        .end((error, response) => {
            if (!error && response) {
                this.setState({ data: response.body });
        console.log("init Data.......................", this.state);

            } else {
                console.log('There was an error fetching from GitHub', error);
            }
        }
    );*/
}
  
render() {  	
    return (
      <div className="row">       
        {this.state.data.map((data, index) => (            
            <CardComponent key={data.id} data={data}/>
        ))}   
      </div>      
    );
  }
}

function callbackStore() {
    alert();
    
   console.log("callback function called ");
    var state = store.getState();
    console.log('state  ',state);
    //this.setState(state.todo);
}

/*
function mapStateToProps({ initialData }) {
   console.log("pppppppppppppppppppppppp",initialData); 
  return { initialData };
}

//export default connect(mapStateToProps)(CardList);

function mapDispatchToProps(dispatch) {
    console.log("kkkkkk",fetchInitData());
  return bindActionCreators({ fetchInitData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
*/
export default CardList;