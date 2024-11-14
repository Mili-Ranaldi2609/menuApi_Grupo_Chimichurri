import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../../../types/dtos/productos/IUpdateProducto";
import { IImagen } from "../../../../types/IImagen";
import { ProductoService } from "../../../../services/ProductoService/ProductoService";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";

interface ProductoModalProps {
    isOpen: boolean;
    onClose: () => void;
    producto?: IProductos;
    sucursal?: ISucursal;
    onSave?: () => Promise<void>;
}

const ModalUpdateProducto: React.FC<ProductoModalProps> = ({ isOpen, onClose, producto }) => {
    const productoService = new ProductoService("http://190.221.207.224:8090/articulos/update");

    const [formData, setFormData] = useState<IUpdateProducto>({
        id: producto?.id,
        denominacion: producto?.denominacion || '',
        precioVenta: producto?.precioVenta || 0,
        descripcion: producto?.descripcion || '',
        habilitado: producto?.habilitado || false,
        imagenes: producto?.imagenes || [{ name: '', url: '' }] as IImagen[],
        codigo: producto?.codigo || '',
        idCategoria: producto?.categoria.id || 1,
        idAlergenos: producto?.alergenos?.map((alergeno) => alergeno.id) || [],
    });

    useEffect(() => {
        if (producto) {
            setFormData({
                id: producto.id,
                denominacion: producto.denominacion || '',
                precioVenta: producto.precioVenta || 0,
                descripcion: producto.descripcion || '',
                habilitado: producto.habilitado || false,
                imagenes: producto.imagenes || [{ name: '', url: '' }] as IImagen[],
                codigo: producto.codigo || '',
                idCategoria: producto.categoria.id || 1,
                idAlergenos: producto.alergenos?.map((alergeno) => alergeno.id) || [],
            });
        }
    }, [producto]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (name === "idAlergenos") {
            const selectedAlergeno = Number(value); // Convertir a número
            setFormData((prevFormData) => ({
                ...prevFormData,
                idAlergenos: [selectedAlergeno], // Almacena el ID como un array
            }));
        } else if (type === "checkbox") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: e.target.checked,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await productoService.put(formData.id, formData);
            console.log(formData);
            
            onClose(); // Cierra el modal
           
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    return (
        isOpen && (
            <BaseModal title={"Editar Producto"} onClose={onClose} onSave={handleSubmit}>
                <input
                    type="text"
                    name="denominacion"
                    value={formData.denominacion}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />
                <div>
                    <label>Descripcion</label>
                    <input
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Codigo</label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <label>
                    <input
                        type="checkbox"
                        name="habilitado"
                        checked={formData.habilitado}
                        onChange={handleChange}
                    />
                    Habilitado
                </label>
                
                <div>
                   <label>
                    Imagen URL:
                    <input
                        type="text"
                        name="imagenes[0].url"
                        value={formData.imagenes[0]?.url || ""}
                        onChange={(e) => {
                            const updatedImages = [...formData.imagenes];
                            updatedImages[0] = { ...updatedImages[0], url: e.target.value };
                            setFormData((prev) => ({
                                ...prev,
                                imagenes: updatedImages,
                            }));
                        }}
                    />
                </label> 
                </div>
                <div>

                    <label>Categoria</label>
                    <input
                        type="number"
                        name="idCategoria"
                        value={formData.idCategoria}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Alergeno</label>
                    <input
                        type="number" // Input de tipo número
                        name="idAlergenos" // Nombre para el manejo del cambio
                        value={formData.idAlergenos[0] || ''} // Muestra el primer alérgeno como valor
                        onChange={handleChange} // Maneja el cambio
                    />
                </div>
            </BaseModal>
        )
    );
};

export default ModalUpdateProducto;