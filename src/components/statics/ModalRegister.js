import React, { Component } from 'react'
import "../../assets/css/modalRegister.css"


export class ModalRegister extends Component {
  render() {
    return (
      <div class="modal fade" id="register" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Registrate</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <form className='modal-register'>
                
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Correo Electronico</label>
                    <input type="email" class="form-control input-register" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre de Usuario</label>
                    <input type="email" class="form-control input-register" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                    <input type="password" class="form-control input-register" id="exampleInputPassword1" />
                  </div>
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input input-register" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                  </div>
                  <button type="submit" class="btn btn-dark btn-rmodal">Submit</button>
                </form>
              </div>
            </div>
          
          </div>
        </div>
      </div>


    )
  }
}

export default ModalRegister