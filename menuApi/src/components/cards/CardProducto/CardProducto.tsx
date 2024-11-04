
import { IProductos } from '../../../types/dtos/productos/IProductos';
interface CardProductosProps {
  producto: IProductos;
  onView: (producto: IProductos) => void;
  onEdit: (producto: IProductos) => void;

}

const CardProducto: React.FC<CardProductosProps> = ({ producto, onView, onEdit }) => {
  
  return (
    <div className='card-sucursal'>
     <h3>{producto.denominacion}</h3>
      <p>Descripción: {producto.descripcion}</p>
      <p>Habilitado: {producto.habilitado ? "Sí" : "No"}</p>
      {producto.imagenes && producto.imagenes.length > 0 ? (
        <img className="img_card_producto" src={producto.imagenes[0].url} alt={`Imagen de ${producto.denominacion}`} />
      ) : (
        <span className="material-symbols-outlined img-placeholder icono">add_a_photo</span>
      )}
      <div className='card__contenedor-botones'>
        <div className="cardSucursal__botones">
        {<span onClick={() => onView(producto)} className="boton material-symbols-outlined">visibility</span>}
        {<span onClick={() => onEdit(producto)} className="boton material-symbols-outlined">edit</span>}
        </div>


      </div>
    </div>
  );
};

export default CardProducto;
