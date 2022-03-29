import { Link } from "react-router-dom";
import React, { Component } from "react";
import NavBar from "./NavBar";
import "../assets/css/perfil.css";
import AuthenticationService from "../services/AuthenticationService";
import { Alert, Button } from "reactstrap";
import Cards from "./Cards";
import MisProductos from "./misProductos";
import { useParams } from "react-router-dom";


class Perfil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      perfil: undefined,
      idRuta:undefined,
    };

  }

  async componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    const id=this.props.match?.params.noteId;
    this.setState({ user: user });
     const perfil = await  AuthenticationService.findById(id);
    this.setState({ perfil: perfil,idRuta:id
    });
      
    
  }


  render() {
    let userInfo = "";
    const user = this.state.user;
    const perfil = this.state.perfil;
    const idRuta= this.state.idRuta;


    
    // login
    if (user && user.token) {


      if (perfil && perfil.foto) {
        let roles = "";

        user.authorities.forEach(authority => {
          roles = roles + " " + authority.authority
        });
          

        userInfo = (

          <div>
           
            <div className="contenedor">
              <div className="fondo"></div>
              <div className="contenido">
                <div className="imagen">
                  <img
                    className="conteImagen"
                    src={"http://192.168.0.8/perfiles/" + perfil.foto}
                    alt={perfil.nombre}

                  
                  />
           
                </div>

                <h1 className="conttitle">{perfil.nombreUsuario}</h1>
                <h5 className="conttitlee">{perfil.descripcion}</h5>

                <h4 className="conttitlee">CONTACTO</h4>
                 

                

                <div className="row">

                  <div className="col address">
                    
                    <h4><i className="bi bi-envelope"/> Email:</h4>
                    <p>{perfil.email}</p>
                    
                  </div>


                 
                  <div className="col horarios">
                    
                    <h4><i className="bi bi-telephone"></i> Telefono:</h4>
                    <p>
                    {perfil.telefono}
                    </p>
                  </div>
                  
                  
              

                  </div>
                  



  


                <div className="redesPer">
                  <a href={perfil.instagram} className="editarRedes" target="_blank">
                    <i className="bi bi-facebook"></i>
                  </a>

                  <a href={perfil.instagram} className="editarRedes" target="_blank">
                    <i className="bi bi-instagram"></i>
                  </a>

              
                  <a href={perfil.whatsapp} className="editarRedes" target="_blank">
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </div>
                  <p className="contParrafo">
                    <h2 className="sobre">Mis Productos</h2>
                    
                  </p>
                 
                  
                <div className="contenidoPortafolio">
                    <MisProductos idPerfil={idRuta} />
                  </div>
                <div className="portafolio">
                
               

                




                </div>
              </div>
            </div>

          </div>
        );


      } else {
        if(user.id==idRuta){
        userInfo = <div style={{ marginTop: "20px" }}>
          <Alert variant="primary">
            <h2>Completa tu perfil</h2>
            <Button color="success"><Link to="/welcome"><span style={{ color: "white" }}>Siguiente</span></Link></Button>
          </Alert>
        </div>}else {
            userInfo = <div style={{ marginTop: "20px" }}>
            <Alert variant="primary">
              <h2>perfil no encontrado</h2>
            </Alert>
            </div>
        }

      }
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
        <NavBar />

        {userInfo}
      </div>
    );
  }
}


export default Perfil;
