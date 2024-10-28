import { useNavigate } from "react-router-dom";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";


interface cardSucursalProps{
    sucursal: ISucursal
}

export const CardSucursal: React.FC<cardSucursalProps> = ({sucursal}) => {
    
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/sucursales");
  };
  return (
      <div className="cartaSucursal" onClick={handleNavigate}>
        <h1>{`${sucursal.empresa.name} - ${sucursal.nombre}`}</h1>
        <p>{`Apertura ${sucursal.horarioApertura} - ${sucursal.horarioCierre}`}</p>
        <img src={sucursal.logo} alt="" />
        <div>
          <button className="location">
            <span className="material-symbols-outlined">location_city</span>
          </button>
          <button className="edit">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="visibility">
            <span className="material-symbols-outlined">visibility</span>
          </button>
        </div>
      </div>

  )
}