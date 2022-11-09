import React, { Fragment } from "react";
import "./home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getTemperaments, orderDogs, filterDogs, getNameDogs, filterApiDb } from "../actions/actions";
import Card from "./Card";
import Paginado from "./Paginado";
import NavBar from "./NavBar";

export default function Home() {
  
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs);
  const allTemperaments = useSelector(state => state.temperaments.sort());
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const [order, setOrder] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };


  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);


  function handleSort(e) {
    e.preventDefault();
    dispatch(orderDogs(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handleSortApiDb(e) {
    e.preventDefault();
    dispatch(filterApiDb(e.target.value));
    setCurrentPage(1);
  }

  function handleTemp(e) {
    e.preventDefault();
    dispatch(filterDogs(e.target.value));
    setCurrentPage(1);
    setOrder(`Filtrado ${e.target.value}`)
  }
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getNameDogs(name))
    
  }, [name])

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    setCurrentPage(1);
  }


  let checkDogs;
  if (currentDogs.length) {
    checkDogs = currentDogs.map(el => {
      if (el.temperaments) {
        let temperaments = "";
      
        el.temperaments.map(temp => temperaments = temperaments.concat( temp.name, ', '));
        temperaments = temperaments.substring(0, temperaments.length - 2);
        el.temperament = temperaments;
      }
      return (
        <Card key={el.id} name={el.name} img={el.img} temperament={el.temperament} weight={el.weight} id={el.id} />
      );
      
  })
  } else {
    checkDogs = <img src="https://i.im.ge/2022/09/26/16owTa.perritobasket-unscreen.gif" className="loading"></img>
  }
  
  
  return (
    <div>
      <NavBar/>
   
      <div>
        <input type="text" placeholder="Buscar raza..." onChange={(e) => handleInputChange(e)} />
        <select onChange={e=> handleSort(e)}>
        <option value="razaAsc">Raza asc</option>
        <option value="razaDesc">Raza desc</option>
        <option value="pesoAsc">Peso asc</option>
        <option value="pesoDesc">Peso desc</option>
        </select>
        <select onChange={e=> handleSortApiDb(e)}>
          <option value="All">All</option>
          <option value="API">API</option>
          <option value="createdinDb">Created</option>
        </select>
      <select onChange={e=> handleTemp(e)}>
      <option value="All">All</option>
      {allTemperaments?.map(el => {
        return (
          <option value={el.name}> {el.name}</option>
        );
      })}
      </select>
      </div>
      <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
      <div id="grid">
        {checkDogs}
      </div>
    </div>
  )


}