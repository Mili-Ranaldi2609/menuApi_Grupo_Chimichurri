// ListSucursales.tsx
import React, { useEffect, useState } from 'react';
import "./ListSucursal.css";
import { useDispatch, useSelector } from 'react-redux';

import { ISucursal } from '../../../types/dtos/sucursal/ISucursal';
import { RootState } from '../../../redux/store/store';
import DetalleSucursal from '../../../components/cards/CardSucursal/DetalleSucursal/DetalleSucursal';
import CardSucursal from '../../../components/cards/CardSucursal/CardSucursal';
import ModalUpdateSucursal from '../../../components/modals/BaseModal/CrearEditarSucursal/UpdateSucursal';
import { setActiveSucursal } from '../../../redux/slices/sucursalActivaSlice';

const ListSucursales: React.FC = () => {
    const activeEmpresa = useSelector((state: RootState) => state.empresaActiva.activeEmpresa);
    const [sucursales, setSucursales] = useState<ISucursal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSucursal, setSelectedSucursal] = useState<ISucursal | null>(null);

    useEffect(() => {
        const fetchSucursales = async () => {
            if (!activeEmpresa) return;

            try {
                const response = await fetch(`http://190.221.207.224:8090/sucursales/porEmpresa/${activeEmpresa.id}`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener sucursales');
                }
                
                const data = await response.json();
                setSucursales(data); // Ajusta esto según la estructura de respuesta de tu API
            } catch (err) {
                setError('Error al obtener sucursales');
            } finally {
                setLoading(false);
            }
        };

        fetchSucursales();
    }, [activeEmpresa]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const dispatch = useDispatch();

    const handleShowDetails = (sucursal: ISucursal) => {
        dispatch(setActiveSucursal(sucursal)); // Actualiza la sucursal activa en Redux
        setSelectedSucursal(sucursal);
        setIsEditMode(false); // Vista solo de detalles
        setIsModalOpen(false);
    };

    const handleEdit = (sucursal: ISucursal) => {
        dispatch(setActiveSucursal(sucursal)); // Actualiza la sucursal activa en Redux
        setSelectedSucursal(sucursal);
        setIsEditMode(true); // Activar modo de edición
        setIsModalOpen(true); // Abre el modal en modo edición
    };

    const handleCloseModal = () => {
        setSelectedSucursal(null);
        setIsModalOpen(false);
    };
 


    return (
        <div>
            <div className="sucursales-list">
                {sucursales.map((sucursal) => (
                    <CardSucursal
                        key={sucursal.id}
                        onView={handleShowDetails}
                        onEdit={handleEdit}
                        sucursal={sucursal}
                    />
                ))}
            </div>
            {isModalOpen && (
                <ModalUpdateSucursal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    empresa={activeEmpresa}
                    sucursal={isEditMode && selectedSucursal ? selectedSucursal : undefined}                />
            )}
            {selectedSucursal && !isEditMode && (
                <DetalleSucursal
                    sucursal={selectedSucursal}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ListSucursales;
