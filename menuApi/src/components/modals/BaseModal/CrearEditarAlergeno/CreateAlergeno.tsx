import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../../../../types/dtos/alergenos/ICreateAlergeno";
import { AlergenoService } from "../../../../services/AlergenoService/AlergenoService";
import { IImagen } from "../../../../types/IImagen";

interface AlergenoModalProps {
    isOpen: boolean;
    onClose: () => void;
    alergeno: IAlergenos;
    idCategoria?:number | 0
    onSave?:()=> Promise<void>
}

const ModalCreateAlergeno: React.FC<AlergenoModalProps> = ({ isOpen, onClose,  alergeno}) => {
    const alergenoService=new AlergenoService("http://190.221.207.224:8090/alergenos")
    
    const [formData, setFormData] = useState<ICreateAlergeno>({
        denominacion: alergeno?.denominacion || '',
       imagen:{
        id:alergeno.imagen.id || 1,
        name:alergeno?.imagen.name,
        url:alergeno?.imagen.url || ''
       }
    });

    useEffect(() => {
        if (alergeno) {
            setFormData({
                denominacion: alergeno?.denominacion || '',
                imagen:{
                    name:alergeno?.imagen.name,
                    url:alergeno?.imagen.url || ''
                   }
            });
        }
        console.log("Datos actuales del formulario:", formData);
    }, [alergeno]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setFormData((prev) => {
            const updatedData = { ...prev }; // Copia el estado anterior
    
            // Manejo del cambio en el campo 'denominacion'
            if (name === "denominacion") {
                updatedData.denominacion = value; // Actualiza denominación
            } 
            // Manejo del cambio en los campos de 'imagen'
            else if (name.startsWith("imagen.")) {
                const imageKey = name.split(".")[1] as keyof IImagen; // Asegúrate de que sea un keyof IImagen
                updatedData.imagen = {
                    ...updatedData.imagen, // Mantiene el resto de la información de imagen
                    [imageKey]: value // Actualiza el campo correspondiente de imagen
                } as IImagen; // Asegúrate de que este objeto sea del tipo IImagen
            }
    
            return updatedData; // Retorna el nuevo estado
        });
    };
   
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            await alergenoService.post(formData)
                // Creación de una nueva sucursal
            onClose(); // Cierra el modal
            window.location.reload()
        } catch (error) {
            console.error('Error al guardar el alergeno:', error);
        }
    };

    return (
        isOpen && (
            <BaseModal title={ "Crear Alergeno"} onClose={onClose} onSave={handleSubmit} >
                <input className="modalAlergeno__input" type="text" name="denominacion" value={formData.denominacion} onChange={handleChange} placeholder="denominacion" required />
                
                <div>
                    <label>Nombre imagen y url: </label>
                    <input className="modalAlergeno__input" type="text" name="imagen.name" value={formData.imagen.name} onChange={handleChange} required placeholder="nombre img"/>
                     <input className="modalAlergeno__input" type="text" name="imagen.url" value={formData.imagen.url} onChange={handleChange} required placeholder="url img" />
                </div>
                     
            </BaseModal>
        )
    );
};

export default ModalCreateAlergeno;