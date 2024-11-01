import React, { useEffect, useState } from 'react';
import SucursalService from '../../../../services/SucursalService/SucursalService';
import { ICreateSucursal } from '../../../../types/dtos/sucursal/ICreateSucursal';
import { ISucursal } from '../../../../types/dtos/sucursal/ISucursal';
import BaseModal from '../BaseModal';
import { IEmpresa2 } from '../../../../types/dtos/empresa/IEmpresa2';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';

interface SucursalModalProps {
    isOpen: boolean;
    onClose: () => void;
    sucursal?: ISucursal;
    empresa?: IEmpresa2;
}

const ModalCreateSucursal: React.FC<SucursalModalProps> = ({ isOpen, onClose, sucursal, empresa }) => {
    const [formData, setFormData] = useState<ICreateSucursal>({
        id: sucursal?.id,
        nombre: sucursal?.nombre || '',
        horarioApertura: sucursal?.horarioApertura || '',
        horarioCierre: sucursal?.horarioCierre || '',
        esCasaMatriz: sucursal?.esCasaMatriz || false,
        latitud: sucursal?.latitud || 0,
        longitud: sucursal?.longitud || 0,
        domicilio: {
            calle: sucursal?.domicilio.calle || '',
            numero: sucursal?.domicilio.numero || 0,
            cp: sucursal?.domicilio.cp || 0,
            piso: sucursal?.domicilio.piso || 0,
            nroDpto: sucursal?.domicilio.nroDpto || 0,
            localidad: {
                nombre: sucursal?.domicilio.localidad.nombre || '',
                provincia: {
                    nombre: sucursal?.domicilio.localidad.provincia.nombre || '',
                    pais: { nombre: sucursal?.domicilio.localidad.provincia.pais.nombre || '' }
                }
            }
        },
        logo: sucursal?.logo || '',
        empresa: { id: sucursal?.empresa.id || 0 }
    });

    useEffect(() => {
        if (sucursal) {
            setFormData({
                id: sucursal.id,
                nombre: sucursal.nombre,
                horarioApertura: sucursal.horarioApertura,
                horarioCierre: sucursal.horarioCierre,
                esCasaMatriz: sucursal.esCasaMatriz,
                latitud: sucursal.latitud,
                longitud: sucursal.longitud,
                domicilio: sucursal.domicilio,
                logo: sucursal.logo || '',
                empresa: sucursal.empresa
            });
        }
    }, [sucursal]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            const keys = name.split(".");
            let updatedData: any = { ...prev };

            keys.reduce((acc, key, index) => {
                if (index === keys.length - 1) {
                    acc[key] = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
                } else {
                    acc[key] = { ...acc[key] };
                }
                return acc[key];
            }, updatedData);

            return updatedData;
        });
    };
    
    const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
    const handleSubmit = async () => {
        const sucursalService = new SucursalService();
        try {
            if (sucursal) {
                // Si estamos editando
                await sucursalService.updateSucursalById(activeSucursal?.id, activeSucursal, empresa);
            } else {
                // Creación de una nueva sucursal
                await sucursalService.createSucursalByEmpresa(formData, empresa);
            }
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Error al guardar la sucursal:', error);
        }
    };

    return (
        isOpen && (
            <BaseModal title={activeSucursal ? "Editar Sucursal" : "Crear Sucursal"} onClose={onClose} onSave={handleSubmit}>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                
                <div>
                    <label>Horario Apertura</label>
                    <input type="time" name="horarioApertura" value={formData.horarioApertura} onChange={handleChange} required />
                </div>
                
                <div>
                    <label>Horario Cierre</label>
                    <input type="time" name="horarioCierre" value={formData.horarioCierre} onChange={handleChange} required />
                </div>
                
                <label>
                    <input type="checkbox" name="esCasaMatriz" checked={formData.esCasaMatriz} onChange={handleChange} />
                    Es Casa Matriz
                </label>
                
                <h3>Domicilio</h3>
                <input type="text" name="domicilio.calle" value={formData.domicilio.calle} onChange={handleChange} placeholder="Calle" required />
                
                <div>
                    <label>Numero Calle</label>
                    <input type="number" name="domicilio.numero" value={formData.domicilio.numero} onChange={handleChange} required />
                </div>
                
                <div>
                    <label>Codigo Postal</label>
                    <input type="number" name="domicilio.cp" value={formData.domicilio.cp} onChange={handleChange} required />
                </div>
                
                <div>
                    <label>Piso</label>
                    <input type="number" name="domicilio.piso" value={formData.domicilio.piso} onChange={handleChange} />
                </div>
                
                <div>
                    <label>Nro Departamento</label>
                    <input type="number" name="domicilio.nroDpto" value={formData.domicilio.nroDpto} onChange={handleChange} />
                </div>
                
                <input type="text" name="domicilio.localidad.nombre" value={formData.domicilio.localidad.nombre} onChange={handleChange} placeholder="Localidad" required />
                <input type="text" name="domicilio.localidad.provincia.nombre" value={formData.domicilio.localidad.provincia.nombre} onChange={handleChange} placeholder="Provincia" required />
                <input type="text" name="domicilio.localidad.provincia.pais.nombre" value={formData.domicilio.localidad.provincia.pais.nombre} onChange={handleChange} placeholder="País" required />
                
                <input type="text" name="logo" value={formData.logo} onChange={handleChange} placeholder="Logo URL" />
            </BaseModal>
        )
    );
};

export default ModalCreateSucursal;
