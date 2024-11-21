import styles from "./CrearEditarProducto.module.css";
import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../../../types/dtos/productos/IUpdateProducto";
import { IImagen } from "../../../../types/IImagen";
import { ProductoService } from "../../../../services/ProductoService/ProductoService";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import Select from "react-select"; 
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
interface ProductoModalProps {
    isOpen: boolean;
    onClose: () => void;
    producto?: IProductos;
    sucursal?: ISucursal;
    onSave?: () => Promise<void>;
}

const ModalUpdateProducto: React.FC<ProductoModalProps> = ({ isOpen, onClose, producto , sucursal}) => {
    const productoService = new ProductoService("http://190.221.207.224:8090/articulos/update");
    const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
    const [categorias, setCategorias] = useState<ICategorias[]>([]);
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
    useEffect(() => {
        const fetchAlergenos = async () => {
            try {
                const response = await fetch("http://190.221.207.224:8090/alergenos");
                const data = await response.json();
                setAlergenos(data);
            } catch (error) {
                console.error("Error al obtener los alérgenos:", error);
            }
        };

        fetchAlergenos();
    }, []);
    // Obtener categorías basadas en la sucursal
    useEffect(() => {
        if (sucursal?.id) {
            const fetchCategorias = async () => {
                try {
                    const response = await fetch(`http://190.221.207.224:8090/categorias/allSubCategoriasPorSucursal/${sucursal.id}`);
                    const data = await response.json();
                    setCategorias(data);
                } catch (error) {
                    console.error("Error al obtener las categorías:", error);
                }
            };

            fetchCategorias();
        }
    }, [sucursal]);
    const handleChangeAlergenos = (
        selectedOptions: any
    ) => {
        const selectedAlergenos = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        setFormData((prevFormData) => ({
            ...prevFormData,
            idAlergenos: selectedAlergenos,
        }));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: fieldValue,
        }));
    };
    

    const handleCategoryChange = (selectedOption: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            idCategoria: selectedOption?.value || 1, // Por si no seleccionan nada
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await productoService.put(formData.id, formData);
            console.log(formData);
            window.location.reload()
            onClose(); // Cierra el modal
           
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };
    const alergenoOptions = alergenos.map((alergeno) => ({
        value: alergeno.id,
        label: alergeno.denominacion,
    }));

    const categoriaOptions = categorias.map((categoria) => ({
        value: categoria.id,
        label: categoria.denominacion,  // Suponiendo que 'nombre' es el campo que deseas mostrar
    }));

    return (
        isOpen && (
            <BaseModal title={"Editar Producto"} onClose={onClose} onSave={handleSubmit}>
                <div className={styles.modalProducto__contenedor_inputs}>
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
                    <Select
                        placeholder="Selecciona una categoría"
                        name="idCategoria"
                        options={categoriaOptions}
                        value={categoriaOptions.find(option => option.value === formData.idCategoria)}
                        onChange={handleCategoryChange}
                    />
                </div>
                <div>
                    <label>Alérgenos</label>
                    <Select
                        placeholder="No posee alergenos"
                        isMulti
                        name="idAlergenos"
                        options={alergenoOptions}
                        value={alergenoOptions.filter(option => formData.idAlergenos.includes(option.value))}
                        onChange={handleChangeAlergenos}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value.toString()}
                    />
                </div>
                </div>
            </BaseModal>
        )
    );
};

export default ModalUpdateProducto;