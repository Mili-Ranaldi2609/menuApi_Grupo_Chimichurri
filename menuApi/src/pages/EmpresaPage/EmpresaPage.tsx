import { Header } from "../../components/Header/Header";
import { useState } from "react";
import EmpresaModal from "../../components/modals/BaseModal/CrearEditarEmpresa/CrearEditarEmpresa";
import SucursalPage from "../SucursalPage/SucursalPage";
import EmpresaList from "../Lists/ListEmpresa/ListEmpresa";

export const EmpresaPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="pageEmpresaContainer">
            <Header nombreVista="Empresas" />
            <div>
                <button onClick={handleOpenModal}>Agregar Empresa</button>
            </div>
            <div className="pageEmpresaSucursal">
                <EmpresaList />
                <SucursalPage />
            </div>
            <div>
                <EmpresaModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSuccess={() => {}} // Puedes dejarlo vacío o manejarlo según necesites
                />
            </div>
        </div>
    );
};
