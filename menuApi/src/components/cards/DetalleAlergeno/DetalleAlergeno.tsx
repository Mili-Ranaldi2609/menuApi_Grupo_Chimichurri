import React from 'react';

import './DetalleAlergeno.css'
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';

interface DetalleAlergenoProps {
  alergeno: IAlergenos;
  onClose: () => void;
}

const DetalleAlergeno: React.FC<DetalleAlergenoProps> = ({ alergeno: alergeno, onClose }) => {
  return (
    <div className='modal-fondo'>
      <div className="modal_contenedor">
        <h2 className='modal_titulo'>Detalle de Producto</h2>
      <p><span className='text-b'>Denominacion</span>{alergeno.denominacion}</p>
        <div className="imagenes-container">
          <span className="text-b">Imágenes:</span>
          <div className="imagen">
              <img 
                src={alergeno.imagen.url} 
                className="imagen-detalle"
              />
    
          </div>
        </div>
          
      <div className='modal_botones_contenedor'>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>
    </div>

  );
};

export default DetalleAlergeno;
