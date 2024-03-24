import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Registro } from './Registro';

export const InicioSesion = () => {
  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    nombre_usuario: "",
    pass: "",
  });

  const [inicioSesion, setInicioSesion] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const submitHandler = async () => {
    event.preventDefault();

    const url = `http://localhost:4000/api/usuario/auth/${dataForm.nombre_usuario}/${dataForm.pass}`;

    try {
      const result = await axios.get(url);
      const resultData = (await result).data;
      navigate("/registro");
    } catch (err) {
      setInicioSesion("Error de Inicio de Sesion");
    }
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <>


      <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal" style={{ backgroundImage: 'url("/public/oscar.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Modal.Header closeButton>
          <Modal.Title>{showRegistro ? 'Registro' : 'Iniciar Sesión'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showRegistro ? <Registro /> : (
            <>
              
              <form onSubmit={submitHandler}>
                <fieldset>
                  

                  <div className="row">
                    <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control-plaintext"
                      name="nombre_usuario"
                      placeholder="Ingrese su usuario"
                      onChange={onChangeHandler}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Nunca compartas tu usuario con otras personas.
                    </small>
                  </div>

                  <div className="row">
                    <label htmlFor="exampleInputPassword1" className="form-label mt-4">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control-plaintext"
                      name="pass"
                      placeholder="Ingrese su contraseña"
                      autoComplete="off"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <button type="submit" className="btn btn-secondary w-100 mt-4">
                    Iniciar Sesión
                  </button>
                </fieldset>
              </form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShowModal(false)} type="submit" className="btn btn-danger">Cerrar</button>
          <button onClick={() => setShowRegistro(!showRegistro)} type="submit" className="btn btn-warning">
            {showRegistro ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </Modal.Footer>
      </Modal>

      <div> {inicioSesion} </div>
    </>
  );
};