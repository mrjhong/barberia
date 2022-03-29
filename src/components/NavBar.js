import React, { Component,useState  } from 'react';
import {Collapse,  Button } from 'reactstrap';


import { Link, withRouter } from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService';
import "../assets/css/NavBar.css"



class NavBar extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { collapse: false };
		this.state = {isOpen: false};
		this.state = {user: undefined, perfil:undefined};
		this.toggle = this.toggle.bind(this);
	
		this.state = {
		  showUser: false,
		  showAdmin: false,
		  nombreUsuario: undefined,
		  foto:undefined,
		  login: false,
		
		};
	  }  



	  async componentDidMount() {
		const user = AuthenticationService.getCurrentUser();
	
		if (user) {
		  const roles = [];
	
		  user.authorities.forEach(authority => {
			roles.push(authority.authority)
		  });
		  const perfilId =user.id;
		  const perfil =await AuthenticationService.findById(perfilId);
		  this.setState({ perfil:perfil });

		  this.setState({
			showUser: true,
			showAdmin: roles.includes("ROLE_USER"),
			login: true,
			user:user.nombreUsuario,
			foto:perfil.foto,
			id:perfil.id
		  });
		}
	  }
	  signOut = () => {
		AuthenticationService.signOut();
		this.props.history.push('/');
		window.location.reload();
	  }
	  toggle() {
		this.setState({ collapse: !this.state.collapse });
	  }

	
	render(
  ) {const user = this.state.user; 
   


    return (
		
        <div>
        
		

     
        <section className="ftco-section">
		<div className="container-fluid px-md-5">
			<div className="row justify-content-between">
				<div className="col-md-8 order-md-last">
					<div className="row">
						<div className="col-md-6 text-center">
							<a className="navbar-brand" href="/">FreeCommerce <span>COMPRA y PUBLICA</span></a>
						</div>
						<div className="col-md-6 d-md-flex justify-content-end mb-md-0 mb-3">
					
						</div>
					</div>
				</div>
				<div className="col-md-4 d-flex">
							
										{
						this.state.login ? (
							
								<div className="auth">
									
										<Button className="mb-0 d-flex  align-items-center" onClick={this.signOut}>salir<icon className="fa fa-sign-out col-md-1  align-items-center d-flex"/></Button>          
										<a href="/profile" className="d-flex align-items-center justify-content-center"><span img src="https://bit.ly/3mvnYnL"><i className="sr-only">Instagram</i></span></a>
									
										<a
											className="avatar"
											href={"/profile/"+this.state.id}
										
										>
											<img
											className="avatar"
											width="50resm"
											height="50rem"
											alt={this.state.user}
											src={"http://192.168.0.8/perfiles/"+this.state.foto}
											></img>
										</a>
										
										<a  className="d-flex align-items-center justify-content-center " color="black !important" href="/welcome" title="Editar Perfil">{this.state.user} <i className="bi bi-pen" /></a>
									<div className='social-media'>
									<p className="mb-0 d-flex">
										<a className="d-flex align-items-center justify-content-center "  href="/addproduct" title="Agregar Un Producto"><span className="fa fa-plus"><i className="sr-only">Agregar Un Producto</i></span></a>
										</p>
										</div>
										
								
							</div>                
						) : (

							<div className="col-md-4 d-flex">
								<div className="social-media">
									<p className="mb-0 d-flex">
										<a  href="/signin"  className="d-flex align-items-center justify-content-center" ><span className="fa fa-user"><i className="sr-only">Twitter</i></span></a>
										
										<a href="/signUp" className="d-flex align-items-center justify-content-center"><span className="fa fa-key"><i className="sr-only">Instagram</i></span></a>
									</p>			
								</div>
							</div>
						)
						}
				</div>
			</div>
		</div>
		<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div>
 
</div>
		<div className="container-fluid">
	    
	      <button className="navbar-toggler"
		   type="button" 
		   data-toggle="Collapse" 
		   data-target="#ftco-nav"
		    aria-controls="ftco-nav"
			 aria-expanded="false" 
			 aria-label="Toggle navigation"
			 onClick={this.toggle}>
	        <span className="fa fa-bars"></span> Menu
	      </button>
	      <Collapse className="Collapse navbar-collapse" id="ftco-nav" isOpen={this.state.collapse}>
	        <ul className="navbar-nav m-auto">
	        	<li className="nav-item active"><Link to="/" className="nav-link">inicio</Link></li>
	        	<li className="nav-item dropdown">
            </li>
	        	<li className="nav-item"><Link to="/tecnologia" className="nav-link">Tecnologia</Link></li>
	        	<li className="nav-item"><Link to="/inmuebles" className="nav-link">Inmuebles</Link></li>
	         	<li className="nav-item"><Link to="/automotriz" className="nav-link">Automotriz</Link></li>
			    <li className="nav-item"><Link to="/ropa" className="nav-link">Ropa</Link></li>
				<li className="nav-item"><Link to="/otros" className="nav-link">Otros</Link></li>


	        </ul>
	      </Collapse>
	    </div>
	  </nav>
 

	</section>



    </div>)
  }
}

export default withRouter(NavBar);
