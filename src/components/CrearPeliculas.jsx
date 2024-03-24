import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CrearPeliculas = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre_usuario: "",
        pelicula_nombre: "",
        tipo_pelicula: "",
        imagen: "",
        caption: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === "imagen") {
            const img = event.target.files[0];
            setForm({ ...form, [name]: img });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const submitHandler = async () => {
        const url = "http://localhost:4000/api/pelicula";

        event.preventDefault();

        const datosFormulario = new FormData();

        datosFormulario.append("nombre_usuario", form.nombre_usuario);
        datosFormulario.append("pelicula_nombre", form.pelicula_nombre);
        datosFormulario.append("tipo_pelicula", form.tipo_pelicula);
        datosFormulario.append("caption", form.caption);
        datosFormulario.append("imagen", form.imagen);

        const result = await axios.post(url, datosFormulario);
        const resultData = (await result).data;

        navigate("/src/components/MuroPeliculas.jsx");
    };

    return (
        <>
            <div className="container mt-5">
                <form onSubmit={submitHandler}>
                    <fieldset>
                        <legend>Agregar Pelicula</legend>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Usuario</label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control-plaintext"
                                    name="nombre_usuario"
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                                Nombre de la Pelicula
                            </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control-plaintext"
                                    name="pelicula_nombre"
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                                Tipo de Pelicula
                            </label>
                            <div className="col-sm-10">
                                <select
                                    className="form-control"
                                    name="tipo_pelicula"
                                    onChange={onChangeHandler}
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Biografia">Biografia</option>
                                    <option value="Documental">Documental</option>
                                    <option value="Ficcion">Ficcion</option>
                                    <option value="Animada">Animada</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Caption</label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control-plaintext"
                                    name="caption"
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label mt-4">Imagen</label>
                            <input
                                className="form-control "
                                type="file"
                                name="imagen"
                                onChange={onChangeHandler}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-success w-100">
                            Insertar Pelicula
                        </button>
                    </fieldset>
                </form>
            </div>
        </>
    );
};
