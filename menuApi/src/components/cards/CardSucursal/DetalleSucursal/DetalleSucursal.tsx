import React from 'react';
import { ISucursal } from '../../../../types/dtos/sucursal/ISucursal';

import './DetalleSucursal.css'

interface DetalleSucursalProps {
  sucursal: ISucursal;
  onClose: () => void;
}

const DetalleSucursal: React.FC<DetalleSucursalProps> = ({ sucursal, onClose }) => {
  return (
    <div className='modal-fondo'>
      <div className="modal_contenedor">
        <h2 className='modal_titulo'>Detalle de Sucursal</h2>
      <p><span className='text-b'>Nombre: </span> Nombre: {sucursal.nombre}</p>
      <p><span className="text-b">Empresa: </span> {sucursal.empresa.name}</p>
      <p><span className="text-b">Domcilio: </span> {sucursal.domicilio.calle} {sucursal.domicilio.numero}, {sucursal.domicilio.cp} - {sucursal.domicilio.localidad.nombre},  {sucursal.domicilio.localidad.provincia.nombre}
      </p>
      <p><span className="text-b">¿Casa Matriz?: </span> {sucursal.esCasaMatriz}</p>
      <p><span className="text-b">Horario de Apertura: </span> {sucursal.horarioApertura}</p>
      <p><span className="text-b">Horario de Cierre: </span> {sucursal.horarioCierre}</p>
      <p><span className="text-b">Logo: </span> </p>
      <img className='imgDetalle' src={sucursal.logo} alt="" />
      <div className='modal_botones_contenedor'>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>
    </div>

  );
};

export default DetalleSucursal;
