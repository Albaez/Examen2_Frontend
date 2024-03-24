import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Contactos } from "./components/Contactos";
import { CrearPeliculas } from "./components/CrearPeliculas";
import { Crearpost } from "./components/Crearpost";
import { EditarPelicula } from "./components/EditarPeliculas";
import { EditarPost } from "./components/EditarPost";
import { Footer } from "./components/Footer";
import { InicioSesion } from "./components/InicioSesion";
import { Muro } from "./components/Muro";
import { MuroPeliculas } from "./components/MuroPeliculas";
import { Navbar } from "./components/Navbar";
import { Registro } from "./components/Registro";

const App = () => {
  const isLoggedIn = true; // Cambia esto a true si el usuario ha iniciado sesión

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/src/components/Registro.jsx" element={<Registro />} />
        <Route path="/src/components/Muro.jsx" element={<Muro />} />
        <Route path="/src/components/Crearpost.jsx/" element={<Crearpost />} />
        <Route
          path="/src/components/EditarPost.jsx/:idPost"
          element={<EditarPost />}
        />
        <Route
          path="/src/components/MuroPeliculas.jsx"
          element={<MuroPeliculas />}
        />
        <Route
          path="/src/components/CrearPeliculas.jsx"
          element={<CrearPeliculas />}
        />
        <Route
          path="/src/components/EditarPeliculas.jsx/:idPelicula"
          element={<EditarPelicula />}
        />
        <Route path="/src/components/Director.jsx" element={< Director />} />
        <Route path="/src/components/Contactos.jsx" element={<Contactos />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
