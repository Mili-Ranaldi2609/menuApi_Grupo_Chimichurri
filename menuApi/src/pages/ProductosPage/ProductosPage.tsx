
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import ListProducto from "../Lists/ListProducto/ListProducto";
import ModalCreateProducto from "../../components/modals/BaseModal/CrearEditarProducto/CreateProducto";
import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
export const ProductoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCrearProductoIntermedio = () => {
    // Aquí puedes acceder a los datos del formulario o lo que necesites
    const productoData = {
      nombre: "Producto Ejemplo",
      precio: 100,
      // Otros datos de producto que necesitas
    };
    // Llamas a la función original pasando los datos
    handleCrearProducto(productoData);
  };

  const handleCrearProducto = (productoData: any) => {
    // Lógica para manejar el producto, por ejemplo, agregarlo a la lista o hacer una llamada a la API
    console.log("Producto creado:", productoData);
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
  const initialForm: ICreateProducto = {
    denominacion: "",
    precioVenta: 0,
    descripcion: "",
    habilitado: true,
    codigo: "",
    idCategoria: 0,
    idAlergenos: [],
    imagenes: [],
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
          onClose={handleCloseModal} sucursal={activeSucursal} initialForm={initialForm} handleCrearProducto={handleCrearProductoIntermedio}                   
                  
                  />
       
      </div>

      <div className="sucursal__contenedorCard">
        <ListProducto />
      </div>
    </div>
  );
};

export default ProductoPage;