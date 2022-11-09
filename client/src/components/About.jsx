import React from "react";
import NavBar from "./NavBar";
import "./about.css"

export default function About() {
  return (
    <>
      <NavBar />
      <div className="contenedor-testimonio">
      <img className="imagen-testimonio"
        src="https://i.pinimg.com/originals/b5/83/25/b58325af22e82a5070b0bd4895d56ae5.jpg"
        alt="Foto de Adriel"
      />
      <div className="contenedor-texto-testominio">
        <p className="nombre-testimonio"><strong>Adriel Isaías Lopez</strong> de Buenos Aires, Argentina</p>
        <p className="cargo-testimonio">Estudiante Full-Stack en <strong>SoyHenry</strong></p>
          <p className="texto-testimonio">"Me presento, tengo 22 años y me toco desarrollar este proyecto individual de página web sobre perros, en la misma utilicé diferentes tecnologías tales como React, Redux, Express, PostgreSQL y CSS. Se utilizó una API para extraer datos de diferentes razas caninas, pero a su vez cuenta con la funcionalidad de poder crear las propias!"</p>
          <a href="https://github.com/AdrielLopez"><img src="https://img.icons8.com/ios-glyphs/344/github.png" alt="" width="52px" /></a>
          <a href="https://www.linkedin.com/in/adriel-isa%C3%ADas-lopez-decalle-8b152b231/"><img src="https://img.icons8.com/ios-filled/344/linkedin-circled--v2.png" alt="" width="50px" /></a>
          <a href="https://twitter.com/adriellopez__"><img src="https://img.icons8.com/ios-filled/344/twitter-circled--v1.png" alt="" width="50px" /></a>
        </div>
      
      </div>
    </>  
  )
}