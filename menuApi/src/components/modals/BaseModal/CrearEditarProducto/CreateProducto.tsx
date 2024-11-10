import React, { FormEvent, useEffect, useState } from "react";
import { ProductoService } from "../../../../services/ProductoService/ProductoService";

import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { useForm } from "../../../../hooks/useForm";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import BaseModal from "../BaseModal";
import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";

interface ProductoModalProps {
    isOpen: boolean;
    onClose: () => void;
    sucursal?: ISucursal;
    initialForm: ICreateProducto;
    onSave?: (newProducto: IProductos) => void;  // Propiedad para comunicar el producto creado
    handleCrearProducto: () => void;
}

const ModalCreateProducto: React.FC<ProductoModalProps> = ({ isOpen, onClose, sucursal, initialForm, handleCrearProducto, onSave }) => {
    const productoService = new ProductoService("http://190.221.207.224:8090/articulos/create");
    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
    const [showAlergenos, setShowAlergenos] = useState(false);
    const { onInputChange, formState, setFormState } = useForm<ICreateProducto>(initialForm);

    useEffect(() => {
        if (sucursal?.id) {
            fetch(`http://190.221.207.224:8090/categorias/allCategoriasPorSucursal/${sucursal.id}`)
                .then((response) => response.json())
                .then((data) => setCategorias(data))
                .catch((error) => console.error("Error fetching categorias:", error));

            fetch("http://190.221.207.224:8090/alergenos")
                .then((response) => response.json())
                .then((data) => setAlergenos(data))
                .catch((error) => console.error("Error fetching alergenos:", error));
        }
    }, [sucursal?.id]);

    const handleAlergenosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const alergenoId = parseInt(value);
        setFormState({
            ...formState,
            idAlergenos: checked
                ? [...formState.idAlergenos, alergenoId]
                : formState.idAlergenos.filter((id: number) => id !== alergenoId),
        });
    };

    const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormState({
            ...formState,
            idCategoria: parseInt(event.target.value),
        });
    };

    const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setFormState({
            ...formState,
            imagenes: [{ name: formState.denominacion, url }],
        });
    };

    const onSubmit = async (event: FormEvent<Element>) => {
        event.preventDefault();
        try {
            const newProducto = await productoService.post(formState); // Llamada al servicio

            if (newProducto) {
                onSave?.(newProducto);  // Llamamos a `onSave` si está definido
                handleCrearProducto();  // Llamada a la función para cualquier otra acción requerida
                onClose();   
                           // Cerramos el modal al finalizar
            }
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    };

    return (
        isOpen && (
            <BaseModal title="Crear Artículo" onClose={onClose} onSave={onSubmit}>
                <form onSubmit={onSubmit}>
                    <input
                        className="modalProducto__input"
                        type="text"
                        name="denominacion"
                        value={formState.denominacion}
                        onChange={onInputChange}
                        placeholder="Nombre"
                        required
                    />
                    <div>
                        <label>Precio</label>
                        <input
                            className="modalProducto__input"
                            type="number"
                            name="precioVenta"
                            value={formState.precioVenta}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <label>
                        <input
                            className="modalProducto__input"
                            type="checkbox"
                            name="habilitado"
                            checked={formState.habilitado}
                            onChange={onInputChange}
                        />
                        Habilitado
                    </label>
                    <input
                        className="modalProducto__input"
                        type="text"
                        name="codigo"
                        value={formState.codigo}
                        onChange={onInputChange}
                        placeholder="Código"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Ingrese una descripcion"
                        name="descripcion"
                        value={formState.descripcion}
                        onChange={onInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Ingrese una imagen"
                        onChange={handleImagenChange}
                        value={formState.imagenes[0]?.url || ""}
                    />

                    <div className="pAlergenosContainer">
                        <p className="pAlergenos">Seleccione los alergenos</p>
                        <span
                            className="material-symbols-outlined"
                            onClick={() => setShowAlergenos((prev) => !prev)}
                        >
                            arrow_drop_down
                        </span>
                    </div>

                    {showAlergenos && (
                        <div className="divAlergenos">
                            {alergenos.map((alergeno) => (
                                <div key={alergeno.id} className="divInputs">
                                    <input
                                        type="checkbox"
                                        value={alergeno.id}
                                        onChange={handleAlergenosChange}
                                        checked={formState.idAlergenos.includes(alergeno.id)}
                                    />
                                    <p>{alergeno.denominacion}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <select
                        name="categoria"
                        id="categoria"
                        onChange={handleCategoriaChange}
                        value={formState.idCategoria}
                    >
                        <option value="">Seleccione una categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.denominacion}
                            </option>
                        ))}
                    </select>
                  
                </form>
            </BaseModal>
        )
    );
};

export default ModalCreateProducto;