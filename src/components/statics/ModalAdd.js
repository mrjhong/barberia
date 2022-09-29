import React, { Component } from 'react'
import $ from 'jquery';
import "../../assets/css/modalRegister.css"

import AuthenticationService from '../../services/AuthenticationService';
import Loading from './Loading';

export class ModalAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            initial: false,
            producto: "",
            precio: "",
            descripcion:"",
            imagen:"",
            disblebtn:true
        };
    }


    changeHandler = (event) => {
        if (this.state.producto=!""){

            this.setState({disblebtn:false})
        }

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }

    changeHandlerImage = (event) => {
        let file = event.target.files[0];
        let nam = event.target.name;
        this.setState({ imagen: file });

        console.log(this.state.imagen);

    }
    prev = () => {
        this.setState({ initial: false })
        
        $(function () {
            setTimeout(function () {
                $(".loading").fadeIn(0);
            }, 0);

            setTimeout(function () {
                $(".formulario").fadeIn(1500);

            }, 2000);

            setTimeout(function () {
                $(".loading").fadeOut(2500);
            }, 1000);
        
        });

    }
    next = () => {
     
        
        this.setState({ initial: !this.state.initial })
  
        $(function () {
            setTimeout(function () {
                $(".loading").fadeIn(0);
            }, 0);

          

            setTimeout(function () {
                $(".formulario-second").fadeIn(2000);

            }, 1000);

            setTimeout(function () {
                $(".loading").fadeOut(2000);
            }, 1000);
        });
    }
    doProfile = async (event) => {

        event.preventDefault();
        console.log(this.state.imagen);
        let imagen = this.state.imagen;
        const formData = new FormData();

        const user = AuthenticationService.getCurrentUser();
        this.setState({ user: user });

        formData.append("file", this.state.imagen)
        formData.append("usuario", user.id)
        formData.append("producto", this.state.producto)
        formData.append("descripcion", this.state.descripcion)
        formData.append("precio", this.state.precio)
        formData.append("categoria", this.state.categoria)

        AuthenticationService
            .createProduct(
                formData, user.token)
            .then(
                () => {
                    this.props.history.push('/home');
                },
                error => {
                    console.log("Login fail: error = { " + error.toString() + " }");
                    this.setState({ error: "Can not signin successfully ! Please check nombreUsuario/password again" });
                }
            );


    }
    async componentDidMount() {

        const user = AuthenticationService.getCurrentUser();
        this.setState({ user: user })

        $(function () {
          

            setTimeout(function () {
                $(".formulario").fadeIn(1500);

            }, 2000);

            setTimeout(function () {
                $(".loading").fadeOut(2500);
            }, 1000);
        
        });


    }

    render() {
        return (
            <div>
                <div class="modal fade" id="addproduct" data-bs-backdrop="static" data-bs-keyboard="false" show="true" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">

                        <div class="modal-content">

                            <div class="modal-header">

                                <h5 class="modal-title" id="staticBackdropLabel">Añadir Producto</h5>
                                <button type="button" onClick={this.prev} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div className="loading"><Loading /></div>
                                    <form onSubmit={this.doProfile} >

                                        {(this.state.initial === false) ?
                                            <div className='formulario'>
                                                <div class="mb-3">
                                                    <label for="Producto" class="form-label">producto</label>

                                                    <input type="text"
                                                        class="form-control input-register"
                                                        placeholder="Producto"
                                                        id="Producto"
                                                        name="producto"
                                                        onChange={this.changeHandler} />

                                                </div>
                                                <div class="mb-3">
                                                    <label for="Producto" class="form-label">Descripcion</label>
                                                    <textarea
                                                        class="form-control input-register"
                                                        placeholder="Descripcion"
                                                        id="Descripcion"
                                                        name="descripcion"
                                                        onChange={this.changeHandler} />


                                                </div>
                                                <div class="mb-3">
                                                    <label for="Precio" class="form-label">Precio</label>

                                                    <input type="text"
                                                        class="form-control input-register"
                                                        placeholder="Precio"
                                                        id="Precio"
                                                        name="precio"
                                                        onChange={this.changeHandler} />

                                                </div>
                                                <div>
                                                    <button onClick={this.next} class="btn btn-dark btn-rmodal " disabled={this.state.disblebtn} >{this.state.disblebtn}siguiente</button>
                                                </div>

                                            </div>

                                            :

                                            <div className='formulario-second' style={{display: "none"}}>

                                                <div class="mb-3">

                                                    <label for="facebook" class="form-label">Foto de perfil</label>
                                                    <input type="file"

                                                        class="form-control input-register input-img"
                                                        name="foto"
                                                        id="foto"
                                                        onChange={this.changeHandlerImage}
                                                    />
                                                    <img src={this.state.fileimg} alt="" class="img-thumbnail" />
                                                </div>

                                                <div class="mb-3">

                                                    <label for="facebook" class="form-label">Perfil de facebook</label>
                                                    <input type="text"

                                                        class="form-control input-register"
                                                        placeholder="www.facebok.com (opcional)"
                                                        name="facebook"
                                                        id="facebook"
                                                        onChange={this.changeHandler}
                                                    />
                                                </div>

                                                <div class="mb-3">

                                                    <label for="instagram" class="form-label">Perfil de instagram</label>
                                                    <input type="text"

                                                        class="form-control input-register"
                                                        placeholder="www.instagram.com (opcional)"
                                                        name="instagram"
                                                        id="instagram"
                                                        onChange={this.changeHandler}
                                                    />
                                                </div>

                                                <div >
                                                    <button type="submit" className="btn btn-dark btn-rmodal" id="search"> <span className="glyphicon glyphicon-search"></span> Publicar</button>
                                                </div>


                                            </div>}
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalAdd