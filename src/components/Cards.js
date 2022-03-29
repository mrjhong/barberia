import React, { Component,useState  } from 'react';


import "../assets/css/Card.css"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';




export default function Cards({ miServicio: { id,categoria, descripcion, foto, nombre, precio,perfil},
}) {
 
  
  
  return (

    <div className="container123">

    <div className="card">
      <div className="card-header">
        <img src={"http://192.168.0.8/productos/" +foto} alt={nombre} />
      </div>
      <div className="card-body">
        <span className="tag tag-pink">{categoria}</span>
        <h2>
          {nombre}
        </h2>
        <p>
          {descripcion}
        </p>
        <p>
        <h5>
          Precio
        </h5>
        {new Intl.NumberFormat("ES-CO", {
          style: "currency",
          currency: "COP"
        }).format(precio)}

        </p>
       <Link to ={'profile/'+perfil.id}
       title="Ver Perfil Del Vendedor">
        <div className="user">
          <img src={"http://192.168.0.8/perfiles/"+perfil.foto} alt="user" />
          <div className="user-info">
            <h5>{perfil.nombre}</h5>
          </div>
        </div>
        </Link>
      </div>
      
    </div>
    </div>
  );
}

  