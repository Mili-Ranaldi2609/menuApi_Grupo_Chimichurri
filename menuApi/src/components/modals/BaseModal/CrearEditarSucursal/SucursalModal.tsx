import React, { useState } from 'react';
import { ICreateSucursal } from '../../../../types/dtos/sucursal/ICreateSucursal';
import { SucursalService } from '../../../../services/SucursalService/SucursalService';
import BaseModal from '../BaseModal';

interface SucursalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const SucursalModal: React.FC<SucursalModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [sucursal, setSucursal] = useState<ICreateSucursal>({
        nombre: '',
        horarioApertura: '',
        horarioCierre: '',
        esCasaMatriz: false,
        latitud: 0,
        longitud: 0,
        domicilio: {
            id: 0,
            calle: '',
            numero: 0,
            cp: 0,
            piso: 0,
            nroDpto: 0,
            localidad: {
                id: 0,
                nombre: '',
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
        idEmpresa: 0,
        logo: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        const parsedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked 
                          : type === 'number' ? parseInt(value) || 0 
                          : value;

        // Detecta campos anidados y actualiza recursivamente
        setSucursal(prev => {
            const keys = name.split('.');
            let obj: any = { ...prev };
            keys.reduce((acc, key, idx) => {
                if (idx === keys.length - 1) {
                    acc[key] = parsedValue;
                } else {
                    acc[key] = { ...acc[key] };
                }
                return acc[key];
            }, obj);
            return obj;
        });
    };

    const handleSubmit = async () => {
        const sucursalService = new SucursalService();
        await sucursalService.create(sucursal);
        onSuccess();
        onClose();
    };

    return (
        isOpen && (
            <BaseModal title="Crear una Sucursal" onClose={onClose} onSave={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="nombre"
                        value={sucursal.nombre}
                        onChange={handleChange}
                        placeholder="Nombre de la sucursal"
                    />
                    <input
                        type="text"
                        name="horarioApertura"
                        value={sucursal.horarioApertura}
                        onChange={handleChange}
                        placeholder="Horario de Apertura"
                    />
                    <input
                        type="text"
                        name="horarioCierre"
                        value={sucursal.horarioCierre}
                        onChange={handleChange}
                        placeholder="Horario de Cierre"
                    />
                    <input
                        type="checkbox"
                        name="esCasaMatriz"
                        checked={sucursal.esCasaMatriz}
                        onChange={handleChange}
                    />
                    {' '} Casa Matriz

                    {/* Campos anidados usando nombres completos */}
                    <input
                        type="text"
                        name="domicilio.localidad.provincia.pais.nombre"
                        value={sucursal.domicilio.localidad.provincia.pais.nombre}
                        onChange={handleChange}
                        placeholder="País"
                    />
                    <input
                        type="text"
                        name="domicilio.localidad.provincia.nombre"
                        value={sucursal.domicilio.localidad.provincia.nombre}
                        onChange={handleChange}
                        placeholder="Provincia"
                    />
                    <input
                        type="text"
                        name="domicilio.localidad.nombre"
                        value={sucursal.domicilio.localidad.nombre}
                        onChange={handleChange}
                        placeholder="Localidad"
                    />
                    <input
                        type="number"
                        name="latitud"
                        value={sucursal.latitud}
                        onChange={handleChange}
                        placeholder="Latitud"
                    />Latitud
                    <input
                        type="number"
                        name="longitud"
                        value={sucursal.longitud}
                        onChange={handleChange}
                        placeholder="Longitud"
                    />Longitud

                    <input
                        type="text"
                        name="domicilio.calle"
                        value={sucursal.domicilio.calle}
                        onChange={handleChange}
                        placeholder="Calle"
                    />
                    <input
                        type="number"
                        name="domicilio.numero"
                        value={sucursal.domicilio.numero}
                        onChange={handleChange}
                        placeholder="Número de la calle"
                    />Numero Calle
                    <input
                        type="number"
                        name="domicilio.cp"
                        value={sucursal.domicilio.cp}
                        onChange={handleChange}
                        placeholder="Código Postal"
                    />
                    <input
                        type="number"
                        name="domicilio.piso"
                        value={sucursal.domicilio.piso}
                        onChange={handleChange}
                        placeholder="Piso"
                    />
                    <input
                        type="number"
                        name="domicilio.nroDpto"
                        value={sucursal.domicilio.nroDpto}
                        onChange={handleChange}
                        placeholder="Número de Departamento"
                    />
                </div>
            </BaseModal>
        )
    );
};

export default SucursalModal;
