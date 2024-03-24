import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Director= () => {
  const [directores, setDirectores] = useState([]);
  const [nombreDirector, setNombreDirector] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [directorId, setDirectorId] = useState(null);

  useEffect(() => {
    obtenerDirectores();
  }, []);

  const obtenerDirectores = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/director');
      setDirectores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const crearDirector = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/director', {
        nombre_director: nombreDirector
      });
      setDirectores([...directores, response.data]);
      setNombreDirector('');
      setModalVisible(false);
      Swal.fire('Éxito', 'Director creado correctamente', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ocurrió un error al crear el director', 'error');
    }
  };

  const editarDirector = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/director/${directorId}`, {
        nombre_director: nombreDirector
      });
      const directorActualizado = response.data;
      setDirectores(directores.map(director => (director.id === directorActualizado.id ? directorActualizado : director)));
      setNombreDirector('');
      setModalVisible(false);
      setModoEdicion(false);
      setDirectorId(null);
      Swal.fire('Éxito', 'Director actualizado correctamente', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ocurrió un error al actualizar el director', 'error');
    }
  };

  const eliminarDirector = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/director/${id}`);
      setDirectores(directores.filter(director => director.id !== id));
      Swal.fire('Éxito', 'Director eliminado correctamente', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ocurrió un error al eliminar el director', 'error');
    }
  };

  const abrirModalCrear = () => {
    setModalVisible(true);
    setModoEdicion(false);
    setDirectorId(null);
  };

  const abrirModalEditar = (id, nombreDirector) => {
    setModalVisible(true);
    setModoEdicion(true);
    setDirectorId(id);
    setNombreDirector(nombreDirector);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setModoEdicion(false);
    setDirectorId(null);
    setNombreDirector('');
  };

  return (
    <div>
      <h1>Directores</h1>
      <button onClick={abrirModalCrear}>Crear Director</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map(director => (
            <tr key={director.id}>
              <td>{director.id}</td>
              <td>{director.nombre_director}</td>
              <td>
                <button onClick={() => abrirModalEditar(director.id, director.nombre_director)}>Editar</button>
                <button onClick={() => eliminarDirector(director.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalVisible && (
        <div>
          <div>
            <label>Nombre del Director:</label>
            <input type="text" value={nombreDirector} onChange={e => setNombreDirector(e.target.value)} />
          </div>
          <div>
            {modoEdicion ? (
              <button onClick={editarDirector}>Actualizar</button>
            ) : (
              <button onClick={crearDirector}>Crear</button>
            )}
            <button onClick={cerrarModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Director;