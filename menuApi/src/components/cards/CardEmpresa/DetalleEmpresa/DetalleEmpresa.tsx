import React from 'react';
import { IEmpresa2 } from '../../../../types/dtos/empresa/IEmpresa2';
import './DetalleEmpresa.css'

interface DetalleEmpresaProps {
  empresa: IEmpresa2;
  onClose: () => void;
}

const DetalleEmpresa: React.FC<DetalleEmpresaProps> = ({ empresa, onClose }) => {
  return (
    <div className="modal_contenedor">
      <h2 className='modal_titulo'>Detalle de Empresa</h2>
      <p>Nombre: {empresa.nombre}</p>
      <p>Razón Social: {empresa.razonSocial}</p>
      <p>CUIT: {empresa.cuit}</p>
      <div className='modal_botones_contenedor'>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>
  );
};

export default DetalleEmpresa;
