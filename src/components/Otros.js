import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import Carousel from './home/carousel/Carousel';
import NavBar from './NavBar';
//import "../assets/css/home.css"
import Productos from './productos';
import ProductsCategory from './ProductsCategory';

class Otros extends Component {

  constructor(props) {
    super(props);
    this.state = {productos:undefined,  
    }
  }



  render() {

    return (
<div>

  <Carousel/>
 

  <div> 
    <ProductsCategory productos={"otros"}/>
  </div> 

</div>
    );
  }
}

export default Otros;