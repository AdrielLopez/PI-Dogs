import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

export default function Card({ name, img, temperament, weight, id }) {
  return (
    <>
    <Link to={`/detail/${id}`} style={{textDecoration: 'none'}}>
      
      <div style={{backgroundColor: "white"}} className="card">
          <img src={img} alt="image not found" className="imagen" />
          <div className="cardText">
          <h3>{name}</h3>
          <h5>{temperament}</h5>
          <h6>Weight: {weight}</h6>
          </div>
        
        </div>
      
      </Link>  
    </>
  )
}