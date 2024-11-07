import React from 'react';

import styles from './DetalleAlergeno.module.css'
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';

interface DetalleAlergenoProps {
  alergeno: IAlergenos;
  onClose: () => void;
}

const DetalleAlergeno: React.FC<DetalleAlergenoProps> = ({ alergeno: alergeno, onClose }) => {
  return (
    <div className={styles.modal_fondo}>
      <div className={styles.modal_contenedor}>
        <h2 className={styles.modal_titulo}>Detalle de Producto</h2>
      <p><span className={styles.text_b}>Denominacion</span>{alergeno.denominacion}</p>
        <div className="imagenes-container">
          <span className={styles.text_b}>Imágenes:</span>
          <div className={styles.imagen}>
              <img 
                src={alergeno.imagen.url} 
                className="imagen-detalle"
              />
    
          </div>
        </div>
          
      <div className={styles.modal_botones_contenedor}>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>
    </div>

  );
};

export default DetalleAlergeno;
