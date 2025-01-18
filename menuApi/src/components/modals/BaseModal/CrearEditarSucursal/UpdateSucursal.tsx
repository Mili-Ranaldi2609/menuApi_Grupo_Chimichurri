import React, { useEffect, useState } from "react";
import styles from "./CreateUpdateSucursal.module.css";
import { IEmpresa2 } from "../../../../types/dtos/empresa/IEmpresa2";
import BaseModal from "../BaseModal";
import { SucursalService } from "../../../../services/SucursalService/SucursalService";
import { IUpdateSucursal } from "../../../../types/dtos/sucursal/IUpdateSucursal";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";

interface SucursalModalProps {
    isOpen: boolean;
    onClose: () => void;
    sucursal?: ISucursal;
    empresa?: IEmpresa2;
    onSave?:()=> Promise<void>
}

const ModalUpdateSucursal: React.FC<SucursalModalProps> = ({ isOpen, onClose, sucursal }) => {
    const sucursalService=new SucursalService("http://190.221.207.224:8090/sucursales/update")

    const [formData, setFormData] = useState<IUpdateSucursal>({
       
       id:sucursal?.id,
        nombre: sucursal?.nombre,
        idEmpresa: sucursal?.empresa.id,
        eliminado: sucursal?.eliminado,
        latitud: sucursal?.latitud,
        longitud: sucursal?.longitud,
        domicilio: {
            id: sucursal?.domicilio.id,
            calle: sucursal?.domicilio.calle,
            numero: sucursal?.domicilio.numero,
            cp:  sucursal?.domicilio.cp,
            piso:  sucursal?.domicilio.piso,
            nroDpto:  sucursal?.domicilio.nroDpto,
            idLocalidad:  sucursal?.domicilio.localidad.id,
        },
        logo:sucursal?.logo,
        esCasaMatriz: sucursal?.esCasaMatriz,
        horarioApertura: sucursal?.horarioApertura,
        horarioCierre: sucursal?.horarioCierre,
    });

    useEffect(() => {
        if (sucursal) {
            setFormData({
                id:sucursal?.id ,
            nombre: sucursal?.nombre,
            idEmpresa: sucursal?.empresa.id,
            eliminado: sucursal?.eliminado,
            latitud: sucursal?.latitud,
            longitud: sucursal?.longitud,
            domicilio: {
                id: sucursal?.domicilio.id,
                calle: sucursal?.domicilio.calle,
                numero: sucursal?.domicilio.numero,
                cp:  sucursal?.domicilio.cp,
                piso:  sucursal?.domicilio.piso,
                nroDpto:  sucursal?.domicilio.nroDpto,
                idLocalidad:  sucursal?.domicilio.localidad.id,
                },
            logo:sucursal?.logo ||'',
            esCasaMatriz: sucursal?.esCasaMatriz,
            horarioApertura: sucursal?.horarioApertura,
            horarioCierre: sucursal?.horarioCierre,
                
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
    
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            await sucursalService.put(formData.id,formData)
                // Creación de una nueva sucursal
            onClose(); // Cierra el modal
            window.location.reload();
        } catch (error) {
            console.error('Error al guardar la sucursal:', error);
        }
    };

    return (
        isOpen && (
            <BaseModal title={ "Editar Sucursal"} onClose={onClose} onSave={handleSubmit}>
                <input className={styles.modalSucursal__input} type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                
                <div>
                    <label>Horario Apertura</label>
                    <input className="modalSucursal__input" type="time" name="horarioApertura" value={formData.horarioApertura} onChange={handleChange} required />
                </div>
                
                <div>
                    <label>Horario Cierre</label>
                    <input className={styles.modalSucursal__input} type="time" name="horarioCierre" value={formData.horarioCierre} onChange={handleChange} required />
                </div>
                
                <label>
                    <input className={styles.modalSucursal__input}type="checkbox" name="esCasaMatriz" checked={formData.esCasaMatriz} onChange={handleChange} />
                    Es Casa Matriz
                </label>
                
                <h3>Domicilio</h3>
                <input className={styles.modalSucursal__input} type="text" name="domicilio.calle" value={formData.domicilio.calle} onChange={handleChange} placeholder="Calle" required />
                
                <div>
                    <label>Numero Calle</label>
                    <input className={styles.modalSucursal__input} type="number" name="domicilio.numero" value={formData.domicilio.numero} onChange={handleChange} required />
                </div>
                
                <div>
                    <label>Codigo Postal</label>
                    <input className={styles.modalSucursal__input} type="number" name="domicilio.cp" value={formData.domicilio.cp} onChange={handleChange} required />
                </div>
                
                <div>
                    <label>Piso</label>
                    <input className={styles.modalSucursal__input} type="number" name="domicilio.piso" value={formData.domicilio.piso} onChange={handleChange} />
                </div>
                
                <div>
                    <label>Nro Departamento</label>
                    <input className={styles.modalSucursal__input} type="number" name="domicilio.nroDpto" value={formData.domicilio.nroDpto} onChange={handleChange} />
                </div>
                
                <input className={styles.modalSucursal__input} type="text" name="domicilio.idLocalidad" value={formData.domicilio.idLocalidad} onChange={handleChange} placeholder="Localidad" required />
               
                
                <input className={styles.modalSucursal__input} type="text" name="logo" value={formData.logo} onChange={handleChange} placeholder="Logo URL" />
            </BaseModal>
        )
    );
};

export default ModalUpdateSucursal;
