import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';
import "../../assets/css/modalRegister.css"
import AuthenticationService from '../../services/AuthenticationService';
import ModalProfile from './ModalProfile';


export class ModalLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nombreUsuario: "",
      password: "",
      error: "",
      user: undefined,
      showModalConfirm: false,
      fileimg: "",
      perfilComplete:true,
      initial: false
    };


  }
  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    this.setState({ user: user });
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
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

  
 
  doLogin = async (event) => {
    event.preventDefault();
    this.setState({ showModalConfirm: !this.state.showModalConfirm })
    AuthenticationService
      .signin(this.state.nombreUsuario,
        this.state.password)
      .then(async () => {
        this.setState({ showModalConfirm: !this.state.showModalConfirm })
        var h = 1
        const user = AuthenticationService.getCurrentUser();
        this.setState({ user: user });
        const detallePerfil = await AuthenticationService.findById(user.id);
        this.setState({ perfil: detallePerfil });
        const perfil = this.state.perfil;

        if (perfil && perfil.foto) {
          this.props.history.push("/profile/" + user.id);
        } else {  this.setState({ perfilComplete: false }); }
      },
        error => {

          console.log("Login fail: error = { " + error.toString() + " }");
          this.setState({ error: "Can not signin successfully ! Please check nombreUsuario/password again" });





          swal({
            title: "error en el inicio de sesion",
            text: "nombre de Usuario/password incorrecto",
            icon: "error",
          });
        }
      );
  }


  render() {
    return (
      <div>
        <div class="modal fade" id="login" data-bs-backdrop="static" data-bs-keyboard="false" show="true" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            {(this.state.perfilComplete===true) ?
              <div class="modal-content">

                <div class="modal-header">

                  <h5 class="modal-title" id="staticBackdropLabel">Iniciar Sesion</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                  <div class="container-fluid">


                    <form className='modal-register' id="login-form" onSubmit={this.doLogin} >
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre de Usuario</label>

                        <input type="email"
                          class="form-control input-register"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp" />

                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Contraseña</label>

                        <input type="password"
                          class="form-control input-register"
                          id="exampleInputPassword1" />

                      </div>
                      <div class="mb-3 form-check">

                        <input type="checkbox"
                          class="form-check-input input-register"
                          id="exampleCheck1" />

                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                      </div>
                      <button type="submit" class="btn btn-dark btn-rmodal">Ingresa</button>
                    </form>


                  </div>

                </div>
              </div>
              :
              
               <ModalProfile/>
            }

              </div>
        </div>
        </div>



        )
  }
}

        export default ModalLogin