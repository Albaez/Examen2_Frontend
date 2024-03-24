import axios from "axios";
import FileReader from "filereader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registro = () => {
  const navigate = useNavigate();

  const url = "http://localhost:4000/api/usuario";

  const [form, setForm] = useState({
    usuario: "",
    correo: "",
    nombre: "",
    apellido: "",
    pass: "",
    passConfirm: "",
    foto_perfil: {},
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

  const submitHandler = async (event) => {
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

    navigate("/src/components/Muro.jsx");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleFotoPerfilChange = (event) => {
    const file = event.target.files[0];
    setForm({ ...form, foto_perfil: file });

    const handleFotoPerfilChange = (event) => {
      const file = event.target.files[0];

      // Crea una instancia de FileReader
      const reader = new FileReader();

      // Define el evento onload para obtener la URL de datos
      reader.onload = (event) => {
        const dataURL = event.target.result;
        setForm({ ...form, foto_perfil: dataURL });
      };

      // Lee el archivo como una URL de datos
      reader.readAsDataURL(file);
    };
  };

  const mostrarInformacion = () => {
    console.log(form);
    // Aquí puedes hacer lo que necesites con la información del formulario

    const {
      usuario,
      correo,
      nombre,
      apellido,
      pass,
      passConfirm,
      foto_perfil,
    } = form;

    // Establecer los valores de los campos del formulario
    document.getElementById("usuario").value = usuario;
    document.getElementById("correo").value = correo;
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("pass").value = pass;
    document.getElementById("passConfirm").value = passConfirm;
    // Aquí puedes hacer lo mismo para otros campos del formulario

    // Mostrar la foto de perfil
    if (foto_perfil) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(foto_perfil);
      document.getElementById("foto_perfil").appendChild(img);
    }
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

            <fieldset>
              <div>
                <label htmlFor="usuario" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usuario"
                  name="usuario"
                  value={form.usuario}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="correo" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="pass" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  name="pass"
                  value={form.pass}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="passConfirm" className="form-label">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passConfirm"
                  name="passConfirm"
                  value={form.passConfirm}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="foto_perfil" className="form-label">
                  Foto de Perfil
                </label>
                <img
                  id="foto_perfil"
                  src={form.foto_perfil ? form.foto_perfil : ""}
                  alt="Foto de Perfil"
                />
              </div>

              <button
                type="button"
                className="btn btn-outline-primary w-100 mt-4"
                onClick={mostrarInformacion}
              >
                Mostrar Información
              </button>
            </fieldset>
          </fieldset>
        </form>
      </div>
    </>
  );
};
