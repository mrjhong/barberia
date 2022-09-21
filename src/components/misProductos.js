import * as React from 'react';

import "../assets/css/BodyHome.css"
import AuthenticationService from '../services/AuthenticationService';
import Cards from './Cards';
import { Component } from 'react';
import Pagination from './statics/Pagination';

export default class MisProductos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            misProductos: [],
            miPerfil: props.idPerfil
        };

    };




    state = { allCountries: [], currentCountries: [], currentPage: null, totalPages: null }



    onPageChanged = data => {
        const { allCountries } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = allCountries.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentCountries, totalPages });
    }









    async componentDidMount() {

        const { data: allCountries = [] } = await AuthenticationService.misServicios(IdPerfil);
        this.setState({ allCountries });
        const IdPerfil = this.props.idPerfil;


        const servicios = await AuthenticationService.misServicios(IdPerfil);

        this.setState({ misProductos: servicios });
    };

    render() {
       
        return (


            <div className="container">
               
          

                {
                    this.state.misProductos?.map(miServicio => (

                        <Cards key={miServicio.id} miServicio={miServicio} />
                    ))
                }
            </div>
        )
    }
}

