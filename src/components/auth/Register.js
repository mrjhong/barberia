import React, { Component } from 'react';
import NavBar from '../NavBar';
import { Alert, Button } from 'reactstrap';
//import avatar from '../../avatar.png';
import '../../assets/css/register.css';
import AuthenticationService from '../../services/AuthenticationService';
import Perfil from '../Perfil';
import swal from 'sweetalert';



const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
          nombre: "",
          nombreUsuario: "",
          email: "",
          password: "",
          message: "",
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
      
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
            
        })  
      }
    
      signUp = (e) => {
        e.preventDefault();
        const valid = validateForm(this.state.errors);
        this.setState({validForm: valid});
        if(valid){
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
                        ()=> {

              this.props.history.push('/welcome');
            })
              this.setState({
                
                message: response.data.mensaje,
                successful: true
              });
            
            },
            error => {
              console.log(error.response.data);
              swal({title:error.response.data.mensaje,
                text: "Registrate con un nombre de usuario diferente",
                icon: "error",});

              this.setState({
                successful: false,
                message: error.response.data.mensaje
            
              });
            }
            
            );       
  
        }else{
          if(this.state.errors.password){
          swal({title:this.state.errors.password,
            text: "Rnhgistrate con un nombre de usuario diferente",
            icon: "error",});}
        }
        if(this.state.errors.nombreUsuario){
          swal({title:this.state.errors.nombreUsuario,
            text: "ingresa un nombre de usuario mas largo!",
            icon: "error",});}

    }    

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    this.setState({user: user});
  }

  render() {


    
    


    let register  = "";
    const user = this.state.user;
    
    if (user && user.token) {
     
      register=(
      <div>
        <Perfil/>
      </div>
      );
    }else{
     register=( <div>
      <NavBar/>
      


      <div className='contenedorAuth'>
      <div className="mobile-screen">
          <div class="header">
              <h1>Registro</h1>
          </div>
          
          <div className="logo"></div>
     
          <form id="registration-form" onSubmit={this.signUp}>

              <input 
                  type="text"        
                  placeholder="Tu Nombre Completo"
                  name="nombre"
                  id="nombre"
                  value={this.state.nombre}
                  autoComplete="nombre"
                  onChange={this.changeHandler}
                 />
              <input 
                 type="text" 
                 placeholder="Nombre De Usuario"
                 name="nombreUsuario" id="nombreUsuario"
                 value={this.state.nombreUsuario}
                 autoComplete="nombreUsuario"
                 onChange={this.changeHandler}        
              />                 
                <input 
                  type="password"
                  name="password" 
                  id="password"
                  value={this.state.password}
                  placeholder="Contraseña"
                  autoComplete="password"
                  onChange={this.changeHandler}
               />


                 <Button className="login-btn"  type="submit"
                 >
                   REGISTRATE
                 </Button>

            
          </form>

      
          
          <div className="other-options">
              <div className="option" id="newUser"><a  href="/signin" className="option-text">Inicia Sesion</a></div>
          </div>
          
          </div>

      </div>
    </div>)
    }
    return (  
      <div>
      {register}
    </div>  
     );
  }
}

export default Register;