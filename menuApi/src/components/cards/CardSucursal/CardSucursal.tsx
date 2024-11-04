
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal';
import './CardSucursal.css';
interface CardSucursalProps {
  sucursal: ISucursal;
  onView: (sucursal: ISucursal) => void;
  onEdit: (sucursal: ISucursal) => void;

}

const CardSucursal: React.FC<CardSucursalProps> = ({ sucursal, onView, onEdit }) => {
  
  return (
    <div className='card-sucursal'>
      <h3>{sucursal.nombre}</h3>
      <p> Apertura: {sucursal.horarioApertura} - {sucursal.horarioCierre}</p>
      <p>{sucursal.esCasaMatriz}</p>
      {sucursal.logo ? (
        <img className="img_card_sucursal" src={sucursal.logo} alt="Logo de sucursal" />
      ) : (
        <span className="material-symbols-outlined img-placeholder icono">add_a_photo</span>
      )}
      <div className='card__contenedor-botones'>
        <div className="cardSucursal__botones">
        {<span onClick={() => onView(sucursal)} className="boton material-symbols-outlined">visibility</span>}
        {<span onClick={() => onEdit(sucursal)} className="boton material-symbols-outlined">edit</span>}
        </div>


      </div>
    </div>
  );
};

export default CardSucursal;
