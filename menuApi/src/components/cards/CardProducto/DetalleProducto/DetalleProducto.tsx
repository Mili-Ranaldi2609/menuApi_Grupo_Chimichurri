import React from 'react';

import './DetalleProducto.css'
import { IProductos } from '../../../../types/dtos/productos/IProductos';

interface DetalleProductoProps {
  producto: IProductos;
  onClose: () => void;
}

const DetalleProducto: React.FC<DetalleProductoProps> = ({ producto: producto, onClose }) => {
  return (
    <div className='modal-fondo'>
      <div className="modal_contenedor">
        <h2 className='modal_titulo'>Detalle de Producto</h2>
      <p><span className='text-b'>Denominacion</span>{producto.denominacion}</p>
      <p><span className="text-b">Descripcion </span> {producto.descripcion}</p>
      <p><span className="text-b">Categoria: </span> {producto.categoria.denominacion}
      </p>
      <p><span className="text-b">Habilitado? </span> {producto.habilitado}</p>
        {/* Mostrar todas las imágenes */}
        <div className="imagenes-container">
          <span className="text-b">Imágenes:</span>
          <div className="imagenes">
            {producto.imagenes.map((imagen, index) => (
              <img 
                key={index} 
                src={imagen.url} 
                alt={`Imagen ${index + 1} de ${producto.denominacion}`} 
                className="imagen-detalle"
              />
            ))}
          </div>
        </div>
          
        {/* Mostrar todos los alérgenos */}
        <p><span className="text-b">Alergenos:</span> 
          {producto.alergenos.length > 0 ? 
            producto.alergenos.map(alergeno => alergeno.id).join(', ') : 
            'No hay alérgenos'}
        </p>
      <p><span className="text-b">Precio: </span> {producto.precioVenta}</p>
      <p><span className="text-b">Categoria: </span> {producto.categoria.denominacion}</p>
      <div className='modal_botones_contenedor'>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>
    </div>

  );
};

export default DetalleProducto;
