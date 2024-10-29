import React from 'react';
import './CardEmpresa.css';
import { IEmpresa2 } from '../../../types/dtos/empresa/IEmpresa2';

interface CardEmpresaProps {
  empresa: IEmpresa2;
  onView: (empresa: IEmpresa2) => void;
  onEdit: (empresa: IEmpresa2) => void;
}

const CardEmpresa: React.FC<CardEmpresaProps> = ({ empresa, onView, onEdit }) => {
  return (
    <div className='card-empresa'>
      <h3>{empresa.nombre}</h3>
      <p>{empresa.id}</p>
      <p>{empresa.cuit}</p>
      <p>{empresa.razonSocial}</p>
      <div className='card__contenedor-botones'>
        <button onClick={() => onView(empresa)}>Ver Detalles</button>
        <button onClick={() => onEdit(empresa)}>Editar</button>
      </div>
    </div>
  );
};

export default CardEmpresa;
