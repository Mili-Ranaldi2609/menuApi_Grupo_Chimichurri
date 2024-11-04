
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';
interface CardProductosProps {
  alergeno: IAlergenos;
  onView: (alergeno: IAlergenos) => void;
  onEdit: (alergeno: IAlergenos) => void;

}

const CardAlergeno: React.FC<CardProductosProps> = ({ alergeno, onView, onEdit }) => {
  
  return (
    <div className='card-sucursal'>
     <h3>{alergeno.denominacion}</h3>
      {alergeno.imagen ? (
        <img className="img_card_producto" src={alergeno.imagen.url} alt={`Imagen de ${alergeno.denominacion}`} />
      ) : (
        <span className="material-symbols-outlined img-placeholder icono">add_a_photo</span>
      )}
      <div className='card__contenedor-botones'>
        <div className="cardSucursal__botones">
        {<span onClick={() => onView(alergeno)} className="boton material-symbols-outlined">visibility</span>}
        {<span onClick={() => onEdit(alergeno)} className="boton material-symbols-outlined">edit</span>}
        </div>


      </div>
    </div>
  );
};

export default CardAlergeno;
