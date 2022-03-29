import * as React from 'react';

import "../assets/css/BodyHome.css"
import AuthenticationService from '../services/AuthenticationService';
import Cards from './Cards';
import { Component } from 'react';

export default class MisProductos extends Component {

constructor(props){
    super(props);
    this.state={misProductos:[],
       miPerfil:props.idPerfil };

};

async componentDidMount() {
    const IdPerfil = this.props.idPerfil;


    const servicios  =await AuthenticationService.misServicios(IdPerfil);
 
    this.setState({misProductos: servicios});
};

    render()       
    { 
         
  return (
   
     
      <div className="container">
     
      {        
        this.state.misProductos?.map(miServicio=>(
          
              <Cards key={miServicio.id} miServicio={miServicio}/>     
      ))
      }
      </div>
  )
 }
}

