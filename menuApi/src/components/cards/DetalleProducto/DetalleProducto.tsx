import React from 'react';
import styles from './DetalleProducto.module.css'
import { IProductos } from '../../../types/dtos/productos/IProductos';

interface DetalleProductoProps {
  producto: IProductos;
  onClose: () => void;
}

const DetalleProducto: React.FC<DetalleProductoProps> = ({ producto: producto, onClose }) => {
  return (
    <div className={styles.modal_fondo}>
      <div className={styles.modal_contenedor}>
        <h2 className={styles.modal_titulo}>Detalle de Producto</h2>
      <p><span className={styles.text_b}>Denominacion</span>{producto.denominacion}</p>
      <p><span className={styles.text_b}>Descripcion </span> {producto.descripcion}</p>
      <p><span className={styles.text_b}>Categoria: </span> {producto.categoria.denominacion}
      </p>
      <p><span className={styles.text_b}>Habilitado? </span> {producto.habilitado}</p>
        {/* Mostrar todas las imágenes */}
        <div >
          <span className={styles.text_b}>Imágenes:</span>
          <div className={styles.imagenes}>
            {producto.imagenes.map((imagen, index) => (
              
              <img 
                key={index} 
                src={imagen.url} 
                alt={`Imagen ${index + 1} de ${producto.denominacion}`} 
              />
            ))}
          </div>
        </div>
          
        {/* Mostrar todos los alérgenos */}
        <p><span className={styles.text_b}>Alergenos:</span> 
          {producto.alergenos.length > 0 ? 
            producto.alergenos.map(alergeno => alergeno.id).join(', ') : 
            'No hay alérgenos'}
        </p>
      <p><span className={styles.text_b}>Precio: </span> {producto.precioVenta}</p>
      <p><span className={styles.text_b}>Categoria: </span> {producto.categoria.denominacion}</p>
      <div className={styles.modal_botones_contenedor }>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>
    </div>

  );
};

export default DetalleProducto;
