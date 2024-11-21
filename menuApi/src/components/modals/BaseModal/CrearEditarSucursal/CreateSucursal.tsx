import React, { useEffect, useState } from "react";
import styles from "./CreateUpdateSucursal.module.css";
import { ICreateSucursal } from "../../../../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";

import BaseModal from "../BaseModal";
import { SucursalService } from "../../../../services/SucursalService/SucursalService";

interface SucursalModalProps {
    isOpen: boolean;
    onClose: () => void;
    sucursal?: ISucursal;
    idEmpresa: number | 0;
    onSave?:()=> Promise<void>
}

const ModalCreateSucursal: React.FC<SucursalModalProps> = ({ isOpen, onClose, sucursal, idEmpresa}) => {
    const sucursalService=new SucursalService("http://190.221.207.224:8090/sucursales/create")

    const [formData, setFormData] = useState<ICreateSucursal>({
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
            idLocalidad:sucursal?.domicilio.localidad.id || 1
        },
        logo: sucursal?.logo || '',
        idEmpresa:sucursal?.empresa.id || 0
    });

    useEffect(() => {
        if (sucursal) {
            setFormData({
                nombre: sucursal.nombre,
                horarioApertura: sucursal.horarioApertura,
                horarioCierre: sucursal.horarioCierre,
                esCasaMatriz: sucursal.esCasaMatriz,
                latitud: sucursal.latitud,
                longitud: sucursal.longitud,
                domicilio:{
                    calle:sucursal.domicilio.calle,
                    numero:sucursal.domicilio.numero,
                    cp:sucursal.domicilio.cp,
                    piso:sucursal.domicilio.piso,
                    nroDpto:sucursal.domicilio.nroDpto,
                    idLocalidad:sucursal.domicilio.localidad.id   
                },
                logo: sucursal.logo || '',
                idEmpresa:sucursal.empresa.id
            });
        }
        console.log("Datos actuales del formulario:", formData);
    }, [sucursal]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        formData.idEmpresa=idEmpresa
        setFormData((prev) => {
            const keys = name.split(".");
            let updatedData: any = { ...prev };

            keys.reduce((acc, key, index) => {
                if (index === keys.length - 1) {
                    if (key === "idLocalidad") {
                        acc[key] = Number(value);
                    } else {
                        acc[key] = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
                    }
                } else {
                    acc[key] = { ...acc[key] };
                }
                return acc[key];
            }, updatedData);

            return updatedData;
        });
    };
   
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            await sucursalService.post(formData)
                // Creación de una nueva sucursal
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Error al guardar la sucursal:', error);
        }
    };

    return (
        isOpen && (
            <div className={styles.modalSucursal}>
            <BaseModal title={ "Crear Sucursal"} onClose={onClose} onSave={handleSubmit} idEmpresa={idEmpresa}>
                <input className={styles.modalSucursal__input} type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                
                <div className={styles.sucursal_conteiner_input}>
                    <label>Horario Apertura </label>
                    <input className={styles.modalSucursal__input} type="time" name="horarioApertura" value={formData.horarioApertura} onChange={handleChange} required />
                </div>
                
                <div>
                    <label>Horario Cierre </label>
                    <input className={styles.modalSucursal__input} type="time" name="horarioCierre" value={formData.horarioCierre} onChange={handleChange} required />
                </div>
                
                <label>
                    <input className={styles.modalSucursal__input} type="checkbox" name="esCasaMatriz" checked={formData.esCasaMatriz} onChange={handleChange} />
                    Es Casa Matriz
                </label>
                
                <h3>Domicilio</h3>
                <input className={styles.modalSucursal__input} type="text" name="domicilio.calle" value={formData.domicilio.calle} onChange={handleChange} placeholder="Calle" required />
                
                <div>
                    <label>Num Calle </label>
                    <input className={styles.modalSucursal__input} type="number" name="domicilio.numero" value={formData.domicilio.numero} onChange={handleChange} required />
                </div>
                
                <div className={styles.sucursal_conteiner_input}>
                    <label>Codigo Postal</label>
                    <input className={styles.modalSucursal__input} type="number" name="domicilio.cp" value={formData.domicilio.cp} onChange={handleChange} required />
                </div>
                
                <div>
                    <label>Piso </label>
                    <input className={styles.modalSucursal__input} type="number" name="domicilio.piso" value={formData.domicilio.piso} onChange={handleChange} />
                </div>
                
                <div>
                    <label>Nro Depto </label>
                    <input className={styles.modalSucursal__input} type="number" name="domicilio.nroDpto" value={formData.domicilio.nroDpto} onChange={handleChange} />
                </div>
                <div>
                    <label>Localidad id </label>
                    <input className={styles.modalSucursal__input} type="number" name="domicilio.idLocalidad" value={formData.domicilio.idLocalidad} onChange={handleChange} required />    
                </div>
                <div>
                    <label>Empresa id </label>
                    <input className={styles.modalSucursal__input} type="number" name="idEmpresa" value={idEmpresa} onChange={handleChange} required />    
                </div>

                
                <input className={styles.modalSucursal__input} type="text" name="logo" value={formData.logo} onChange={handleChange} placeholder="Logo URL" />
            </BaseModal>
            </div>
        )
    );
};

export default ModalCreateSucursal;
