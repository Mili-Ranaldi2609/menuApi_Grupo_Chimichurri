// ListSucursales.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'; // Asegúrate de definir este tipo
import { RootState } from '../../../redux/store/store';

const ListSucursales: React.FC = () => {
    const activeEmpresa = useSelector((state: RootState) => state.empresaActiva.activeEmpresa);
    const [sucursales, setSucursales] = useState<ISucursal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div>
            <h2>Sucursales de {activeEmpresa?.nombre}</h2>
            <div className="sucursales-list">
                {sucursales.map((sucursal) => (
                    <div key={sucursal.id} className="sucursal-card">
                        <h3>{sucursal.nombre}</h3>
                        <p>Horario Apertura: {sucursal.horarioApertura}</p>
                        <p>Horario Cierre: {sucursal.horarioCierre}</p>
                        <p>Casa Matriz?: {sucursal.esCasaMatriz}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListSucursales;
