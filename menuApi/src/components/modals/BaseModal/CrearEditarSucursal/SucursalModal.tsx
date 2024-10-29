import React, { useEffect, useState } from 'react';
import SucursalService from '../../../../services/SucursalService/SucursalService';
import { ICreateSucursal } from '../../../../types/dtos/sucursal/ICreateSucursal';
import { ISucursal } from '../../../../types/dtos/sucursal/ISucursal';
import BaseModal from '../BaseModal'; // Asegúrate de que la ruta sea correcta
import { IEmpresa } from '../../../../types/IEmpresa';

interface SucursalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (sucursal: ISucursal) => void; // Notifica al padre cuando se crea o edita una sucursal
    sucursal?: ISucursal; // Prop opcional para editar
    empresa:IEmpresa // ID de la empresa a la que pertenece la sucursal
}

const ModalCreateSucursal: React.FC<SucursalModalProps> = ({ isOpen, onClose, onSuccess, sucursal, empresa }) => {
    const [formData, setFormData] = useState<ICreateSucursal>({
        id: sucursal?.id || 0, // Solo si es para editar
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
                    pais: {
                        nombre: sucursal?.domicilio.localidad.provincia.pais.nombre || ''
                    }
                }
            }
        },
        logo: sucursal?.logo || '', // Mantener como cadena vacía en lugar de null
        empresa:sucursal?.empresa.id || 0 
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
                logo: sucursal.logo || ''
            });
        } else {
            resetForm();
        }
    }, [sucursal, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            ...(name.startsWith('domicilio.') && { 
                domicilio: { 
                    ...prev.domicilio, 
                    [name.split('.')[1]]: type === 'number' ? Number(value) : value 
                } 
            })
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sucursalService = new SucursalService();

        try {
            let nuevaSucursal;
            if (sucursal) {
                // Si estamos editando
                nuevaSucursal = await sucursalService.updateSucursalById(formData.id, formData);
            } else {
                // Si estamos creando, incluye idEmpresa
                const dataToCreate: ICreateSucursal = {
                    ...formData,
                    empresa // Asegúrate de que idEmpresa se pase aquí
                };
                nuevaSucursal = await sucursalService.createSucursalByEmpresa(dataToCreate, empresa);
            }
            if (nuevaSucursal) {
                onSuccess(nuevaSucursal); // Notificar a la página que la sucursal fue creada o editada
                onClose(); // Cierra el modal
            } else {
                console.error('Error al guardar la sucursal');
            }
        } catch (error) {
            console.error('Error al guardar la sucursal:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            id: 0,
            nombre: '',
            horarioApertura: '',
            horarioCierre: '',
            esCasaMatriz: false,
            latitud: 0,
            longitud: 0,
            domicilio: {
                calle: '',
                numero: 0,
                cp: 0,
                piso: 0,
                nroDpto: 0,
                localidad: {
                    nombre: '',
                    provincia: {
                        nombre: '',
                        pais: {
                            nombre: ''
                        }
                    }
                }
            },
            logo: '', // Asegúrate de mantener la misma estructura
            empresa:{id:0} // Reinicia idEmpresa si es necesario
        });
    };

    return (
        isOpen && (
            <BaseModal title={sucursal ? "Editar Sucursal" : "Crear Sucursal"} onClose={onClose} onSave={handleSubmit}>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                    <input type="time" name="horarioApertura" value={formData.horarioApertura} onChange={handleChange} required />
                    <input type="time" name="horarioCierre" value={formData.horarioCierre} onChange={handleChange} required />
                    <label>
                        <input type="checkbox" name="esCasaMatriz" checked={formData.esCasaMatriz} onChange={handleChange} />
                        Es Casa Matriz
                    </label>
                    <h3>Domicilio</h3>
                    <input type="text" name="domicilio.calle" value={formData.domicilio.calle} onChange={handleChange} placeholder="Calle" required />
                    <input type="number" name="domicilio.numero" value={formData.domicilio.numero} onChange={handleChange} placeholder="Número" required />
                    <input type="number" name="domicilio.cp" value={formData.domicilio.cp} onChange={handleChange} placeholder="Código Postal" required />
                    <input type="number" name="domicilio.piso" value={formData.domicilio.piso} onChange={handleChange} placeholder="Piso" />
                    <input type="number" name="domicilio.nroDpto" value={formData.domicilio.nroDpto} onChange={handleChange} placeholder="Número de Departamento" />
                    <input type="text" name="domicilio.localidad.nombre" value={formData.domicilio.localidad.nombre} onChange={handleChange} placeholder="Localidad" required />
                    <input type="text" name="domicilio.localidad.provincia.nombre" value={formData.domicilio.localidad.provincia.nombre} onChange={handleChange} placeholder="Provincia" required />
                    <input type="text" name="domicilio.localidad.provincia.pais.nombre" value={formData.domicilio.localidad.provincia.pais.nombre} onChange={handleChange} placeholder="País" required />
                    <input type="text" name="logo" value={formData.logo} onChange={handleChange} placeholder="Logo URL" />
                    <button type="submit">{sucursal ? "Guardar Cambios" : "Crear Sucursal"}</button>
                </form>
            </BaseModal>
        )
    );
};

export default ModalCreateSucursal;
