import React, { Component } from 'react'
import Loading from './Loading';
import $ from 'jquery';
import AuthenticationService from '../../services/AuthenticationService';


export class ModalProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "email",
            telefono: "telefono",
            descripcion: "descripcion",
            user: undefined,
            perfil: undefined,
            foto: "foto",
            defaultCheck1: 0,
            instagram: "/",
            facebook: "/",
            initial: false
        };
    }

    changeHandlerImage = (event) => {
        let file = event.target.files[0];
        let nam = event.target.name;
        this.setState({ foto: file });
        this.setState({
          fileimg: URL.createObjectURL(event.target.files[0])
        })
        console.log(this.state.foto);
    
      }

  

      changeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
    
        this.setState({ [nam]: val });
    
    
      }


      doProfile = async (event) => {

        event.preventDefault();
        console.log(this.state.foto);
        let foto = this.state.foto;
        const imageData = new FormData();
    
        const user = AuthenticationService.getCurrentUser();
        this.setState({ user: user });
    
        imageData.append("file", foto)
        imageData.append("descripcion", this.state.descripcion)
        imageData.append("email", this.state.email)
        imageData.append("telefono", this.state.telefono)
        imageData.append("usuario", user.id)
        imageData.append("facebook", this.state.facebook)
        imageData.append("instagram", this.state.instagram)
        imageData.append("ApWhatsapp", this.state.defaultCheck1)
    
    
    
        AuthenticationService
          .createPerfil(
            imageData, user.token)
          .then(
            () => {
                window.location.href = '/profile/' + user.id
           //   this.props.history.push('/profile/' + user.id);
            },
            error => {
              console.log("Login fail: error = { " + error.toString() + " }");
              this.setState({ error: "Can not signin successfully ! Please check nombreUsuario/password again" });
            }
          );
    
    
    
      }  

    next = () => {
        this.setState({ initial: true })
    }
    async componentDidMount() {

       const user = AuthenticationService.getCurrentUser();
        this.setState({ user: user })

         $(function() {
            setTimeout(function() {
                $(".formulario").fadeIn(1500);
               
            },2000);
         
            setTimeout(function() {
                 $(".loading").fadeOut(2500);
            },1000);
        });

      }
    
    render() {


        return (
            <div>
                <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title" id="staticBackdropLabel">Editar Perfil</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="container-fluid">
                    <div className="loading"><Loading /></div>

                        <form onSubmit={this.doProfile}>
                            
                            
                            {(this.state.initial === false) ?
                                <div className='formulario'>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Email de contacto</label>
                                        <input type="email"
                                            class="form-control input-register"
                                            id="exampleInputEmail1" aria-describedby="emailHelp"
                                            onChange={this.changeHandler}
                                        />
                                    </div>

                                    <div class="mb-3">

                                        <label for="exampleInputEmail1" class="form-label">Descripcion</label>
                                        <input type="text"
                                            name="descripcion"
                                            class="form-control input-register"
                                            id="descripcion"
                                            onChange={this.changeHandler}
                                        />
                                    </div>
                                    <div class="mb-3">

                                        <label for="telefono" class="form-label">Telefono de Contacto</label>
                                        <input type="text"
                                            name="telefono"
                                            class="form-control input-register"
                                            id="telefono"
                                            onChange={this.changeHandler}
                                        />
                                    </div>

                                    <div className="form-check user2">
                                        <div className="form-group" >
                                            <input className="form-check-input"
                                                type="checkbox"
                                                id="defaultCheck1"
                                                name="defaultCheck1"
                                                value={1}
                                                onChange={this.changeHandler}
                                            />
                                            <label className="form-check-label" for="defaultCheck1">
                                                Asociar telefono de contacto a whatsapp existente
                                            </label>
                                        </div>
                                    </div>

                                    <div >
                                        <button onClick={this.next} class="btn btn-dark btn-rmodal" >  siguiente</button>

                                    </div>
                                </div>

                                : <div className='formulario'>

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
        )
    }
}

export default ModalProfile