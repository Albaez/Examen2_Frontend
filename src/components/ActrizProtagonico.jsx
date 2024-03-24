import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ActrizProtagonico = () => {
  const [actrices, setActrices] = useState([]);
  const [nombreActriz, setNombreActriz] = useState('');

  useEffect(() => {
    obtenerActrices();
  }, []);

  const obtenerActrices = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/actrizprotagonico');
      const actrices = response.data;
      setActrices(actrices);
    } catch (error) {
      console.error(error);
    }
  };

  const crearActriz = async () => {
    const { value: nuevoNombreActriz } = await Swal.fire({
      title: 'Ingresa el nombre de la actriz:',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Nombre de la actriz',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un nombre';
        }
      }
    });
  
    if (nuevoNombreActriz) {
      try {
        const response = await axios.post('http://localhost:4000/api/actrizprotagonico', {
          nombre_actrizprotagonista: nuevoNombreActriz
        });
        const actrizCreada = response.data;
        setActrices(prevActrices => [...prevActrices, actrizCreada]); // Actualizar el estado con la nueva actriz creada
        Swal.fire('Éxito', 'Actriz creada correctamente', 'success');
        obtenerActrices(); // Actualizar la lista de actrices
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al crear la actriz', 'error');
      }
    }
  };

  const editarActriz = async (id, nombreActriz) => {
    const { value: nuevoNombreActriz } = await Swal.fire({
      title: 'Ingresa el nuevo nombre de la actriz:',
      input: 'text',
      inputValue: nombreActriz,
      inputLabel: 'Nombre',
      inputPlaceholder: 'Nuevo nombre de la actriz',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un nombre';
        }
      }
    });

    if (nuevoNombreActriz) {
      try {
        const response = await axios.put(`http://localhost:4000/api/actrizprotagonico/${id}`, {
          nombre_actrizprotagonista: nuevoNombreActriz
        });
        const actrizActualizada = response.data;
        const actricesActualizadas = actrices.map(actriz => {
          if (actriz.id === actrizActualizada.id) {
            return actrizActualizada;
          } else {
            return actriz;
          }
        });
        setActrices(actricesActualizadas);
        Swal.fire('Éxito', 'Actriz actualizada correctamente', 'success');
        obtenerActrices(); // Actualizar la lista de actrices
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al actualizar la actriz', 'error');
      }
    }
  };

  const eliminarActriz = async (id) => {
    const { value: confirmacion } = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar esta actriz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:4000/api/actrizprotagonico/${id}`);
        const actricesActualizadas = actrices.filter(actriz => actriz.id !== id);
        setActrices(actricesActualizadas);
        Swal.fire('Éxito', 'Actriz eliminada correctamente', 'success');
        obtenerActrices(); // Actualizar la lista de actrices
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al eliminar la actriz', 'error');
      }
    }
  };

  return (
    <div>
      <h1>Actrices Protagónicas</h1>

      {actrices.length > 0 && (
        <div className="row">
          {actrices.map((actriz, index) => (
            <div className="col-md-4" key={actriz.id}>
              <div className="card border-warning mb-3" style={{ maxWidth: '20rem' }}>
                <div className="card-header">Actriz</div>
                <div className="card-body">
                  <h4 className="card-title">{actriz.nombre_actrizprotagonista}</h4>
                  <p className="card-text">Actriz Protagónica</p>
                  <button className="btn btn-success" onClick={() => editarActriz(actriz.id, actriz.nombre_actrizprotagonista)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => eliminarActriz(actriz.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-success mt-2" onClick={crearActriz}>Crear Actriz</button>
    </div>
  );
};

export default ActrizProtagonico;