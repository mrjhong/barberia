import React, { Component } from 'react';
//import AppNavbar from './AppNavbar';

import { Button } from 'reactstrap';
import AuthenticationService from '../../services/AuthenticationService';
//import avatar from '../../avatar.png';
import NavBar from '../NavBar';
import '../../assets/css/login.css';
import Home from "../Home"

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nombreUsuario: "",
      password: "",
      error: "",
      user: undefined
    };
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    this.setState({user: user});
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }


 doLogin = async (event) => {
   event.preventDefault();
   AuthenticationService
        .signin(this.state.nombreUsuario, 
                  this.state.password)
     .then(async () => {
          const user = AuthenticationService.getCurrentUser();
          this.setState({user: user});
          const detallePerfil = await AuthenticationService.findById(user.id);
          this.setState({ perfil: detallePerfil });
          const perfil  = this.state.perfil;

          if (perfil && perfil.foto){
          this.props.history.push("/profile/"+user.id);
          }else{ this.props.history.push('/welcome');}
        },
        error => {
          console.log("Login fail: error = { " + error.toString() + " }");
          this.setState({error: "Can not signin successfully ! Please check nombreUsuario/password again"});
        }
    );
  }

  render() {
    let login  = "";
    const user = this.state.user; 
    if (user && user.token) {
     
      login=(
      <div>
<Home/>      
</div>
      );
    }else{
      login=(
        <div>
        <NavBar/>
        <div className='contenedorAuth'>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'/>
        <div className="mobile-screen">
            <div className="header">
                <h1>Ingresa</h1>
            </div>
            
            <div className="logo"></div>
            

            <form id="login-form" onSubmit={this.doLogin} >
                <input
                    className='texto'
                    type="text"
                    name="nombreUsuario"
                    placeholder="Nombre De Usuario"
                    id="nombreUsuario"
                    value={this.state.nombreUsuario}
                    autoComplete="nombreUsuario"
                    onChange={this.changeHandler}
                />
                <input
                    className='texto'
                    type="password"
                    name="password" 
                    id="password"
                    value={this.state.password}
                    placeholder="contraseña"
                    autoComplete="password"
                    onChange={this.changeHandler}
                />
              <button className="login-btn"  type="submit">
                Ingresa
              </button>
            </form>
            

            
            <div className="other-options">
                <div className="option" id="newUser"><a className="option-text" href="/signup">Registrate</a></div>
            </div>
            
            </div>

        
      </div>
      </div>
        );

    }

    return (
          <div>
            {login}
          </div> 
      );
  }
}

export default Login;