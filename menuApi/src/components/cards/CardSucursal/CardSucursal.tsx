import { ISucursal } from '../../../types/dtos/sucursal/ISucursal';
import { useDispatch } from 'react-redux';
import './CardSucursal.css';
import { setActiveSucursal } from '../../../redux/slices/sucursalActivaSlice';

interface CardSucursalProps {
  sucursal: ISucursal;
  onView: (sucursal: ISucursal) => void;
  onEdit: (sucursal: ISucursal) => void;
}

const CardSucursal: React.FC<CardSucursalProps> = ({ sucursal, onView, onEdit }) => {
  const dispatch = useDispatch();
  console.log("Sucursal despachada:", sucursal);
  const handleLoginClick = () => {
    dispatch(setActiveSucursal(sucursal));
    localStorage.setItem("activeSucursal", JSON.stringify(sucursal));
    window.open('/administracion', "_blank");
  };
  
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
          <span onClick={() => onView(sucursal)} className="boton material-symbols-outlined">visibility</span>
          <span onClick={() => onEdit(sucursal)} className="boton material-symbols-outlined">edit</span>
          <span onClick={handleLoginClick} className="boton material-symbols-outlined">login</span>
        </div>
      </div>
    </div>
  );
};

export default CardSucursal;
