import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { clearDetail, getDetail } from "../actions/actions"
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import "./dogdetail.css"

export default function Detail(props) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getDetail(props.match.params.id))
  }, [dispatch])

  const myDog = useSelector(state => state.detail)
  return (
    <div>
      <NavBar/>
      {
        myDog.length > 0 ?
          <div className="detaildiv">
            <h1> {myDog[0].name} </h1>
            <img src={myDog[0].img} alt={myDog.name} width="600" />
            <div>
            <p>
              <span className="detailspan">Height:</span> {myDog[0].height} cm
            </p>
            <p>
              <span className="detailspan">Weight:</span> {myDog[0].weight} kg
            </p>
            <p>
              <span className="detailspan">Temperaments:</span> {!myDog[0].createdinDb? myDog[0].temperament : myDog[0].temperaments.map(el => el.name + (", "))} 
            </p>
            <p>
              <span className="detailspan">Life Span:</span> {myDog[0] .life_span}
            </p>
          </div>
          </div> : <img src="https://i.im.ge/2022/09/26/16owTa.perritobasket-unscreen.gif" className="loader"></img>
      } 
    </div>
  )
}