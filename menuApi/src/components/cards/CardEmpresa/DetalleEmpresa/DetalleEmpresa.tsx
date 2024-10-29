import React from 'react';
import { IEmpresa2 } from '../../../../types/dtos/empresa/IEmpresa2';


interface DetalleEmpresaProps {
  empresa: IEmpresa2;
  onClose: () => void;
}

const DetalleEmpresa: React.FC<DetalleEmpresaProps> = ({ empresa, onClose }) => {
  return (
    <div className="detalle-modal">
      <h2>Detalle de Empresa</h2>
      <p>Nombre: {empresa.nombre}</p>
      <p>Razón Social: {empresa.razonSocial}</p>
      <p>CUIT: {empresa.cuit}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DetalleEmpresa;
