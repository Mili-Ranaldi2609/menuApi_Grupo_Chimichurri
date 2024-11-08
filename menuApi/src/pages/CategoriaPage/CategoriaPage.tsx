
import { useState } from "react";
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
    <div className="pageCategoria_container">
      <div className="">
        <div className="categoria__header_contenedor">
          <button className="categoria__boton" onClick={handleOpenModal}>Agregar Categoria</button>
          
          {activeSucursal ? (
            <h2>Categorias en: {activeSucursal.nombre}</h2>
          ) : (
            <h2>Categorias</h2>
          )}
        </div>

        <ModalCreateCategoria
          isOpen={isModalOpen}
          onClose={handleCloseModal} categoria={categoriai}    idEmpresa={activeSucursal?.empresa.id}    />
      </div>

      <div className="categoria__contenedorCard">
        <ListCategoria/>
      </div>
    </div>
  );
};

export default CategoriaPage;
