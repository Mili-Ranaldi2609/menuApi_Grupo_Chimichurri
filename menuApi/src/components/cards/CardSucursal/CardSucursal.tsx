
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
      <img className='img_card_sucursal' src={sucursal.logo} alt="" />
      <div className='card__contenedor-botones'>
     
        {<button onClick={() => onView(sucursal)}>
        <span className="material-symbols-outlined">
visibility
</span></button>}
        <button onClick={() => onEdit(sucursal)}>
        <span className="material-symbols-outlined">
edit
</span>
        </button>
      </div>
    </div>
  );
};

export default CardSucursal;
