import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { Table } from 'react-bootstrap';
import styles from './ListAlergeno.module.css';
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';
import ModalUpdateAlergeno from '../../../components/modals/BaseModal/CrearEditarAlergeno/UpdateAlergeno';
import DetalleAlergeno from '../../../components/cards/DetalleAlergeno/DetalleAlergeno';
import { AlergenoService } from '../../../services/AlergenoService/AlergenoService';

const ListAlergeno: React.FC = () => {
    const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
    const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlergeno, setSelectedAlergeno] = useState<IAlergenos | null>(null);
    const alergenoService= new AlergenoService(`http://190.221.207.224:8090/alergenos`)
    useEffect(() => {
        const fetchAlergenos = async () => {
            if (!activeSucursal) {
                console.error("No hay sucursal activa");
                return;
            }

            try {
                const response = await fetch(`http://190.221.207.224:8090/alergenos`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener sucursales');
                }
                
                const data = await response.json();
                console.log("Datos recibidos de la API:", data);
                setAlergenos(data);
            } catch (err) {
                console.error("Error en la solicitud:", err);
                setError('Error al obtener los artículos de la sucursal');
            } finally {
                setLoading(false);
            }
        };
    
        fetchAlergenos();
    }, [activeSucursal]);
    
    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleShowDetails = (alergeno: IAlergenos) => {
        setSelectedAlergeno(alergeno);
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEdit = (alergeno: IAlergenos) => {
        setSelectedAlergeno(alergeno);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedAlergeno(null);
        setIsModalOpen(false);
        setIsEditMode(false); // Añade esta línea para reiniciar el estado de edición
    };
    const handleDelete = async (id: number) => {
        try {
            await alergenoService.delete(id); // Llama al método delete del servicio
            setAlergenos(alergenos.filter(alergeno => alergeno.id !== id)); // Actualiza el estado
        } catch (error) {
            alert("Error al eliminar el alergeno, producto asociado al mismo, ")
            console.error("Error al eliminar el alergeno:", error);
            
        }
    };

    return (
        <div>
            <div className={styles.alergenos_list}>
            <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alergenos.map((alergeno) => (
                            <tr key={alergeno.id}>
                                <td>{alergeno.denominacion}</td>
                                <td className={styles.card__botones}>
                                        <span onClick={() => handleShowDetails(alergeno)} id={styles.boton} className="material-symbols-outlined">visibility</span>
                                        <span onClick={() => handleEdit(alergeno)} id={styles.boton} className="material-symbols-outlined">edit</span>
                                        <span onClick={() => handleDelete(alergeno.id)} id={styles.boton}className="material-symbols-outlined">delete</span>
                                        
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            
                        {isModalOpen && selectedAlergeno && isEditMode && (
                <ModalUpdateAlergeno
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    alergeno={selectedAlergeno}
                />
            )}

            {isModalOpen && selectedAlergeno && !isEditMode && (
                <DetalleAlergeno
                    alergeno={selectedAlergeno}
                    onClose={handleCloseModal}
                />
            )}

        </div>
    );
};

export default ListAlergeno;