import React, { Component } from 'react'
import "../../assets/css/modalRegister.css"
import swal from 'sweetalert';
import AuthenticationService from '../../services/AuthenticationService';
import ModalProfile from './ModalProfile';

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export class ModalRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      nombreUsuario: "",
      email: "",
      password: "",
      message: "",
      perfilComplete: false,
      successful: false,
      validForm: true,
      errors: {
        nombre: '',
        nombreUsuario: '',
        email: '',
        password: '',
        message: "",

      }
    };
  }

  changeHandler = (event) => {
    const { name, value } = event.target;

    let errors = this.state.errors;

    switch (name) {
      case 'nombre':
        errors.nombre =
          value.length < 3
            ? 'nombre muy corto'
            : '';
        break;
      case 'nombreUsuario':
        errors.nombreUsuario =
          value.length < 4
            ? 'nombre de usuario muy corto'
            : '';
        break;

      case 'password':

        errors.password =
          value.length < 8
            ? 'Contraseña muy corta'
            : '';

        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors)

    })
  }
  signUp = (e) => {
    e.preventDefault();
    const valid = validateForm(this.state.errors);
    this.setState({ validForm: valid });
    if (valid) {
      AuthenticationService.register(
        this.state.nombre,
        this.state.nombreUsuario,
        this.state.password

      ).then(
        response => {
          console.log(response);
          AuthenticationService
            .signin(this.state.nombreUsuario,
              this.state.password).then(
                () => {

                  this.setState({ perfilComplete: true });
                })
          this.setState({

            message: response.data.mensaje,
            successful: true
          });

        },
        error => {
          console.log(error.response.data);
          swal({
            title: error.response.data.mensaje,
            text: "Registrate con un nombre de usuario diferente",
            icon: "error",
          });

          this.setState({
            successful: false,
            message: error.response.data.mensaje

          });
        }

      );

    } else {
      if (this.state.errors.password) {
        swal({
          title: this.state.errors.password,
          text: "Rnhgistrate con un nombre de usuario diferente",
          icon: "error",
        });
      }
    }
    if (this.state.errors.nombreUsuario) {
      swal({
        title: this.state.errors.nombreUsuario,
        text: "ingresa un nombre de usuario mas largo!",
        icon: "error",
      });
    }

  }
  componentDidMount() {

 
    const user = AuthenticationService.getCurrentUser();
    this.setState({ user: user });
  }

  render() {
    return (
      <div class="modal fade" id="register" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">

          {(this.state.perfilComplete===false) ?
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Registrate</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <form className='modal-register' id="registration-form" onSubmit={this.signUp}>

                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Correo Electronico</label>
                      <input type="email"
                        class="form-control input-register"
                        name="nombre"
                        id="nombre"
                        value={this.state.nombre}
                        autoComplete="nombre"
                        onChange={this.changeHandler} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre de Usuario</label>
                      <input type="text"
                        class="form-control input-register"
                        name="nombreUsuario" id="nombreUsuario"
                        value={this.state.nombreUsuario}
                        autoComplete="nombreUsuario"
                        onChange={this.changeHandler} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                      <input type="password"
                        class="form-control input-register"
                        name="password"
                        id="password"
                        value={this.state.password}
                        autoComplete="password"
                        onChange={this.changeHandler} />
                    </div>
                    <div class="mb-3 form-check">
                      <input type="checkbox" class="form-check-input input-register" id="exampleCheck1" />
                      <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-dark btn-rmodal">Registrate</button>
                  </form>
                </div>
              </div>

            </div>
            : 
            
<ModalProfile/>  
             
          }

        </div>
      </div>


    )
  }
}

export default ModalRegister