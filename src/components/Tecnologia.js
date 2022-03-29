import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import Carousel from './home/carousel/Carousel';
import NavBar from './NavBar';
import ProductsCategory from './ProductsCategory';

class Tecnologia extends Component {

  constructor(props) {
    super(props);
    this.state = {productos:undefined}
  }

  async  componentDidMount() {
    const categoria="tecnologia";
    const servicios2 =await AuthenticationService.categories(categoria);
     
    this.setState({productos: servicios2});
  }


  render() {

    return (
<div>


  <div >
    <NavBar/> 
  </div>

<Carousel/>

  <div> 
    <ProductsCategory productos={"tecnologia"}/>
  </div> 

</div>
    );
  }
}

export default Tecnologia;