import styles from"./EmpresaPage.module.css";
import { Header } from "../../components/Header/Header";
import { useState } from "react";
import EmpresaModal from "../../components/modals/BaseModal/CrearEditarEmpresa/CrearEditarEmpresa";
import SucursalPage from "../SucursalPage/SucursalPage";
import EmpresaList from "../Lists/ListEmpresa/ListEmpresa";

export const EmpresaPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className={styles.pageEmpresaContainer}>
            <Header nombreVista="Empresas" />
            
            <div className={styles.empresaList}>
                <EmpresaList />
            </div>
            { <div>
                <EmpresaModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSuccess={() => {}} // Puedes dejarlo vacío o manejarlo según necesites
                />
                <SucursalPage></SucursalPage>
            </div> }
        </div>
    );
};
