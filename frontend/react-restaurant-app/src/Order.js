import { Component } from 'react';
import './App.css';

class BackendOrder extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderEntries: [],
    }
    this.handleCompleted = this.handleCompleted.bind(this)
  }

  handleCompleted(){
    console.log('testing')
    
  }

  componentDidMount() {
    fetch('/api/v2/orders/')
      .then(response => response.json())
      .then(data => this.setState({ orderEntries: data }));
  }

  render() {
      const display = this.state.orderEntries.map((item, index) => (
        <table key={index}>
          <tr>
            <th>Order#: {index + 1}</th>
              <td>Name:{item.customer}</td>
              <td>Address: {item.address}</td>
              <td>Email: {item.email}</td>
              <td>Total: ${item.subtotal}</td>
          </tr>
          <button type='button' onClick={this.handleCompleted}>Completed</button>
        </table>
      ))

    return(
      <>
      {display}
      </>
    )
  }
}

export default BackendOrder;
