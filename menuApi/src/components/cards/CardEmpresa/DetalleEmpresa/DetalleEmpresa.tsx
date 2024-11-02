import React from 'react';
import "./DetalleEmpresa.css";
import { IEmpresa2 } from '../../../../types/dtos/empresa/IEmpresa2';


interface DetalleEmpresaProps {
  empresa: IEmpresa2;
  onClose: () => void;
}

const DetalleEmpresa: React.FC<DetalleEmpresaProps> = ({ empresa, onClose }) => {
  return (
    <div className="detalleModal-fondo">
      <div className="detalleModal-contenedor">
        <h2 className='detalleModal__titulo'>Detalle de Empresa</h2>
        <p>Nombre: {empresa.nombre}</p>
        <p>Razón Social: {empresa.razonSocial}</p>
        <p>CUIT: {empresa.cuit}</p>
        <p><img className='detalleModal__imagen' src={empresa.logo} alt="" /></p>
        <button className='detalleModal__boton' onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default DetalleEmpresa;
