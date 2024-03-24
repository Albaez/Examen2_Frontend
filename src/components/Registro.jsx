import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registro = () => {
  const navigate = useNavigate();
  
  const url = "http://localhost:4000/api/usuario";

  const [form, setForm] = useState({
    usuario: '',
    correo: '',
    nombre: '',
    apellido: '',
    pass: '',
    passConfirm: '',
    foto_perfil: {}
  });

  const usuarioHandler = (event) => {
    const { value } = event.target;
    setForm({ ...form, usuario: value });
  };

  const correoHandler = (event) => {
    const { value } = event.target;
    setForm({ ...form, correo: value });
  };

  const nombreHandler = (event) => {
    const { value } = event.target;
    setForm({ ...form, nombre: value });
  };

  const apellidoHandler = (event) => {
    const { value } = event.target;
    setForm({ ...form, apellido: value });
  };

  const passHandler = (event) => {
    const { value } = event.target;
    setForm({ ...form, pass: value });
  };

  const passConfirmHandler = (event) => {
    const { value } = event.target;
    setForm({ ...form, passConfirm: value });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "foto_perfil") {
      const img = event.target.files[0];
      setForm({ ...form, [name]: img });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const submitHandler = async () => {
    event.preventDefault();

    const datosFormulario = new FormData();

    datosFormulario.append("nombre_usuario", form.usuario);
    datosFormulario.append("correo_electronico", form.correo);
    datosFormulario.append("contrasena", form.pass);
    datosFormulario.append("nombre", form.nombre);
    datosFormulario.append("apellido", form.apellido);
    datosFormulario.append("confirmacion_con", form.passConfirm);
    datosFormulario.append("foto_perfil", form.foto_perfil);

    const result = await axios.post(url, datosFormulario);
    const resultData = result.data;

    navigate('/src/components/Muro.jsx');
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={submitHandler}>
          <fieldset>
            <div>
              <label htmlFor="exampleInputPassword1" className="form-label ">
                Usuario
              </label>
              <input
                type="usuario"
                className="form-control"
                name="usuario"
                onChange={usuarioHandler}
                placeholder="Ingrese su usuario"
              />
            </div>

            <div>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Correo Electronico
              </label>
              <input
                type="email"
                className="form-control"
                onChange={correoHandler}
                name="correo"
                aria-describedby="emailHelp"
                placeholder="Ingrese su Correo"
              />
              <small className="form-text text-muted">
                No comparta su correo con cualquier otra persona.
              </small>
            </div>

            <div>
              <label htmlFor="exampleInputPassword1" className="form-label ">
                Nombre
              </label>
              <input
                type="nombre"
                className="form-control"
                name="nombre"
                onChange={nombreHandler}
                placeholder="Ingrese su nombre"
              />
            </div>

            <div>
              <label htmlFor="exampleInputPassword1" className="form-label ">
                Apellido
              </label>
              <input
                type="apellido"
                className="form-control"
                name="apellido"
                onChange={apellidoHandler}
                placeholder="Ingrese su apellido"
              />
            </div>

            <div>
              <label htmlFor="exampleInputPassword1" className="form-label ">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                name="pass"
                onChange={passHandler}
                placeholder="Ingrese su contraseña"
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="exampleInputPassword1" className="form-label ">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                name="passConfirm"
                onChange={passConfirmHandler}
                placeholder="Ingrese su contraseña"
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="formFile" className="form-label ">
                Default file input example
              </label>
              <input
                className="form-control"
                type="file"
                name="foto_perfil"
                onChange={onChangeHandler}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-success w-100 mt-4"
            >
              Crear Usuario
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};