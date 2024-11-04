import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { ProductoService } from "../../../../services/ProductoService/ProductoService";
import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";
import { IImagen } from "../../../../types/IImagen";

interface ProductoModalProps {
    isOpen: boolean;
    onClose: () => void;
    producto?: IProductos;
    idCategoria?: number | 0;
    onSave?: () => Promise<void>;
}

const ModalCreateProducto: React.FC<ProductoModalProps> = ({ isOpen, onClose, producto }) => {
    const productoService = new ProductoService("http://190.221.207.224:8090/articulos/create");

    const [formData, setFormData] = useState<ICreateProducto>({
        denominacion: producto?.denominacion || '',
        precioVenta: producto?.precioVenta || 0,
        descripcion: producto?.descripcion || '',
        habilitado: producto?.habilitado || false,
        idCategoria: producto?.categoria?.id || undefined,
        codigo: producto?.codigo || '',
        idAlergenos: producto?.alergenos?.map((alergeno) => alergeno.id) || [],
        imagenes: producto?.imagenes || [{ name: '', url: '' }] as IImagen[], // 
    });

    useEffect(() => {
        if (producto) {
            setFormData({
                denominacion: producto?.denominacion || '',
                precioVenta: producto?.precioVenta || 0,
                descripcion: producto?.descripcion || '',
                habilitado: producto?.habilitado || false,
                idCategoria: producto?.categoria?.id || undefined,
                codigo: producto?.codigo || '',
                idAlergenos: producto?.alergenos?.map((alergeno) => alergeno.id) || [],
                imagenes: producto?.imagenes.length ? producto.imagenes : [{ name: 'nombre_por_defecto', url: '' }],
            });
        }
    }, [producto]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
    
        setFormData((prev) => {
            const keys = name.split(".");
            let updatedData: any = { ...prev };
    
            keys.reduce((acc, key, index) => {
                if (index === keys.length - 1) {
                    if (key.startsWith("idAlergenos")) {
                        const alergenIndex = Number(key.split(".")[1]);
                        if (!updatedData.idAlergenos[alergenIndex]) {
                            updatedData.idAlergenos[alergenIndex] = 0; // Inicializa si no existe
                        }
                        acc[keys[0]][alergenIndex] = Number(value); // Asegúrate de convertir a número
                    } else if (key === "habilitado") {
                        acc[key] = e.target.checked;
                    } else if (key.startsWith("imagenes")) {
                        const imageIndex = Number(key.split(".")[1]);
                        if (!updatedData.imagenes[imageIndex]) {
                            updatedData.imagenes[imageIndex] = { name: '', url: '' };
                        }
                        acc[keys[0]][imageIndex].url = value;
                    } else {
                        acc[key] = type === 'number' ? Number(value) : value;
                    }
                } else {
                    acc[key] = { ...acc[key] };
                }
                return acc[key];
            }, updatedData);
    
            return updatedData;
        });
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await productoService.post(formData);
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    return (
        isOpen && (
            <BaseModal title={"Crear Artículo"} onClose={onClose} onSave={handleSubmit}>
                <input
                    className="modalProducto__input"
                    type="text"
                    name="denominacion"
                    value={formData.denominacion}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />

                <div>
                    <label>Descripción</label>
                    <input
                        className="modalProducto__input"
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Precio</label>
                    <input
                        className="modalProducto__input"
                        type="number"
                        name="precioVenta"
                        value={formData.precioVenta}
                        onChange={handleChange}
                        required
                    />
                </div>

                <label>
                    <input
                        className="modalProducto__input"
                        type="checkbox"
                        name="habilitado"
                        checked={formData.habilitado}
                        onChange={handleChange}
                    />
                    Habilitado
                </label>

                <input
                    className="modalProducto__input"
                    type="text"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    placeholder="Código"
                    required
                />

                <div>
                    <label>Nombre Imagen y URL</label>
                    <input
                        className="modalProducto__input"
                        type="text"
                        name="imagenes.[0].name"
                        value={formData.imagenes[0]?.name || ''}
                        onChange={handleChange}
                        placeholder="Nombre de la Imagen"
                        required
                    />
                    <input
                        className="modalProducto__input"
                        type="text"
                        name="imagenes.0.url"
                        value={formData.imagenes[0]?.url || ''}
                        onChange={handleChange}
                        placeholder="URL de la Imagen"
                        required
                    />
                </div>

                <div>
                    <label>ID Alérgeno</label>
                    <input
                        className="modalProducto__input"
                        type="number"
                        name="idAlergenos.0"
                        value={formData.idAlergenos[0] || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>ID Categoría</label>
                    <input
                        className="modalProducto__input"
                        type="number"
                        name="idCategoria"
                        value={formData.idCategoria || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
            </BaseModal>
        )
    );
};

export default ModalCreateProducto;
