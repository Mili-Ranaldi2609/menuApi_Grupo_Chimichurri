import React from 'react';

import { IEmpresa } from '../../../types/IEmpresa';
interface cardEmpresaProps{
  empresa: IEmpresa
}

export const CardEmpresa: React.FC<cardEmpresaProps> = ({empresa})=> {
  return (
    <div className="card">
      <h2 className="card-title">{empresa.name}</h2>
      <p className="card-description">{empresa.description}</p>
      <button className="card-button">Ver Detalles</button>
    </div>
  );
};

export default CardEmpresa;
