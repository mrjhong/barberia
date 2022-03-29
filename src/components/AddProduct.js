import * as React from 'react';
import { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import "../assets/css/AddProduct.css"

import NavBar from './NavBar';
import { Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AddProduct extends Component {


    constructor(props) {
        super(props);
        this.state = {
          producto: "producto",
          precio: "precio",
          descripcion:"descripcion",
          imagen:"imagen"
        }
      };

      changeHandler = (event) => {
       
        let nam = event.target.name;
        let val = event.target.value;
     
        this.setState({[nam]: val});
        

      }

      changeHandlerImage = (event) => {
        let file = event.target.files[0];
        let nam = event.target.name; 
        this.setState({imagen:file});
  
        console.log(this.state.imagen);
  
      }


      doProfile = async (event) => {
       
        event.preventDefault();
        console.log(this.state.imagen);
        let imagen = this.state.imagen;
        const formData= new FormData();

        const user = AuthenticationService.getCurrentUser();
        this.setState({ user: user });
       
        formData.append("file",this.state.imagen) 
        formData.append("usuario",user.id)
        formData.append("producto",this.state.producto) 
        formData.append("descripcion",this.state.descripcion) 
        formData.append("precio",this.state.precio)
        formData.append("categoria",this.state.categoria)



                AuthenticationService
                .createProduct(
                    formData,user.token)
             .then(
                () => {
                  this.props.history.push('/home');
                },
                error => {
                  console.log("Login fail: error = { " + error.toString() + " }");
                  this.setState({error: "Can not signin successfully ! Please check nombreUsuario/password again"});
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
        const perfil = this.state.perfil;
        if (user) {
         
            userInfo = (
              
                   
                <div>                        
                   <div className="container-add" id="advanced-search-form">
                        <form className='formularioProduct' onSubmit={this.doProfile}>
                        <h2>Publica Un Producto o Servicio</h2>
                            <div className="form-group">
                                <label for="Producto">Producto</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Producto"
                                  id="Producto"
                                  name="producto"
                                  onChange={this.changeHandler}
                                   />
                            </div>
                            <div className="form-group">
                                <label for="">Descripcion</label>
                                <input type="text"
                                 className="form-control"
                                 placeholder="Descripcion" 
                                 id="Descripcion"
                                 name="descripcion"

                                 onChange={this.changeHandler}
                                 />
                            </div>
                            <div className="form-group">
                                <label for="precio">Precio</label>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Precio" 
                                    id="Precio"
                                    name="precio"
                                    onChange={this.changeHandler}
                                    />
                            </div>
            
                            <div className="form-group">
                                <label for="imagen">Imagen De Producto</label>
                                <input type="file"
                                 className="form-control" 
                                 placeholder="imagen del producto" 
                                 id="imagen"
                                 name="imagen"
                                 onChange={this.changeHandlerImage}
                                 />
                            </div>

                            <div className="form-group">
                            <label for="categoria">Categoria</label>
                            <select className="form-control" 
                            placeholder='selecciona una categoria' 
                            name="categoria"
                            onChange={this.changeHandler}>
                                
                                    <option value="">selecciona una categoria</option>
                                    <option value="tecnologia">tecnologia</option>
                                    <option value="automotriz">automotriz</option>
                                    <option value="ropa">ropa</option>
                                    <option value="inmuebles">inmuebles</option>
                                    <option value="otros">otros</option>


                                </select>
                            </div>

                            



                                 
                            <div >
                            <button type="submit" className="btn btn-info btn-lg btn-responsive" id="search"> <span className="glyphicon glyphicon-search"></span> Publicar</button>
                        
                            </div>
                        </form>
                    </div>
                </div>
            );
            }else { // not login
              userInfo = <div style={{ marginTop: "20px" }}>
              <Alert variant="primary">
                <h2>Profile Component</h2>
                <Button color="success"><Link to="/signin"><span style={{ color: "white" }}>Login</span></Link></Button>
              </Alert>
            </div>
          }


        return (
            <div>
            <NavBar/>

            <div>

              {userInfo}
              </div>
            </div>
        )
    }
}

