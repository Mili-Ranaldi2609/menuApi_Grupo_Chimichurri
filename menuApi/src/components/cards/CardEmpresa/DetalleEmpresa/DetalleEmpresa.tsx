import React from 'react';
import { IEmpresa2 } from '../../../../types/dtos/empresa/IEmpresa2';
import styles from "./DetalleEmpresa.module.css"
interface DetalleEmpresaProps {
  empresa: IEmpresa2;
  onClose: () => void;
}

const DetalleEmpresa: React.FC<DetalleEmpresaProps> = ({ empresa, onClose }) => {
  return (
    <div className={styles.detalleModal_fondo}>
      <div className={styles.detalleModal_contenedor}>
        <h2 className={styles.detalleModal__titulo}>Detalle de Empresa</h2>
        <p><span className={styles.text_b}>Nombre:</span> {empresa.nombre}</p>
        <p><span className={styles.text_b}>Razón Social:</span> {empresa.razonSocial}</p>
        <p><span className={styles.text_b}>CUIT: </span>{empresa.cuit}</p>
        <p><img className={styles.detalleModal__imagen} src={empresa.logo} alt="" /></p>
        <button className={styles.detalleModal__boton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default DetalleEmpresa;
