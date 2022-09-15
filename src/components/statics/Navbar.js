import React, { Component } from 'react'
import "../../assets/css/navbar5.css"
export class Navbar extends Component {
    render() {
        return (
            <div><nav class="navbar bg-light fixed-top">
                <div class="content-nav">


                    <div class="container-fluid px-md-5">
                        <div class="row justify-content-between">
                            <div class="col-md-8 order-md-last">
                                <div class="row">
                                    <div class="col-md-6 text-center">
                                        <a class="navbar-brand" href="/">FreeCommerce <span>COMPRA y PUBLICA</span></a>
                                    </div>
                                    <div class="col-md-6 d-md-flex justify-content-end mb-md-0 mb-3" />

                                </div>
                            </div>
                            <div class="col-md-4 d-flex">
                                <div class="col-md-4 d-flex">
                                    <div class="social-media">
                                        <p class="mb-0 d-flex">
                                            <a href="/signin" class="d-flex align-items-center justify-content-center"><span class="fa fa-user"><i class="sr-only">Twitter</i></span></a>
                                            <a href="/signUp" class="d-flex align-items-center justify-content-center"><span class="fa fa-key"><i class="sr-only">Instagram</i></span></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <nav class="navbar line-dark navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                        <div></div>
                        <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                            <div  class="Collapse  navbar-collapse collapse">
                                <ul class="navbar-nav  m-auto">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/">inicio</a></li>
                                    <li class="nav-item dropdown"></li>
                                    <li class="nav-item"><a class="nav-link" href="/tecnologia">Tecnologia</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/inmuebles">Inmuebles</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/automotriz">Automotriz</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/ropa">Ropa</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/otros">Otros</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">FreeCommerce</h5>

                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <ul class="navbar-nav  m-auto">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/">inicio</a></li>
                                    <li class="nav-item dropdown"></li>
                                    <li class="nav-item"><a class="nav-link" href="/tecnologia">Tecnologia</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/inmuebles">Inmuebles</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/automotriz">Automotriz</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/ropa">Ropa</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/otros">Otros</a></li>
                                </ul>
                            </ul>
                          
                        </div>
                    </div>
                </div>
            </nav></div>
        )
    }
}

export default Navbar