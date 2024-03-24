import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Director = () => {
  const [directores, setDirectores] = useState([]);
  const [nombreDirector, setNombreDirector] = useState('');

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
    const { value: nuevoNombreDirector } = await Swal.fire({
      title: 'Ingresa el nombre del director:',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Nombre del director',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un nombre';
        }
      }
    });
  
    if (nuevoNombreDirector) {
      try {
        const response = await axios.post('http://localhost:4000/api/director', {
          nombre_director: nuevoNombreDirector
        });
        setDirectores([...directores, response.data]);
        Swal.fire('Éxito', 'Director creado correctamente', 'success');
        obtenerDirectores(); // Actualizar la lista de directores
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al crear el director', 'error');
      }
    }
  };



  const editarDirector = async (id, nombreDirector) => {
    const { value: nuevoNombreDirector } = await Swal.fire({
      title: 'Ingresa el nuevo nombre del director:',
      input: 'text',
      inputValue: nombreDirector,
      inputLabel: 'Nombre',
      inputPlaceholder: 'Nuevo nombre del director',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un nombre';
        }
      }
    });
  
    if (nuevoNombreDirector) {
      try {
        const response = await axios.put(`http://localhost:4000/api/director/${id}`, {
          nombre_director: nuevoNombreDirector
        });
        const directorActualizado = response.data;
        setDirectores(directores.map(director => (director.id === directorActualizado.id ? directorActualizado : director)));
        Swal.fire('Éxito', 'Director actualizado correctamente', 'success');
        obtenerDirectores(); // Actualizar la lista de directores
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al actualizar el director', 'error');
      }
    }
  };
  
  const eliminarDirector = async (id) => {
    const { value: confirmacion } = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este director?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });
  
    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:4000/api/director/${id}`);
        setDirectores(directores.filter(director => director.id !== id));
        Swal.fire('Éxito', 'Director eliminado correctamente', 'success');
        obtenerDirectores(); // Actualizar la lista de directores
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al eliminar el director', 'error');
      }
    }
  };



  return (
    <div>
      <h1>Directores</h1>

      <div className="card-deck">
        {directores.map(director => (
          <div className="card border-warning mb-3" style={{ maxWidth: '20rem' }} key={director.id}>
            <div className="card-header">Director</div>
            <div className="card-body">
              <h4 className="card-title">{director.nombre_director}</h4>
              <p className="card-text">Director Nominado</p>
              <button className="btn btn-success" onClick={() => editarDirector(director.id, director.nombre_director)}>Editar</button>
              <button className="btn btn-danger" onClick={() => eliminarDirector(director.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-success mt-2" onClick={crearDirector}>Crear Director</button>
    </div>
  );
};

export default Director;