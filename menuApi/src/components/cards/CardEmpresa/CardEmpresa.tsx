// CardEmpresa.tsx
/*
import React, { useState } from 'react';
import './CardEmpresa.css';
import { IEmpresa2 } from '../../../types/dtos/empresa/IEmpresa2';
*//*
interface CardEmpresaProps {
  empresa: IEmpresa2;
  onView: (empresa: IEmpresa2) => void;
  onEdit: (empresa: IEmpresa2) => void;
  /*onAddSucursal: (empresa: IEmpresa2) => void;*//*
}

const CardEmpresa: React.FC<CardEmpresaProps> = ({ empresa, onView, onEdit }) => {
  const [showAddSucursal, setShowAddSucursal] = useState(false); // Estado para controlar la visibilidad del botón

  const handleCardClick = () => {
    setShowAddSucursal(!showAddSucursal); // Alternar visibilidad al hacer clic en la tarjeta
  };

  return (
    <div className='card-empresa'
      onClick={handleCardClick} // Manejar el clic en la tarjeta
    >
      <h3>{empresa.nombre}</h3>
      <p>{empresa.id}</p>
      <p>{empresa.cuit}</p>
      <p>{empresa.razonSocial}</p>
      <div className='card__contenedor-botones'>
        <button onClick={() => onView(empresa)}>Ver Detalles</button>
        <button onClick={() => onEdit(empresa)}>Editar</button>
      </div>
      {/*showAddSucursal && ( // Mostrar botón si showAddSucursal es true
        <button onClick={() => onAddSucursal(empresa)}>Agregar Sucursal</button>
      )*//*}
    </div>
  );
};

export default CardEmpresa;*/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './CardEmpresa.css';
import { IEmpresa2 } from '../../../types/dtos/empresa/IEmpresa2';
import { setActiveEmpresa } from '../../../redux/slices/empresaActivaSlice';

interface CardEmpresaProps {
  empresa: IEmpresa2;
  onView: (empresa: IEmpresa2) => void;
  onEdit: (empresa: IEmpresa2) => void;
}

const CardEmpresa: React.FC<CardEmpresaProps> = ({ empresa, onView, onEdit }) => {
  const dispatch = useDispatch();
  const [showAddSucursal, setShowAddSucursal] = useState(false);

  const handleCardClick = () => {
    setShowAddSucursal(!showAddSucursal);
    dispatch(setActiveEmpresa(empresa)); // Despachar la acción al hacer clic en la tarjeta
  };

  return (
    <div className='card-empresa' onClick={handleCardClick}>
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
