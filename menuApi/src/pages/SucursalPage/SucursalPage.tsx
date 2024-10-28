import React, { useEffect, useState } from 'react';
import { SucursalService } from '../../services/SucursalService/SucursalService';
import { ISucursal } from '../../types/dtos/sucursal/ISucursal';
import SucursalModal from '../../components/modals/BaseModal/CrearEditarSucursal/SucursalModal';


const sucursalService = new SucursalService();

export const SucursalPage: React.FC = () => {
    const [sucursales, setSucursales] = useState<ISucursal[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        // Obtener todas las sucursales al cargar la página
        fetchSucursales();
    }, []);

    const fetchSucursales = async () => {
        try {
            const data = await sucursalService.getAll();
            setSucursales(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleModalSuccess = () => {
        fetchSucursales(); // Refrescar la lista después de agregar
    };

    return (
        <div>
            <h2>Lista de Sucursales</h2>
            <button  onClick={() => setModalOpen(true)}>Agregar Sucursal</button>
            <div>
                {sucursales.map((sucursal) => (
                    <div key={sucursal.id}>
                        <h3>{sucursal.nombre}</h3>
                        <p>Horario de Apertura: {sucursal.horarioApertura}</p>
                        <p>Horario de Cierre: {sucursal.horarioCierre}</p>
                        {/* Otros campos que quieras mostrar */}
                    </div>
                ))}
            </div>
            <SucursalModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSuccess={handleModalSuccess} />
        </div>
    );
};

export default SucursalPage;
