import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { CategoriasService } from "../../../../services/CategoriaService/CategoriaService";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { IUpdateCategoria } from "../../../../types/dtos/categorias/IUpdateCategoria";

interface SubCategoriaModalProps {
    isOpen: boolean;
    onClose: () => void;
    idCategoriaPadre: number | undefined;
    categoria:ICategorias
    onSave?:()=> Promise<void>
    idEmpresa:number | undefined
    handleModificarSubCategoria: (updatedCategoria: ICategorias) => void;
}


const ModalUpdateSubCategoria: React.FC<SubCategoriaModalProps> = ({ isOpen, onClose,idCategoriaPadre,categoria, idEmpresa,handleModificarSubCategoria}) => {
    const categoriaService=new CategoriasService("http://190.221.207.224:8090/categorias/update")
    
    const [formData, setFormData] = useState<IUpdateCategoria>({
        id:categoria.id || undefined,
        denominacion:categoria.denominacion || '' ,
        idEmpresa:idEmpresa ||categoria.sucursal?.empresa.id || 0,
        idCategoriaPadre:idCategoriaPadre|| null,
       
    });

    useEffect(() => {
        if (categoria) {
            setFormData({
                id: categoria.id || undefined,
                denominacion: categoria.denominacion || '',
                idEmpresa: idEmpresa || categoria.sucursal?.empresa.id || 0,
                idCategoriaPadre: idCategoriaPadre  || null, // Asegúrate de que el valor de idCategoriaPadre se asigna aquí
            });
        }
    }, [categoria, idCategoriaPadre, idEmpresa]);
    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Actualizar el estado de formData según el campo cambiado
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Confirmar que idCategoriaPadre no sea null antes de enviar
            if (!formData.idCategoriaPadre) {
                console.error("El idCategoriaPadre no está definido");
                return;
            }
            
            const updatedData=await categoriaService.put(formData.id, formData);
            if (updatedData) {
                const newCategoria: ICategorias = {
                    ...updatedData,
                    id: updatedData.id,
                    denominacion: updatedData.denominacion,
                    // Asegúrate de incluir otras propiedades necesarias en ICategorias
                };
            handleModificarSubCategoria(newCategoria)
            onClose(); // Cierra el modal
        }} catch (error) {
            console.error('Error al actualizar la subcategoría:', error);
        }
    };
    
    

    return (
        isOpen && (
            <BaseModal title={ "Modificar Categoria Hija"} onClose={onClose} onSave={handleSubmit} >
                <input className="modalCategoria__input" type="text" name="denominacion" value={formData.denominacion} onChange={handleChange} placeholder="denominacion" required />
               
                     
            </BaseModal>
        )
    );
};

export default ModalUpdateSubCategoria;
