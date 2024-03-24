import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Muro = () => {
  const [dataMuro, setDataMuro] = useState([]);

  const navigate = useNavigate();

  const [contadorDeBorrar, setContadorDeBorrar] = useState(0);

  const getDatos = async () => {
    const url = "http://localhost:4000/api/publicacion";
    const response = await axios.get(url);
    const datos = (await response).data;
    console.log(datos);
    setDataMuro(datos);
  };

  const borraPublicacion = async (idPost) => {
    const url = `http://localhost:4000/api/publicacion/${idPost}`;
    const response = await axios.delete(url);
    const datos = (await response).data;

    setContadorDeBorrar(contadorDeBorrar + 1);
    console.log(contadorDeBorrar);
  };

  const editarPublicacion = (idPublcacion) => {
    navigate(`/src/components/EditarPost.jsx/${idPublcacion}`);
  };

  const CrearPostHandler = () => {
    navigate("/src/components/Crearpost.jsx");
  };

  // siempre se ejecuta cada vez que se renderiza el componente
  useEffect(() => {
    getDatos();
  }, [contadorDeBorrar]);

  return (
    <>
      <div className="container">
        <button
          onClick={CrearPostHandler}
          className="btn btn-outline-success w-100"
          type="button"
        >
          Crear Post
        </button>

        {dataMuro.map((item) => (
          <div
            key={item.id}
            className="card text-white bg-secondary mx-auto mt-3 mb-3 w-50"
            style={{ width: "80%" }}
          >
            <div className="card-header card border-success d-flex justify-content-end">
              <label>{item.nombre_usuario}</label>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown-menu-right">
                  ...
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-right">
                  <Dropdown.Item onClick={() => editarPublicacion(item.id)}>
                    Editar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => borraPublicacion(item.id)}>
                    Borrar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="card-body card border-success">
              <img
                src={`data:${item.mime_type};base64,${item.imagen}`}
                style={{ width: "100%" }}
              />
            </div>
            <div className="card-fotter">
              <p>{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
