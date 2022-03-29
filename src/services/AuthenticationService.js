import axios from "axios";



class AuthenticationService {
  signin = (nombreUsuario, password) => {
      return axios.post("/auth/login", {nombreUsuario, password})
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          else{
            console.log("hello world");
          }
          console.log("error 2"+response.data);
          return response.data;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
  }

  signOut() {
    localStorage.removeItem("user");
  }
 
  servicios=()=>{
    return axios.get("/servicio/lista")
        .then(response => {
          return response.data;
        })
        .catch(err => {
          console.log("err");
          throw err;
        });
  }
    
  misServicios=(IdPerfil)=>{
    return axios.get("/servicio/misproductos/"+IdPerfil)
        .then(response => {
          return response.data;
        })
        .catch(err => {
          console.log("err");
          throw err;
        });
  }

  categories=(categoria)=>{
    return axios.get("/servicio/category/"+categoria)
        .then(response => {
          return response.data;
        })
        .catch(err => {
          console.log("err");
          throw err;
        });
  }

  register = async(nombre, nombreUsuario,password) => {
    return axios.post("/auth/nuevo", {
      nombre,
      nombreUsuario,
      password
    });
  }


  createProfile = (descripcion, email,telefono,usuario,token) => {  
    return axios.post("/secperfil/crearperfil", {
      descripcion,
      telefono,
      usuario
    },
    {
      headers: {
        Authorization: "Bearer "+token
      }
    });
  }

  createPerfil = (FormData,token) => {
    console.log(FormData);
    
    


    return axios.post(
      "/secperfil/upload",             
    FormData,
  
    {
      headers: {
        Authorization: "Bearer "+token,
          "Content-type": "multipart/form-data",
      },                    
    }
    
    );
  }


  createProduct = (FormData,token) => {
    console.log(FormData);
    
    


    return axios.post(
      "/servicio/upload",             
    FormData,
  
    {
      headers: {
        Authorization: "Bearer "+token,
          "Content-type": "multipart/form-data",
      },                    
    }
    
    );
  }

      
 
  findById = (IdPerfil) => {
    
    return axios("/auth/profile/"+IdPerfil) 

    .then(response => {
      try {
        return response.data;
      } catch (error) {
        console.log("h")
      }
      
    })
    ;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthenticationService();