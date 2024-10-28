
import { useState } from "react";
import CardEmpresa from "../../components/cards/CardEmpresa/CardEmpresa";
import { Header } from "../../components/Header/Header";
import EmpresaModal from "../../components/modals/BaseModal/CrearEditarEmpresa/CrearEditarEmpresa";
import { IEmpresa } from "../../types/IEmpresa";


import SucursalPage from "../SucursalPage/SucursalPage";




export const EmpresaPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Callback cuando se crea una empresa con éxito
  const handleSuccess = () => {
    // Aquí puedes refrescar la lista de empresas o cualquier otra acción
    handleCloseModal();
  };
  const empresai: IEmpresa = {
    name: '',
    description: "",
    

  };

  return (
    <div className="pageEmpresaContainer">
      <Header nombreVista="Empresas" />
      <div>
        <button className="" onClick={handleOpenModal}>Agregar Empresa</button>
      </div>
      <div className="pageEmpresaSucursal">
        <CardEmpresa empresa={empresai}/>
        <SucursalPage />
      </div>
      <div>
      <EmpresaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
      </div>
    </div>
    
  );
};
