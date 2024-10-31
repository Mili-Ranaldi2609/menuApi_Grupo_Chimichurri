import styles from"./EmpresaPage.module.css";
import { Header } from "../../components/Header/Header";
import { useState } from "react";
import EmpresaModal from "../../components/modals/BaseModal/CrearEditarEmpresa/CrearEditarEmpresa";
import SucursalPage from "../SucursalPage/SucursalPage";
import EmpresaList from "../Lists/ListEmpresa/ListEmpresa";

export const EmpresaPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    /*const handleOpenModal = () => setIsModalOpen(true);*/
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className={styles.pageEmpresaContainer}>
            <div className={styles.empresaList}>
                {/* <Header nombreVista="Empresas" /> */}
                <h1 className={styles.empresaList_title}>Empresas</h1>
                <EmpresaList />
            </div>
            { <div>
                <EmpresaModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSuccess={() => {}} // Puedes dejarlo vacío o manejarlo según necesites
                />
                <div className={styles.pageSucursalContainer}>
                    <SucursalPage />
                </div>
            </div> }
        </div>
    );
};
