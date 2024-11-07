

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from "./CardEmpresa.module.css"
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
    <div className={styles.card_empresa}onClick={handleCardClick}>
      <h3>{empresa.nombre}</h3>
      {/* <p>{empresa.cuit}</p>
      <p>{empresa.razonSocial}</p>
      <div className='card_img_container'> <img className='img_empresa' src={empresa.logo} alt="" /></div> */}
      <div className={styles.card__contenedor_botones}>
        <button onClick={() => onView(empresa)}><span className="material-symbols-outlined">
visibility
</span></button>
        <button onClick={() => onEdit(empresa)}> <span className="material-symbols-outlined">
edit
</span></button>
      </div>
    </div>
  );
};

export default CardEmpresa;
