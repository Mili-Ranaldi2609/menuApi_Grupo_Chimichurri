
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import ModalCreateAlergeno from "../../components/modals/BaseModal/CrearEditarAlergeno/CreateAlergeno";
import ListAlergeno from "../Lists/ListAlergeno/ListAlergeno";
export const AlergenoPage =  ()=> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
  // Puedes eliminar esta declaración de 'sucursali' si estás obteniendo las sucursales a través del API
  const alergenoi: IAlergenos = {
    id: 0,
    denominacion: "",
    imagen: {
      name:'',
      url:''
    }
  };

  return (
    <div className="pageSucursal-container">
      <div className="">
        <div className="sucursal__header-contenedor">
          <button className="sucursal__boton" onClick={handleOpenModal}>Agregar Alergeno</button>
          
          {activeSucursal ? (
            <h2>Alergenos en: {activeSucursal.nombre}</h2>
          ) : (
            <h2>Alergenos</h2>
          )}
        </div>

        <ModalCreateAlergeno
          isOpen={isModalOpen}
          onClose={handleCloseModal} alergeno={alergenoi}        />
      </div>

      <div className="sucursal__contenedorCard">
        <ListAlergeno />
      </div>
    </div>
  );
};

export default AlergenoPage;
