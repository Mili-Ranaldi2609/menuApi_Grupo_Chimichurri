// SucursalPage.tsx
import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { CardSucursal } from "../../components/cards/CardSucursal";
import SucursalModal from "../../components/modals/BaseModal/CrearEditarSucursal/SucursalModal";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import ListSucursales from "../Lists/ListSucursal/ListSucursal";

export const SucursalPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    handleCloseModal();
    // Aquí puedes agregar lógica adicional, como refrescar la lista de sucursales.
  };

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
  };

  return (
    <div className="pageSucursalContainer">
      <Header nombreVista="sucursales" />
      <div>
        <button onClick={handleOpenModal}>Agregar Sucursal</button>
      </div>
      <div className="pageEmpresaSucursal">
        <CardSucursal sucursal={sucursali} />
      </div>
      <div>
        <SucursalModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          empresa={sucursali.empresa}
          sucursal={sucursali}
        />
      </div>
      {/* Agregar el componente ListSucursales aquí */}
      <ListSucursales />
    </div>
  );
};

export default SucursalPage;
