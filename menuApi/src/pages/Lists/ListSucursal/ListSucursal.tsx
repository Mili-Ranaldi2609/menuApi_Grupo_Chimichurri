// ListSucursales.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'; // Asegúrate de definir este tipo
import { RootState } from '../../../redux/store/store';
import DetalleSucursal from '../../../components/cards/CardSucursal/DetalleSucursal/DetalleSucursal';
import CardSucursal from '../../../components/cards/CardSucursal/CardSucursal';
import ModalCreateSucursal from '../../../components/modals/BaseModal/CrearEditarSucursal/SucursalModal';
import axios from 'axios';

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
                const response = await axios.get(`http://190.221.207.224:8090/sucursales/porEmpresa/${activeEmpresa.id}`);
                setSucursales(response.data); // Ajusta esto según la estructura de respuesta de tu API
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
    
  const handleShowDetails = (sucursal: ISucursal) => {
    setSelectedSucursal(sucursal);
    setIsEditMode(false); // Vista solo de detalles
    setIsModalOpen(false);
  };

  const handleEdit = (sucursal: ISucursal) => {
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
            <h2>Sucursales de {activeEmpresa?.nombre}</h2>
            <div className="sucursales-list">
                {sucursales.map((sucursal) => (
                    <CardSucursal
                        key={sucursal.id}
                        onView={handleShowDetails}
                        onEdit={handleEdit} sucursal={sucursal}                  />
                ))}
            </div>
            {isModalOpen && (
        <ModalCreateSucursal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    empresa={activeEmpresa} 
                    sucursal={isEditMode && selectedSucursal ? selectedSucursal : undefined}        />
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
