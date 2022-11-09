import React from "react";
import "./navbar.css"
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div class="page">
    <nav class="page__menu menu">
      <ul class="menu__list r-list">
        <li class="menu__group"><Link to="/home" class="menu__link r-link text-underlined">Home</Link></li>
        <li class="menu__group"><Link to="/dog" class="menu__link r-link text-underlined">Create Dog</Link></li>
        <li class="menu__group"><Link to="/about" class="menu__link r-link text-underlined">About</Link></li>
      </ul>
    </nav>
  </div>
)
    
 
}