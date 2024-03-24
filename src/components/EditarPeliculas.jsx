import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const EditarPelicula = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    caption: "",
  });

  const handlerChange = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  const handlerSubmit = async () => {
    event.preventDefault();
    const url = `http://localhost:4000/api/pelicula/${id}`;
    const result = await axios.put(url, data);
    const resultData = (await result).data;

    console.log(resultData);
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handlerSubmit}>
          <fieldset>
            <legend>Editar Post</legend>

            <div className="form-group row">
              <label
                className="col-sm-2 col-form-label">Caption
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control-plaintext"
                  name="caption"
                  onChange={handlerChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Editar Post
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};
