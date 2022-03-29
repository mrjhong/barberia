import * as React from 'react';

import "../assets/css/BodyHome.css"
import AuthenticationService from '../services/AuthenticationService';
import Cards from './Cards';
import { Component } from 'react';

export default class ProductsCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      misProductos: [],
      busqueda: "",
      productos: []
    };

    ;
  };


  onChange = async e => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    console.log(this.state.busqueda)
    this.filtrarElementos();
  }



  async componentDidMount() {

    const servicios = await AuthenticationService.categories(this.props.productos);

    this.setState({ misProductos: servicios });
    this.setState({ productos: servicios });

  };

  filtrarElementos = () => {
    var search = this.state.misProductos.filter(item => {
      if (item.nombre.toLocaleLowerCase().includes(this.state.busqueda.toLocaleLowerCase())) {
        return item;
      }
    });
    this.setState({ productos: search });
  }

  render() {

    return (


      <div className="container">
        <div className="col-lg-10">
          <div className="input-group mb-3 ">
            <input type="text"
              className="form-control"
              placeholder="Buscar Productos...."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              name="busqueda"
              value={this.state.busqueda}
              onChange={this.onChange} />
          </div>
        </div>





        {
          this.state.productos?.map(miServicio => (

            <Cards key={miServicio.id} miServicio={miServicio} />
          ))
        }
      </div>
    )
  }
}

