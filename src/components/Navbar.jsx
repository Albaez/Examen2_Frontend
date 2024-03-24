import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Nominaciones al Oscar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              

            

              <li className="nav-item">
                <Link to="/src/components/Muro.jsx" className="nav-link active">
                  Muro
                </Link>
              </li>


              <li className="nav-item">
                <Link to="/src/components/MuroPeliculas.jsx" className="nav-link active">
               Peliculas Nominadas
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/src/components/CrearPeliculas.jsx"
                  className="nav-link active"
                  href="#"
                >
                  Creacion de Peliculas 
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/src/components/Director.jsx"
                  className="nav-link active"
                  href="#"
                >
                  Director
                </Link>
              </li>


              
              <li className="nav-item">
                <Link
                  to="/src/components/Registro.jsx"
                  className="nav-link active"
                  href="#"
                >
                  Registro de Usuario
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/src/components/InicioSesion.jsx"
                  className="nav-link active"
                >
                  Inicio de Sesion
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/src/components/Contactos.jsx" className="nav-link">
                  Contacto
                </Link>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
};
