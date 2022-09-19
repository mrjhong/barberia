import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import Carousel from './home/carousel/Carousel';
import NavBar from './NavBar';
//import "../assets/css/home.css"
import Productos from './productos';
import ProductsCategory from './ProductsCategory';

class Inmuebles extends Component {

  constructor(props) {
    super(props);
    this.state = {productos:undefined}
  }

  async  componentDidMount() {
 
  }


  render() {

    return (
<div>
  
  <Carousel/>
  <div> 
    <ProductsCategory productos={"inmuebles"}/>
  </div> 

</div>
    );
  }
}

export default Inmuebles;