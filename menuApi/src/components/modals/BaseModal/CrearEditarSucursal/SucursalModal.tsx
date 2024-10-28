import React, { useState } from 'react';
import { ICreateSucursal } from '../../../../types/dtos/sucursal/ICreateSucursal';
import { SucursalService } from '../../../../services/SucursalService/SucursalService';
import BaseModal from '../BaseModal';

import styles from './SucursalModal.module.css'


interface SucursalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Callback para manejar el éxito
}

const SucursalModal: React.FC<SucursalModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [sucursal, setSucursal] = useState<ICreateSucursal>({
        nombre: '',
        horarioApertura: '',
        horarioCierre: '',
        esCasaMatriz: false,
        latitud: 0,
        longitud: 0,
        domicilio: {
            id: 0, // Asegúrate de asignar un ID adecuado
            calle: '',
            numero: 0,
            cp: 0,
            piso: 0,
            nroDpto: 0,
            localidad: {
                id: 0, // Inicializa el ID de localidad
                nombre: '', // Inicializa el nombre de la localidad
                provincia:{
                    id: 0,
                    nombre: '',
                    pais:{
                        id: 0,
                        nombre: ''
                        
                    }}} },
        idEmpresa: 0,
        logo: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type } = e.target;
        const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : (e.target as HTMLInputElement).value;
    
        setSucursal((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDomicilioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSucursal(prev => ({
            ...prev,
            domicilio: {
                ...prev.domicilio,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async () => {
        const sucursalService = new SucursalService();
        await sucursalService.create(sucursal);
        onSuccess(); // Llama al callback para refrescar la lista de sucursales
        onClose(); // Cierra el modal
    };

    return (
        isOpen && (
            <BaseModal title="Crear una Sucursal" onClose={onClose} onSave={handleSubmit}>
                <div className={styles.containerPrincipal}>
                    <div >
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
                    />{' '}
                    Casa Matriz
                    </div>
                   <div>
                   <input
                        type="text"
                        name="pais"
                        value={sucursal.domicilio.localidad.provincia.pais.nombre}
                        onChange={handleDomicilioChange}
                        placeholder="País"
                    />
                    <input
                        type="text"
                        name="provincia"
                        value={sucursal.domicilio.localidad.provincia.nombre}
                        onChange={handleDomicilioChange}
                        placeholder="Provincia"
                    />
                    {/* Agrega campos para la localidad */}
                    <input
                        type="text"
                        name="localidad"
                        value={sucursal.domicilio.localidad.nombre}
                        onChange={handleDomicilioChange}
                        placeholder="Localidad"
                    />
                      <input
                        type="number"
                        name="latitud"
                        value={sucursal.latitud}
                        onChange={handleDomicilioChange}
                        placeholder="latitud"
                    />
                    <input
                        type="number"
                        name="longitud"
                        value={sucursal.longitud}
                        onChange={handleDomicilioChange}
                        placeholder="longitud"
                    />
                   </div>
                    <div>
                    <input
                        type="text"
                        name="calle"
                        value={sucursal.domicilio.calle}
                        onChange={handleDomicilioChange}
                        placeholder="Calle"
                    />
                    <input
                        type="number"
                        name="numero de la calle"
                        value={sucursal.domicilio.numero}
                        onChange={handleDomicilioChange}
                        placeholder="numero de la calle"
                    />
              
                    <input
                        type="text"
                        name="cp"
                        value={sucursal.domicilio.cp}
                        onChange={handleDomicilioChange}
                        placeholder="Código Postal"
                    />Codigo Postal
                    <input
                        type="number"
                        name="piso"
                        value={sucursal.domicilio.piso}
                        onChange={handleDomicilioChange}
                        placeholder="Piso "
                    />
                    <input
                        type="number"
                        name="nroDpto"
                        value={sucursal.domicilio.nroDpto}
                        onChange={handleDomicilioChange}
                        placeholder="Número de Departamento"
                    />
                    </div>
                    
                </div>
            </BaseModal>
        )
    );
};

export default SucursalModal;
