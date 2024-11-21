import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import styles from "./CrearEditarAlergeno.module.css";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { IUpdateAlergeno } from "../../../../types/dtos/alergenos/IUpdateAlergeno";
import { AlergenoService } from "../../../../services/AlergenoService/AlergenoService";

interface ProductoModalProps {
    isOpen: boolean;
    onClose: () => void;
    alergeno?: IAlergenos;
    sucursal?: ISucursal;
    onSave?: () => Promise<void>;
}

const ModalUpdateAlergeno: React.FC<ProductoModalProps> = ({ isOpen, onClose, alergeno: alergeno }) => {
    const alergenoService = new AlergenoService( `http://190.221.207.224:8090/alergenos` );

        
    const [formData, setFormData] = useState<IUpdateAlergeno>({
        id: alergeno?.id,
        denominacion: alergeno?.denominacion || '',
        imagen:{
            url: alergeno?.imagen.url || '',
            name: alergeno?.imagen.name
        }
        
    });

    useEffect(() => {
        if (alergeno) {
            setFormData({
                id: alergeno?.id,
                denominacion: alergeno?.denominacion || '',
                imagen:{
                    url: alergeno?.imagen.url || '',
                    name: alergeno?.imagen.name
                }
            });
        }
    }, [alergeno]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Asegúrate de que el archivo existe
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                imagen: {
                    ...prevData.imagen,
                    url: URL.createObjectURL(file), // Esto crea una URL para la vista previa
                    name: file.name,
                },
            }));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await alergenoService.put(formData.id, formData);
            onClose(); // Cierra el modal
            window.location.reload();
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    return (
        isOpen && (
            <BaseModal title={"Editar Alergeno"} onClose={onClose} onSave={handleSubmit}>
                <div className={styles.modalAlergeno__contenedor_inputs}>
                    <input
                        type="text"
                        name="denominacion"
                        value={formData.denominacion}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                    />
                    <div>
                        <label>Imagen nombre y url</label>
                        <input
                            type="text"
                            name="imagen.name"
                            value={formData.imagen.name}
                            onChange={handleImageChange}
                            placeholder="img name"                        
                            required
                        />
                        <input
                            type="text"
                            name="imagen.url"
                            value={formData.imagen.url}
                            onChange={handleImageChange}
                            placeholder="img url"
                            required
                        />
                    </div>
                </div>
            </BaseModal>
        )
    );
};

export default ModalUpdateAlergeno;