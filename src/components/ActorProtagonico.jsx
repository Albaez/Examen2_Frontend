import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ActorProtagonico = () => {
  const [actores, setActores] = useState([]);
  const [nombreActor, setNombreActor] = useState('');

  useEffect(() => {
    obtenerActores();
  }, []);

  const obtenerActores = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/actorprotagonico');
      const actores = response.data;
      setActores(actores);
    } catch (error) {
      console.error(error);
    }
  };

  const crearActor = async () => {
    const { value: nuevoNombreActor } = await Swal.fire({
      title: 'Ingresa el nombre del actor:',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Nombre del actor',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un nombre';
        }
      }
    });

    if (nuevoNombreActor) {
      try {
        const response = await axios.post('http://localhost:4000/api/actorprotagonico', {
          nombre_actorprotagonista: nuevoNombreActor
        });
        const actorCreado = response.data;
        setActores(prevActores => [...prevActores, actorCreado]);
        Swal.fire('Éxito', 'Actor creado correctamente', 'success');
        obtenerActores(); // Actualizar la lista de actores
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al crear el actor', 'error');
      }
    }
  };

  const editarActor = async (id, nombreActor) => {
    const { value: nuevoNombreActor } = await Swal.fire({
      title: 'Ingresa el nuevo nombre del actor:',
      input: 'text',
      inputValue: nombreActor,
      inputLabel: 'Nombre',
      inputPlaceholder: 'Nuevo nombre del actor',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un nombre';
        }
      }
    });

    if (nuevoNombreActor) {
      try {
        const response = await axios.put(`http://localhost:4000/api/actorprotagonico/${id}`, {
          nombre_actorprotagonista: nuevoNombreActor
        });
        const actorActualizado = response.data;
        const actoresActualizados = actores.map(actor => {
          if (actor.id === actorActualizado.id) {
            return actorActualizado;
          } else {
            return actor;
          }
        });
        setActores(actoresActualizados);
        Swal.fire('Éxito', 'Actor actualizado correctamente', 'success');
        obtenerActores(); // Actualizar la lista de actores
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al actualizar el actor', 'error');
      }
    }
  };

  const eliminarActor = async (id) => {
    const { value: confirmacion } = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este actor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:4000/api/actorprotagonico/${id}`);
        const actoresActualizados = actores.filter(actor => actor.id !== id);
        setActores(actoresActualizados);
        Swal.fire('Éxito', 'Actor eliminado correctamente', 'success');
        obtenerActores(); // Actualizar la lista de actores
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al eliminar el actor', 'error');
      }
    }
  };

  return (
    <div>
      <h1>Actores Protagónicos</h1>

      {actores.length > 0 && (
        <div className="row">
          {actores.map((actor, index) => (
            <div className="col-md-4" key={actor.id}>
              <div className="card border-warning mb-3" style={{ maxWidth: '20rem' }}>
                <div className="card-header">Actor</div>
                <div className="card-body">
                  <h4 className="card-title">{actor.nombre_actorprotagonista}</h4>
                  <p className="card-text">Actor Protagónico</p>
                  <button className="btn btn-success" onClick={() => editarActor(actor.id, actor.nombre_actorprotagonista)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => eliminarActor(actor.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-success mt-2" onClick={crearActor}>Crear Actor</button>
    </div>
  );
};

export default ActorProtagonico;