
import { useState } from "react";
import styles from "./CategoriaPage.module.css"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import ModalCreateCategoria from "../../components/modals/BaseModal/CrearEditarCategorias/CreateCategoria";
import ListCategoria from "../Lists/ListCategoria/ListCategoria";
export const CategoriaPage =  ()=> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
  // Puedes eliminar esta declaración de 'sucursali' si estás obteniendo las sucursales a través del API
  const categoriai: ICategorias = {
    id: 0,
    denominacion: "",
    eliminado: false,
    sucursal: undefined,
    subCategorias: [],
    articulos: undefined
  };

  return (
    <div className={styles.pageCategoria_container}>
      <div className="">
        <div className={styles.categoria__boton_contenedor}>
          <button className={styles.categoria__boton} onClick={handleOpenModal}>Agregar Categoria</button>
        </div>

        <ModalCreateCategoria
          isOpen={isModalOpen}
          onClose={handleCloseModal} categoria={categoriai}    idEmpresa={activeSucursal?.empresa.id}    />
      </div>

      <div className={styles.categoria__contenedorCard}>
        <ListCategoria/>
      </div>
    </div>
  );
};

export default CategoriaPage;
