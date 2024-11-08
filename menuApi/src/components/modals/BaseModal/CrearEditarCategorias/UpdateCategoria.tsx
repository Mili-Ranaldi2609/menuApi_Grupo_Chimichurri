import React, { FormEvent } from "react";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { useForm } from "../../../../hooks/useForm";
import BaseModal from "../BaseModal";
import { IUpdateCategoria } from "../../../../types/dtos/categorias/IUpdateCategoria";
import { CategoriasService } from "../../../../services/CategoriaService/CategoriaService";
import { useDispatch } from "react-redux";
import { updateActiveCategoria } from "../../../../redux/slices/categoriaActivaSlice";

interface CategoriaModalProps {
    isOpen: boolean;
    onClose: () => void;
    sucursal?: ISucursal;
    initialForm: IUpdateCategoria;
    onSave?: (newCategoria: ICategorias) => void;
    handleModificarCategoria: (updatedCategoria: ICategorias) => void;
}

const ModalUpdateCategoria: React.FC<CategoriaModalProps> = ({
    isOpen,
    onClose,
    initialForm,
    handleModificarCategoria,
    onSave
}) => {
    const categoriaService = new CategoriasService("http://190.221.207.224:8090/categorias/update");
    const { onInputChange, formState } = useForm<IUpdateCategoria>(initialForm);
    const dispatch = useDispatch();

    const onSubmit = async (event: FormEvent<Element>) => {
        event.preventDefault();
        try {
            const updatedData = await categoriaService.put(initialForm.id, formState);
    
            if (updatedData) {
                const newCategoria: ICategorias = {
                    ...updatedData,
                    id: updatedData.id,
                    denominacion: updatedData.denominacion,
                    // Asegúrate de incluir otras propiedades necesarias en ICategorias
                };
    
                onSave && onSave(newCategoria);
                dispatch(updateActiveCategoria(newCategoria));
                handleModificarCategoria(newCategoria);
                onClose();
            }
        } catch (error) {
            console.error("Error al crear categoria:", error);
        }
    };

    return (
        isOpen && (
            <BaseModal title="Modificar Categoria" onClose={onClose} onSave={onSubmit}>
                <form onSubmit={onSubmit}>
                    <input
                        className="modalCategoria__input"
                        type="text"
                        name="denominacion"
                        value={formState.denominacion}
                        onChange={onInputChange}
                        placeholder="Nombre"
                        required
                    />
                </form>
            </BaseModal>
        )
    );
};

export default ModalUpdateCategoria;
