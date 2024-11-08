import React from 'react';
import { ISucursal } from '../../../../types/dtos/sucursal/ISucursal';

import styles from './DetalleSucursal.module.css'

interface DetalleSucursalProps {
  sucursal: ISucursal;
  onClose: () => void;
}

const DetalleSucursal: React.FC<DetalleSucursalProps> = ({ sucursal, onClose }) => {
  return (
    <div className={styles.modal_fondo}>
      <div className={styles.modal_contenedor}>
        <h2 className={styles.modal_titulo}>Detalle de Sucursal</h2>
      <p><span className={styles.text_b}>Nombre: </span>{sucursal.nombre}</p>
      <p><span className={styles.text_b}>Empresa: </span> {sucursal.empresa.id}</p>
      <p><span className={styles.text_b}>Domcilio: </span> {sucursal.domicilio.calle} {sucursal.domicilio.numero}, {sucursal.domicilio.cp} - {sucursal.domicilio.localidad.nombre},  {sucursal.domicilio.localidad.provincia.nombre}
      </p>
      <p><span className={styles.text_b}>¿Casa Matriz?: </span> {sucursal.esCasaMatriz}</p>
      <p><span className={styles.text_b}>Horario de Apertura: </span> {sucursal.horarioApertura}</p>
      <p><span className={styles.text_b}>Horario de Cierre: </span> {sucursal.horarioCierre}</p>
      <p><span className={styles.text_b}>Logo: </span> </p>
      <img className={styles.imgDetalle} src={sucursal.logo} alt="" />
      <div className={styles.modal_botones_contenedor}>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>
    </div>

  );
};

export default DetalleSucursal;
