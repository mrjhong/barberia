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
        const { allCountries, currentCountries, currentPage, totalPages } = this.state;
        const totalCountries = allCountries.length;

        if (totalCountries === 0) return null;

        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
        return (


            <div className="container">
               
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">

              <h2 className={headerClass}>
                <strong className="text-secondary">{totalCountries}</strong> Countries
              </h2>

              { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }

            </div>

            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalCountries} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>

                {
                    this.state.misProductos?.map(miServicio => (

                        <Cards key={miServicio.id} miServicio={miServicio} />
                    ))
                }
            </div>
        )
    }
}

