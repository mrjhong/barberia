import axios from "axios";


const AxiosService = require('axios');
try{
axios.get('/servicio/lista')

  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });
}
catch(e){           
  console.log(e)}
export default new AxiosService ();