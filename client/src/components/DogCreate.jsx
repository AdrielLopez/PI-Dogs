import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions/actions"
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import "./dogcreate.css"

export default function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperaments = useSelector(state => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLife_Span: "",
    maxLife_Span: "",
    img: "",
    temperament: []
  });

  useEffect(() => {
    dispatch(getTemperaments())
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  };
  function handleTemps(e) {
    if (input.temperament.length < 8) {
      let concat = input.temperament.concat(e.target.value);
      setInput({
        ...input,
        temperament: concat,
      });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name) {
      let dogToDispatch = {
        name: input.name,
        height: `${input.minHeight} - ${input.maxHeight}`,
        weight: `${input.minWeight} - ${input.maxWeight}`,
        life_span: `${input.minLife_Span} - ${input.maxLife_Span} years`,
        img: input.img,
        temperament: input.temperament
      }
      dispatch(postDog(dogToDispatch));
      alert("Dog Created!")
      setInput({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minLife_Span: "",
        maxLife_Span: "",
        img: "",
        temperament: [],
      });
      history.push("/home");
    } else {
      alert("You cannot create an empty breed!");
    }
  };


  function validate(input) {
    let errors = {};
    let nameRegex = /^[a-zA-Z-_ ]{3,30}$/;
    if (!input.name) {
      errors.name = "A name is required"
    }
    else if (!nameRegex.test(input.name)) {
      errors.name = "Name is invalid";
    }
    var imgRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
    if (!input.img) {
      errors.img = "Image link can't be blank";
    } 
    else if (!imgRegex.test(input.img)) {
      errors.img = "Must be a image link";
    }
    // Height
    if (!input.minHeight) {
      errors.minHeight = "Min Height can't be blank";
    } 
    else if (input.minHeight <= 0) {
       errors.minHeight = "Must be above zero";
      } 
    else if (input.maxHeight) {
        if (parseInt(input.minHeight) > parseInt(input.maxHeight))
          errors.minHeight = "Min Height can't be greater than Max Height";
      }
    if (!input.maxHeight) errors.maxHeight = "Max Height can't be blank ";
    else if (input.maxHeight <= 0) errors.maxHeight = "Must be above zero";
      // Weight
    if (!input.minWeight) errors.minWeight = "Min Weight can't be blank ";
    else if (input.minWeight <= 0) errors.minWeight = "Must be above zero";
    else if (input.maxWeight) {
      if (parseInt(input.minWeight) > parseInt(input.maxWeight))
          errors.minWeight = "Min Weight can't be greater than Max Weight";
      }
    if (!input.maxWeight) errors.maxWeight = "Max Weight can't be blank ";
    else if (input.maxWeight <= 0) errors.maxWeight = "Must be above zero";
      // Life Span
    if (!input.minLife_Span) errors.minLife_Span = "Min life span can't be blank ";
    else if (input.minLife_Span <= 0) errors.minLife_Span = "Must be above zero";
    else if (input.maxLife_Span) {
      if (parseInt(input.minLife_Span) > parseInt(input.maxLife_Span))
          errors.minLife_Span =
            "Min life span can't be greater than max life span";
      }
    if (!input.maxLife_Span) errors.maxLife_Span = "Max life span can't be blank ";
    else if (input.maxLife_Span <= 0) errors.maxLife_Span = "Must be above zero";
    if (!input.temperament.length) {
      errors.temperament = "At least one temperament is required"
    }
    return errors;
    
  };
  function remove(e) {
    let toDelete = e.target.innerText;
    setInput({
      ...input,
      temperament: input.temperament.filter((e) => e !== toDelete),
    });
  }


  return (
    <div>
      <NavBar/>
      <h1>Create a dog!</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="formcreate">
        <div>
          <label>Name:</label>
          <input type="text" value={input.name} name="name" onChange={handleChange} className="inputdiv" placeholder="Insert a name" />
          {errors.name && <a className="error">{errors.name}</a>}
        </div>
       
        <div>
          <label>Image:</label>
          <input type="text" value={input.img} name="img" onChange={handleChange} placeholder="Insert url" className="inputdiv" />
          {errors.img && <span className="error">{errors.img}</span>}
        </div>
        
        <div className="contenedor">
          <label>Height:</label>
          <input type="number" value={input.minHeight} name="minHeight" onChange={handleChange} placeholder="Min Height" className="inputdiv" min="1" max="70"/>
          {errors.maxHeight && <span className="error">{errors.maxHeight}</span>}
          <input type="number" value={input.maxHeight} name="maxHeight" onChange={handleChange} placeholder="Max Height" className="inputdiv" min="1" max="99" />
          {errors.minHeight && <span className="error">{errors.minHeight}</span>}
        </div>
       
        
        <div className="contenedor">
          <label>Weight:</label>
          <input type="number" value={input.minWeight} name="minWeight" onChange={handleChange} placeholder="Min Weight" className="inputdiv" min="1" max="70" />
          {errors.minWeight && <span className="error">{errors.minWeight}</span>}
          <input type="number" value={input.maxWeight} name="maxWeight" onChange={handleChange} placeholder="Max Weight" className="inputdiv" min="1" max="99" />
          {errors.maxWeight && <span className="error">{errors.maxWeight}</span>}
        </div>
       
        
        <div className="contenedor">
          <label>Life span:</label>
          <input type="number" value={input.minLife_Span} name="minLife_Span" onChange={handleChange} placeholder="Min Life Span" className="inputdiv" min="1" max="16" />
          {errors.minLife_Span && <span className="error">{errors.minLife_Span}</span>}
          <input type="number" value={input.maxLife_Span} name="maxLife_Span" onChange={handleChange} placeholder="Max Life Span" className="inputdiv" min="1" max="22"/>
          {errors.maxLife_Span && <span className="error">{errors.maxLife_Span}</span>}
        </div>
        
        
        <div>
          <label>Temperaments:</label>
          <select onChange={e=> handleTemps(e)} name="temperament" className="inputdiv">
            <option value="">-Select one or more-</option>
            {allTemperaments?.map(el => {
             return (
              <option value={el.name}> {el.name}</option>
             );
           })}
          </select>
        </div>
        <div>
          <ul className="ul">
            {input.temperament.length
              ? input.temperament.map((e, i) => (
                  <li key={i} onClick={remove}>
                    {e}
                  </li>
                ))
              : null}
          </ul>
          {errors.temperament && <span>{errors.temperament}</span>}
        </div>
       

        {Object.keys(errors).length === 0 ? (
          <button type="submit" className="btnCreate">Create new dog!</button>
        ) : (
          <button className="btnCreate"
            disabled={Object.keys(errors).length === 0 ? "" : true}
          >
            Create new dog!
          </button>
        )}
      
      </form>
    </div>
  )

};