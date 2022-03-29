import axios from "axios";


const AxiosService = require('axios');

axios.get('/servicio/lista')

  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });

export default new AxiosService ();