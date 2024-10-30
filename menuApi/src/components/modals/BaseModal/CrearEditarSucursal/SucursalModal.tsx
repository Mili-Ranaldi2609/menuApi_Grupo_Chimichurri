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
    sucursal: ISucursal; // Prop opcional para editar
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
        empresa:{id:sucursal?.empresa.id || 0} 
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
                empresa:sucursal.empresa
            });
        } else {
            resetForm();
        }
    }, [sucursal, isOpen]);
/*
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
*/
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
        const keys = name.split(".");
        let updatedData: any = { ...prev };

        // Recorre las claves para llegar al nivel correcto y actualiza el valor
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
    const handleSave = async () => {
        try {
            // Crear una instancia del servicio y llamar al método de creación
            const sucursalService = new SucursalService();
            const savedSucursal = await sucursalService.createSucursalByEmpresa(formData, empresa);
    
            // Verificar que savedSucursal no sea null
            if (savedSucursal) {
                onSuccess(savedSucursal); // actualiza la lista en el componente padre
            } else {
                console.error("Error: La sucursal no se ha guardado correctamente.");
            }
    
            // Cierra el modal solo si se guarda correctamente
            onClose();
        } catch (error) {
            console.error("Error al guardar la sucursal:", error);
        }
    };
    

    return (
        isOpen && (
            <BaseModal title={sucursal ? "Editar Sucursal" : "Crear Sucursal"} onClose={onClose} onSave={handleSave} >
                <form onSubmit={handleSubmit}>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                    <div>
                        <label >Horario Apertura</label><input type="time" name="horarioApertura" value={formData.horarioApertura} onChange={handleChange} required />
                    </div>
                    <div>
                        <label >Horario Cierre</label>
                        <input type="time" name="horarioCierre" value={formData.horarioCierre} onChange={handleChange} required />
                    </div>
                    
                    <label>
                        <input type="checkbox" name="esCasaMatriz" checked={formData.esCasaMatriz} onChange={handleChange} />
                        Es Casa Matriz
                    </label>
                    <h3>Domicilio</h3>
                    <input type="text" name="domicilio.calle" value={formData.domicilio.calle} onChange={handleChange} placeholder="Calle" required />
                    <div>
                        <label >Numero Calle</label>
                    <input type="number" name="domicilio.numero" value={formData.domicilio.numero} onChange={handleChange} placeholder="Número" required />
                    </div>
                    <div>
                        <label >Codigo Postal</label>
                        <input type="number" name="domicilio.cp" value={formData.domicilio.cp} onChange={handleChange} placeholder="Código Postal" required />
                    </div>
                    <div>
                        <label>Piso</label>
                        <input type="number" name="domicilio.piso" value={formData.domicilio.piso} onChange={handleChange} placeholder="Piso" />
                    </div>
                    <div>
                        <label>Nro Departamento</label>
                         <input type="number" name="domicilio.nroDpto" value={formData.domicilio.nroDpto} onChange={handleChange} placeholder="Número de Departamento" />
                    </div>
                    
                   
                    <input type="text" name="domicilio.localidad.nombre" value={formData.domicilio.localidad.nombre} onChange={handleChange} placeholder="Localidad" required />
                    <input type="text" name="domicilio.localidad.provincia.nombre" value={formData.domicilio.localidad.provincia.nombre} onChange={handleChange} placeholder="Provincia" required />
                    <input type="text" name="domicilio.localidad.provincia.pais.nombre" value={formData.domicilio.localidad.provincia.pais.nombre} onChange={handleChange} placeholder="País" required />
                    <input type="text" name="logo" value={formData.logo} onChange={handleChange} placeholder="Logo URL" />
                    
                </form>
            </BaseModal>
        )
    );
};

export default ModalCreateSucursal;
