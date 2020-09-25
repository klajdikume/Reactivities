import React, { Component } from 'react';
import './App.css';
import { cars } from './demo';
import CarItem from './CarItem';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
  
  state = {
    values: []
  }

  componentDidMount() {

    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        this.setState({
          values: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
        {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
        <ul>
         
        </ul>
      </div>
    );
  }
  
}

export default App;
