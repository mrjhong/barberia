import React from "react";
import { NavbarWrapper } from "./styles/NavbarStyles";

function Items({ open }) {
  return (
    
    <button className="navbar-toggler"
    type="button" 
     data-toggle="collapse" 
     data-target="#ftco-nav"
      aria-controls="ftco-nav"
       aria-expanded="false" 
       aria-label="Toggle navigation"
       open={open} >
          <span 
          className="fa fa-bars"
          >
          </span> Menu
     

   	        <ul className="navbar-nav m-auto">
	        	<li className="nav-item active"><a href="#" class="nav-link">Home</a></li>
	        	<li className="nav-item dropdown">
           
            </li>
	        	<li className="nav-item"><a href="#" class="nav-link">Work</a></li>
	        	<li className="nav-item"><a href="#" class="nav-link">Blog</a></li>
	          <li className="nav-item"><a href="#" class="nav-link">Contact</a></li>
	        </ul>
    </button>
  );
}

export default Items;