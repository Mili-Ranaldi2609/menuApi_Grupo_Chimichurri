
import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { CardSucursal } from "../../components/cards/CardSucursal";
import SucursalModal from "../../components/modals/BaseModal/CrearEditarSucursal/SucursalModal";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";






export const SucursalPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Callback cuando se crea una empresa con éxito
  const handleSuccess = () => {
    // Aquí puedes refrescar la lista de empresas o cualquier otra acción
    handleCloseModal();
  };
  const sucursali: ISucursal= {
      nombre: "",
      horarioApertura: "",
      horarioCierre: "",
      esCasaMatriz: false,
      latitud: 0,
      longitud: 0,
      domicilio: {
          id: 0, // Asegúrate de asignar un ID adecuado
          calle: '',
          numero: 0,
          cp: 0,
          piso: 0,
          nroDpto: 0,
          localidad: {
              id: 0, // Inicializa el ID de localidad
              nombre: '', // Inicializa el nombre de la localidad
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
        <button className="" onClick={handleOpenModal}>Agregar Sucursal</button>
      </div>
      <div className="pageEmpresaSucursal">
        <CardSucursal sucursal={sucursali}/>
      </div>
      <div>
      <SucursalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
      </div>
    </div>
    
  );
};
export default SucursalPage