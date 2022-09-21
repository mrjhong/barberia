import React, { Component } from 'react'
import "../../assets/css/navbar5.css"
import ModalLogin from './ModalLogin'
import ModalRegister from './ModalRegister'
import ModalAdd from './ModalAdd'
import AuthenticationService from '../../services/AuthenticationService';

export class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            perfil: undefined,
            showUser: false,
            showAdmin: false,
            nombreUsuario: undefined,
            foto: undefined,
            login: false,
        }
    }

    async componentDidMount() {
        const user = AuthenticationService.getCurrentUser();

        if (user) {
            const roles = [];

            user.authorities.forEach(authority => {
                roles.push(authority.authority)
            });
            const perfilId = user.id;
            const perfil = await AuthenticationService.findById(perfilId);
            this.setState({ perfil: perfil });

            this.setState({
                showUser: true,
                showAdmin: roles.includes("ROLE_USER"),
                login: true,
                user: user.nombreUsuario,
                foto: perfil.foto,
                id: perfil.id
            });
        }
    }
    signOut = () => {
        AuthenticationService.signOut();
        window.location.href = '/'
        window.location.reload();
    }
    render() {
        return (
            <div><nav class="navbar bg-light ">
                <div class="content-nav">


                    <div class="container-fluid px-md-5">
                        <div class="row justify-content-between">
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-6 text-center">
                                        <a class="navbar-brand" href="/">FreeCommerce <span>COMPRA y PUBLICA</span></a>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-4 d-flex cont-media order-md-first">
                                <div class="col-md-4 d-flex">
                                    {
                                        this.state.login ? (

                                            <div className="content-acces">
                                                
                                                


                                                <a
                                                    className="avatar space-left"
                                                    href={"/profile/" + this.state.id}
                                                >
                                                    <img
                                                        className="avatar"
                                                        width="50resm"
                                                        height="50rem"
                                                        alt={this.state.user}
                                                        src={"http://localhost/perfiles/" + this.state.foto}
                                                    ></img>
                                                </a>

                                               
                                                <div className='social-media'>
                                                    <p className="mb-0 d-flex">
                                                        <button className='d-flex align-items-center justify-content-center buton-media' type="button" title='Agregar producto' data-bs-toggle="modal" data-bs-target="#addproduct"><span class="fa fa-plus media-auth" /></button>
                                                        <ModalAdd />
                                                    </p>
                                                </div>
                                                

                                            </div>
                                        ) : (

                                            <div class="social-media">
                                                <p class="mb-0 d-flex">


                                                    <button className='d-flex align-items-center justify-content-center buton-media' type="button" title='Iniciar Sesion' data-bs-toggle="modal" data-bs-target="#login"><span class="bi bi-person-fill  media-auth" /></button>
                                                    <ModalLogin />
                                                    <button className='d-flex align-items-center justify-content-center buton-media' type="button" title='Registrate' data-bs-toggle="modal" data-bs-target="#register"><span class="fa fa-key  media-auth" /></button>
                                                    <ModalRegister />
                                                </p>
                                            </div>
                                        )
                                    }




                                </div>
                            </div>
                            
                            <div className='col order-last out'>
                            {this.state.login?(
                               
                                  
                            <button type="button" class="btn btn-outline-dark" onClick={this.signOut}>salir <icon className="fa fa-sign-out " /></button>
                            
                            ):""}   
                            </div>  
                                          
                        </div>
                    </div>


                    <nav class="navbar line-dark navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                        <div></div>
                        <div class="container-fluid">
                            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" >
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="Collapse  navbar-collapse collapse">
                                <ul class="navbar-nav  m-auto">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/"> inicio</a></li>
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
    {/*---------------------------sidebar-------------------*/}
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">FreeCommerce</h5>

                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <ul class="navbar-nav">
                                    <li class="nav-item-collapse active">
                                        <a class="nav-link-collapse" href="/"><i class="bi bi-house-fill"/>  inicio</a></li>
                                    <li class="nav-item-collapse"><a class="nav-link-collapse" href="/tecnologia"><i class="bi bi-motherboard-fill"/> Tecnologia</a></li>
                                    <li class="nav-item-collapse"><a class="nav-link-collapse" href="/inmuebles"><i class="bi bi-bank"/> Inmuebles</a></li>
                                    <li class="nav-item-collapse"><a class="nav-link-collapse" href="/automotriz"><i class="bi bi-car-front"/> Automotriz</a></li>
                                    <li class="nav-item-collapse"><a class="nav-link-collapse" href="/ropa"> <i class="bi bi-bag-fill"/> Ropa</a></li>
                                    <li class="nav-item-collapse"><a class="nav-link-collapse" href="/otros"><i class="bi bi-plus-circle-fill"/> Otros</a></li>
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