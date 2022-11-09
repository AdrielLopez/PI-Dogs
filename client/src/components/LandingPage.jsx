import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css"

export default function LandingPage() {
  return (
    <div className="landingpage">
      <div className="container">
        <h1>Welcome to the dogs page &#128054;</h1>
          <Link to="/home">
            <button className="startbtn">Lets go!</button>
          </Link>
      </div>  
    </div>
  )
}