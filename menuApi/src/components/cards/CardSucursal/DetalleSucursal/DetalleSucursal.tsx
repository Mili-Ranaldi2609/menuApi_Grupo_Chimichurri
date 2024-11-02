import React from 'react';
import { ISucursal } from '../../../../types/dtos/sucursal/ISucursal';

import './DetalleSucursal.css'

interface DetalleSucursalProps {
  sucursal: ISucursal;
  onClose: () => void;
}

const DetalleSucursal: React.FC<DetalleSucursalProps> = ({ sucursal, onClose }) => {
  return (

      <div className="modal_contenedor">
        <h2 className='modal_titulo'>Detalle de Sucursal</h2>
      <p>Nombre: {sucursal.nombre}</p>
      <p>Empresa: {sucursal.empresa.name}</p>
      <p>Domcilio: {sucursal.domicilio.calle} {sucursal.domicilio.numero}, {sucursal.domicilio.cp} - {sucursal.domicilio.localidad.nombre},  {sucursal.domicilio.localidad.provincia.nombre}
      </p>
      <p>¿Casa Matriz?: {sucursal.esCasaMatriz}</p>
      <p>Horario de Apertura:{sucursal.horarioApertura}</p>
      <p>Horario de Cierre:{sucursal.horarioCierre}</p>
      <p>Logo:</p>
      <img className='imgDetalle' src={sucursal.logo} alt="" />
      <div className='modal_botones_contenedor'>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>

  );
};

export default DetalleSucursal;
