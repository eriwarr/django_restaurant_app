import './App.css';
import { Component } from 'react';
const buffaloChicken = "https://blogchef.net/wp-content/uploads/2009/01/buffalo_chicken_pizza_1-1.jpg";
const calzone = "https://www.happyfoodstube.com/wp-content/uploads/2016/03/calzone-pizza-recipe.jpg";
const wings= "https://cdn.vox-cdn.com/thumbor/37Er_wqoqG0DFAwK3k8t8-xv7bw=/0x0:1440x1440/1200x900/filters:focal(605x605:835x835)/cdn.vox-cdn.com/uploads/chorus_image/image/61877527/118316077_1579861602185270_1546917259458022944_o.19.jpg";
const argulaSalad = "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FSeries%2F2019-06-snapshot-cooking-lettuce-base-5-ways%2FSnapshot-Lettuce-Base-Arugula--_strawberries-pistachios-basil_70936";
const bread = "https://www.dvo.com/link/0720_232532456.jpg";

function MenuList(props) {
  const menuItem = props.menuItems.map((menuItem) => (
    <div className="card-group" key={menuItem.Id}>
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
      order: [],
      show: false,
    }
    this.subtotal = this.subtotal.bind(this);
    this.handleOrder = this.handleOrder.bind(this);

  }
    subtotal(total) {
      const orderTotal = total.reduce((a, e) => a + e, 0);
      return ( (orderTotal.toFixed(2)) )
    }

    handleOrder(event){
      event.preventDefault();
      
    }

  render() {

    const total = this.props.order.map((order) => (
       order.price
    ));

    const orderItems = this.props.order.map((item, index) => (
      <li><span>{item.food} (${item.price.toFixed(2)})</span></li>
    ))

    return (
      <>
        <div>Cart ({total.length})</div>
        <div>Subtotal: ${this.subtotal(total)}</div>
        <button onClick={() => this.setState({show: !this.state.show})}>{this.state.show ? 'Hide order' : 'View Cart'}</button>
        <button type="submit" onClick={this.handleOrder}>Submit Order</button>
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
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(menuItem) {
    const order = [ ...this.state.order ];
    order.push(menuItem);
    this.setState({ order });

  }

  componentDidMount() {
    fetch('/api/v1/menu/')
      .then(response => response.json())
      .then(data => this.setState({ menuItems: data }));
  }

  render() {

    return (
      <>
      <nav className="App-header">
      WELCOME TO VIC'S PIZZA
      </nav>
      <div className="row row-cols-1 row-cols-md-3 g-4 body">
        <div className="col main">
          <MenuList menuItems={this.state.menuItems} addItem={this.addItem} />
        </div>
        <aside className="order">
          <Order order={this.state.order} />
        </aside>
      </div>
      </>
    )
  }
}

export default Menu;
