// CardEmpresa.tsx
import React, { useState } from 'react';
import { IEmpresa2 } from '../../../types/dtos/empresa/IEmpresa2';

interface CardEmpresaProps {
  empresa: IEmpresa2;
  onView: (empresa: IEmpresa2) => void;
  onEdit: (empresa: IEmpresa2) => void;
  onAddSucursal: (empresa: IEmpresa2) => void;
}

const CardEmpresa: React.FC<CardEmpresaProps> = ({ empresa, onView, onEdit, onAddSucursal }) => {
  const [showAddSucursal, setShowAddSucursal] = useState(false); // Estado para controlar la visibilidad del botón

  const handleCardClick = () => {
    setShowAddSucursal(!showAddSucursal); // Alternar visibilidad al hacer clic en la tarjeta
  };

  return (
    <div 
      onClick={handleCardClick} // Manejar el clic en la tarjeta
      style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', cursor: 'pointer' }} // Estilo básico
    >
      <h3>{empresa.nombre}</h3>
      <p>{empresa.id}</p>
      <p>{empresa.cuit}</p>
      <p>{empresa.razonSocial}</p>
      <button onClick={() => onView(empresa)}>Ver Detalles</button>
      <button onClick={() => onEdit(empresa)}>Editar</button>
      {showAddSucursal && ( // Mostrar botón si showAddSucursal es true
        <button onClick={() => onAddSucursal(empresa)}>Agregar Sucursal</button>
      )}
    </div>
  );
};

export default CardEmpresa;
