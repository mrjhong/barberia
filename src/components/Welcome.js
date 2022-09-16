import * as React from 'react';
import { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import "../assets/css/AddProduct.css"

import NavBar from './NavBar';
import { Alert, Button } from "reactstrap";

import { Link } from 'react-router-dom';

export default class Welcome extends Component {


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
      facebook: "/"
    }
  };

  changeHandler = (event) => {

    let nam = event.target.name;
    let val = event.target.value;

    this.setState({ [nam]: val });


  }

  changeHandlerImage = (event) => {
    let file = event.target.files[0];
    let nam = event.target.name;
    this.setState({ foto: file });

    console.log(this.state.foto);

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
          this.props.history.push('/profile/' + user.id);
        },
        error => {
          console.log("Login fail: error = { " + error.toString() + " }");
          this.setState({ error: "Can not signin successfully ! Please check nombreUsuario/password again" });
        }
      );



  }

  async componentDidMount() {

    const user = AuthenticationService.getCurrentUser();
    this.setState({ user: user });


  };

  render() {
    let userInfo = "";
    const user = this.state.user;
    console.log(user);

    let n = 1;
    // login
  //  if (user) {
    if (1==1) {
      userInfo = (


        <div >

          <div className="container-add" id="advanced-search-form">
            <form className='formularioProduct' onSubmit={this.doProfile}>
              <h2>Edita Tu Perfil</h2>



              <div className="form-group">
                <label for="email">EMAIL DE CONTACTO</label>
                <input type="text"
                  className="form-control"
                  placeholder="email"
                  name="email"
                  id="email"

                  onChange={this.changeHandler}
                />
              </div>
              <div className="form-group">
                <label for="">Descripcion</label>
                <input type="text"
                  className="form-control"
                  placeholder="Descripcion"
                  name="descripcion"
                  id="descripcion"
                  onChange={this.changeHandler}
                />
              </div>
              <div className="form-group">
                <label for="telefono">TELEFONO DE CONTACTO</label>
                <input type="text"
                  className="form-control"
                  placeholder="telefono"
                  name="telefono"
                  id="telefono"

                  onChange={this.changeHandler}
                />
              </div>

              <div class="form-group ">
              <label for="Name">Nombre de Usuario</label>
                <input type="text" class="form-control user" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
              </div>
              <div className="form-group">
                <label for="facebook">LINK FACEBOOK</label>
                <input type="text"
                  className="form-control"
                  placeholder="www.facebok.com (opcional)"
                  name="facebook"
                  id="facebook"

                  onChange={this.changeHandler}
                />
              </div>
              <div className="form-group">
                <label for="instagram">LINK INSTAGRAM</label>
                <input type="text"
                  className="form-control"
                  placeholder="www.instagram.com (opcional)"
                  name="instagram"
                  id="instagram"

                  onChange={this.changeHandler}
                />
              </div>

              <div className="form-group">
                <label for="imagen">FOTO DE PERFIL</label>
                <input type="file"
                  className="form-control"
                  placeholder="foto de perfil"
                  name="foto"
                  id="foto"

                  onChange={this.changeHandlerImage}
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
                <button type="submit" className="btn btn-info btn-lg btn-responsive" id="search"> <span className="glyphicon glyphicon-search"></span> Publicar</button>

              </div>
            </form>
          </div>


        </div>

      );


    } else { // not login
      userInfo = <div style={{ marginTop: "20px" }}>
        <Alert variant="primary">
          <h2>Profile Component</h2>
          <Button color="success"><Link to="/signin"><span style={{ color: "white" }}>Login</span></Link></Button>
        </Alert>
      </div>
    }

    return (
      <div>
       

          {userInfo}
        
      </div>
    )
  }
}

