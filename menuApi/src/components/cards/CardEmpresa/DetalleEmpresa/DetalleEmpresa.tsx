import React from 'react';
import "./DetalleEmpresa.css";
import { IEmpresa2 } from '../../../../types/dtos/empresa/IEmpresa2';
import './DetalleEmpresa.css'

interface DetalleEmpresaProps {
  empresa: IEmpresa2;
  onClose: () => void;
}

const DetalleEmpresa: React.FC<DetalleEmpresaProps> = ({ empresa, onClose }) => {
  return (
<<<<<<< HEAD
    <div className="modal_contenedor">
      <h2 className='modal_titulo'>Detalle de Empresa</h2>
      <p>Nombre: {empresa.nombre}</p>
      <p>Razón Social: {empresa.razonSocial}</p>
      <p>CUIT: {empresa.cuit}</p>
      <div className='modal_botones_contenedor'>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
=======
    <div className="detalleModal-fondo">
      <div className="detalleModal-contenedor">
        <h2 className='detalleModal__titulo'>Detalle de Empresa</h2>
        <p><span className='text-b'>Nombre:</span> {empresa.nombre}</p>
        <p><span className='text-b'>Razón Social:</span> {empresa.razonSocial}</p>
        <p><span className='text-b'>CUIT: </span>{empresa.cuit}</p>
        <p><img className='detalleModal__imagen' src={empresa.logo} alt="" /></p>
        <button className='detalleModal__boton' onClick={onClose}>Cerrar</button>
      </div>
>>>>>>> 49a125d0532121893d3c51d8e8dc6715420de876
    </div>
  );
};

export default DetalleEmpresa;
