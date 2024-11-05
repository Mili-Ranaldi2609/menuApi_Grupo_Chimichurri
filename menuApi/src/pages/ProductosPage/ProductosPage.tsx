
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { IProductos } from "../../types/dtos/productos/IProductos";
import ListProducto from "../Lists/ListProducto/ListProducto";
import ModalCreateProducto from "../../components/modals/BaseModal/CrearEditarProducto/CreateProducto";
export const ProductoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
  // Puedes eliminar esta declaración de 'sucursali' si estás obteniendo las sucursales a través del API
  const product: IProductos = {
      id: 0,
      denominacion: "",
      precioVenta: 0,
      descripcion: "",
      eliminado: false,
      habilitado: false,
      codigo: "",
      alergenos: [],
      imagenes: []
  };

  return (
    <div className="pageSucursal-container">
      <div className="">
        <div className="sucursal__header-contenedor"> 
          <button className="sucursal__boton" onClick={handleOpenModal}>Agregar Producto</button> 
        {activeSucursal ? (
            <h2>Productos en: {activeSucursal.nombre}</h2>
          ) : (
            <h2>Productos</h2>
          )}
           
        </div>
       
        <ModalCreateProducto
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  producto={product}      
                  
                  />
       
      </div>

      <div className="sucursal__contenedorCard">
        <ListProducto />
      </div>
    </div>
  );
};

export default ProductoPage;