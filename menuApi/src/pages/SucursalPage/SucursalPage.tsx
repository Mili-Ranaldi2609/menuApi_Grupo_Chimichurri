
import { useState } from "react";
import "./SucursalPage.css";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import ListSucursales from "../Lists/ListSucursal/ListSucursal";
import ModalCreateSucursal from "../../components/modals/BaseModal/CrearEditarSucursal/CreateSucursal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
export const SucursalPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const activeEmpresa = useSelector((state: RootState) => state.empresaActiva.activeEmpresa);
  // Puedes eliminar esta declaración de 'sucursali' si estás obteniendo las sucursales a través del API
  const sucursali: ISucursal = {
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    esCasaMatriz: false,
    latitud: 0,
    longitud: 0,
    domicilio: {
      id: 0,
      calle: '',
      numero: 0,
      cp: 0,
      piso: 0,
      nroDpto: 0,
      localidad: {
        id: 0,
        nombre: '',
        provincia: {
          id: 0,
          nombre: '',
          pais: {
            id: 0,
            nombre: ''
          }
        }
      }
    },
    empresa: {
      id: 0
    },
    logo: "",
    id: 0,
    calle: ""
  };

  return (
    <div className="pageSucursal-container">
      <div className="">
        <div className="sucursal__header-contenedor">
          {activeEmpresa ? (
            <h2>Sucursales en: {activeEmpresa.nombre}</h2>
          ) : (
            <h2>Sucursales</h2>
          )}
          <button className="sucursal__boton" onClick={handleOpenModal}>Agregar Sucursal</button>
        </div>

        <ModalCreateSucursal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          idEmpresa={activeEmpresa?.id ||0}
          sucursal={sucursali}
        />
      </div>

      <div className="sucursal__contenedorCard">
        <ListSucursales />
      </div>
    </div>
  );
};

export default SucursalPage;
