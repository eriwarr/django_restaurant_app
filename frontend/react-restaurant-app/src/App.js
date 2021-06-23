import { Component } from 'react';
import Cookies from 'js-cookie';
import BackendOrder from './Order';
import './App.css';

function MenuList(props) {
  const menuItem = props.menuItems.map((menuItem) => (
    <div className="card-group" key={menuItem.id}>
    <div className="card testing">
      <div className="card-body">
        <img src={menuItem.image} alt=""/>
        <h5 className="card-title">{menuItem.food}</h5>
        <span>${menuItem.price.toFixed(2)}</span>
        <button type="button" className="btn btn-outline-primary" onClick={() => {props.addItem(menuItem);}}>Add to Cart</button>
        <p className="card-text">{menuItem.description}</p>
      </div>
    </div>
  </div>
  ));
  return (
    menuItem
    )
}

class Order extends Component {
  constructor(props){
    super(props);
    this.state = {
      meal: [],
      show: false,
      customer: 'John Smith',
      address: '123 Testing Ln San Diego, CA',
      email: 'jsmith@example.com',
      subtotal: 0,
    }
    this.subtotal = this.subtotal.bind(this);
    this.handleOrder = this.handleOrder.bind(this);

  }
    subtotal(total) {
      const orderTotal = total.reduce((a, e) => a + e, 0);
      return ( (orderTotal.toFixed(2)) )
    }

    handleOrder(event){


      const meal = this.props.order.map((item, index) => (
        item.food
      ));

      const meals = {...meal};

      const total = this.props.order.map((order) => (
         order.price
      ));
      const subtotal = Number(total.reduce((a, e) => a + e, 0).toFixed(2));

      const order = {
        customer: this.state.customer,
        address: this.state.address,
        email: this.state.email,
        order: meals,
        subtotal: subtotal,
      }

      console.log(order)
      const options = {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: JSON.stringify(order),
      }
      fetch('/api/v2/orders/', options)
        .then(response => response.json())
        .then(data => console.log(data));
    }

  render() {

      const total = this.props.order.map((order) => (
         order.price
      ));

      const orderItems = this.props.order.map((item, index) => (
      <li key={index}><span>{item.food} (${item.price.toFixed(2)})</span><button type='button' onClick={ ()=> {this.props.removeItem(item);}}>X</button></li>
      ))

    return (
      <>
        <div>Cart ({total.length})</div>
        <div>Subtotal: ${this.subtotal(total)}</div>
        <button onClick={() => this.setState({show: !this.state.show})}>{this.state.show ? 'Hide order' : 'View Cart'}</button>
        <button type="button" onClick={this.handleOrder}>Submit Order</button>
        { this.state.show && <span>{orderItems}</span> }
      </>
    )
  }
}

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuItems: [],
      order: [],
      view: 1,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(menuItem) {
    const order = [ ...this.state.order ];
    order.push(menuItem);
    this.setState({ order });

  }

  removeItem(item) {
    console.log(item)
  }

  componentDidMount() {
    fetch('/api/v1/menu/')
      .then(response => response.json())
      .then(data => this.setState({ menuItems: data }));
  }

  render() {
    const menuView = [
      <div className="row row-cols-1 row-cols-md-3 g-4 body" >
        <div className="col main">
          <MenuList menuItems={this.state.menuItems} addItem={this.addItem} />
        </div>
        <aside className="order">
          <Order order={this.state.order} removeItem={this.removeItem}/>
        </aside>
      </div>
  ]

  const ordersView = [
    <div>
      <BackendOrder/>
    </div>

  ]
    return (
      <div className="App">
        <h1>`WELCOME TO VIC'S PIZZA`</h1>
      <button type="button" onClick={() => this.setState({view: 1})}>MENU</button>
      <button type="button" onClick={() => this.setState({view: 2})}>ORDERS</button>

      {this.state.view === 1 ? <div>{menuView}</div>: ''}
      {this.state.view === 2 ? <div>{ordersView}</div>: ''}
    </div>
    )
  }
}

export default Menu;
