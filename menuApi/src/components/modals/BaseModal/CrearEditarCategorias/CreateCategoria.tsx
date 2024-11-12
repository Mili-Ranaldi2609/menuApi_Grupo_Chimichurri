import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../../../../types/dtos/categorias/ICreateCategoria";
import { CategoriasService } from "../../../../services/CategoriaService/CategoriaService";

interface CategoriaModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoria: ICategorias;
    idEmpresa?:number | 0
    onSave?:()=> Promise<void>
}

const ModalCreateCategoria: React.FC<CategoriaModalProps> = ({ isOpen, onClose,categoria, idEmpresa}) => {
    const categoriaService=new CategoriasService("http://190.221.207.224:8090/categorias/create")
    
    const [formData, setFormData] = useState<ICreateCategoria>({
        denominacion:categoria.denominacion || '' ,
        idEmpresa: idEmpresa || categoria.sucursal?.empresa.id || 0,
        idCategoriaPadre: categoria.categoriaPadre?.id || null,
       
    });

    useEffect(() => {
        if (categoria) {
            setFormData({
                denominacion:categoria.denominacion || '' ,
                idEmpresa: idEmpresa ||categoria.sucursal?.empresa.id || 0,
                idCategoriaPadre: categoria.categoriaPadre?.id || null,
            });
        }
        console.log("Datos actuales del formulario:", formData);
    }, [categoria]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Actualizar el estado de formData según el campo cambiado
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            await categoriaService.post(formData)
                // Creación de una nueva sucursal
            onClose(); // Cierra el modal
            window.location.reload()
        } catch (error) {
            console.error('Error al guardar la categoria:', error);
        }
    };

    return (
        isOpen && (
            <BaseModal title={ "Crear Categoria Padre"} onClose={onClose} onSave={handleSubmit} >
                <input className="modalCategoria__input" type="text" name="denominacion" value={formData.denominacion} onChange={handleChange} placeholder="denominacion" required />
               
                     
            </BaseModal>
        )
    );
};

export default ModalCreateCategoria;
