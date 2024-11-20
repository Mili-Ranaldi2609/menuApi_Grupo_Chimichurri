import styles from "./AlergenoPage.module.css";
import { useState } from "react";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import ModalCreateCategoria from "../../components/modals/BaseModal/CrearEditarAlergeno/CreateAlergeno";
import ListAlergeno from "../Lists/ListAlergeno/ListAlergeno";
export const AlergenoPage =  ()=> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
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
          <button className={styles.alergenos__boton} onClick={handleOpenModal}>Agregar Alergeno</button>
          
        </div>

        <ModalCreateCategoria
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