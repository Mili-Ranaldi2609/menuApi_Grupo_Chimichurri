import { Table } from "react-bootstrap";
import styles from "./ListCategoria.module.css";
import ModalUpdateCategoria from "../../../components/modals/BaseModal/CrearEditarCategorias/UpdateCategoria";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import ModalCreateSubCategoria from "../../../components/modals/BaseModal/CrearEditarCategorias/CreateSubcategoria";
import ModalUpdateSubCategoria from "../../../components/modals/BaseModal/CrearEditarCategorias/UpdateSubcategoria";
import { setActiveCategoria } from "../../../redux/slices/categoriaActivaSlice";

const ListCategoria: React.FC = () => {
    const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
    const activeCategoria = useSelector((state: RootState) => state.categoriaActiva.activeCategoria);

    const [isCreateSubCategoriaModalOpen, setIsCreateSubCategoriaModalOpen] = useState(false);
    const [selectedSubCategoria, setSelectedSubCategoria] = useState<ICategorias | null>(null);
    const [isUpdateSubCategoriaModalOpen, setIsUpdateSubCategoriaModalOpen] = useState(false);
    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<ICategorias | null>(null);
    const [isSubcategoriesVisible, setIsSubcategoriesVisible] = useState<{ [id: number]: boolean }>({});

    useEffect(() => {
        const fetchCategorias = async () => {
            if (!activeSucursal) {
                console.error("No hay sucursal activa");
                return;
            }

            try {
                const response = await fetch(`http://190.221.207.224:8090/categorias/allCategoriasPadrePorSucursal/${activeSucursal?.id}`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener sucursales');
                }
                
                const data = await response.json();
                console.log("Datos recibidos de la API:", data);
                setCategorias(data);
            } catch (err) {
                console.error("Error en la solicitud:", err);
                setError('Error al obtener las categorias de la sucursal');
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, [activeSucursal]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleEdit = (categoria: ICategorias) => {
        setSelectedCategoria(categoria);
        setIsEditMode(true);
        setIsModalOpen(true);  // Abre el modal de edición de categoría
    };
    const handleEditSubCategoria = (subCategoria: ICategorias) => {
        const idCategoriaPadre = subCategoria.categoriaPadre?.id || activeCategoria?.id;
        
        if (idCategoriaPadre) {
            setSelectedSubCategoria(subCategoria);
            setIsUpdateSubCategoriaModalOpen(true);
        } else {
            console.error("No se pudo determinar un idCategoriaPadre válido");
        }
    };
    
    
    
    const handleCloseModal = () => {
        setSelectedCategoria(null);
        setIsModalOpen(false); // Cierra el modal de editar categoría
        setIsEditMode(false);
        setIsCreateSubCategoriaModalOpen(false); 
        setIsUpdateSubCategoriaModalOpen(false);
    };
    const handleModificarSubCategoria = (updatedSubCategoria: ICategorias) => {
        setCategorias((prevCategorias) =>
            prevCategorias.map((categoria) => {
                if (categoria.id === updatedSubCategoria.categoriaPadre?.id) {
                    return {
                        ...categoria,
                        subCategorias: categoria.subCategorias?.map((subcategoria) =>
                            subcategoria.id === updatedSubCategoria.id ? updatedSubCategoria : subcategoria
                        ),
                    };
                }
                return categoria;
            })
        );
    };
    
    const handleModificarCategoria = (updatedCategoria: ICategorias) => {
        setCategorias((prevCategorias) => 
            prevCategorias.map((categoria) =>
                categoria.id === updatedCategoria.id ? updatedCategoria : categoria
            )
        );
    };
    const dispatch = useDispatch();

    const handleToggleSubcategories = (categoriaId: number, categoria: ICategorias) => {
        dispatch(setActiveCategoria(categoria)); // Establece la categoría activa
        setIsSubcategoriesVisible((prevVisibility) => ({
            ...prevVisibility,
            [categoriaId]: !prevVisibility[categoriaId]
        }));
    };


    const handleCreateSubCategoria = (categoria: ICategorias) => {
        setSelectedCategoria(categoria); // Guarda la categoría padre seleccionada
        setIsCreateSubCategoriaModalOpen(true); // Abre el modal de creación de subcategoría
    };

    const initialForm: IUpdateCategoria = selectedCategoria ? {
        id: selectedCategoria.id!,
        denominacion: selectedCategoria.denominacion,
        eliminado: selectedCategoria.eliminado,
        idEmpresa: activeSucursal?.empresa.id || 0,
        idSucursales: selectedCategoria.sucursales?.map(sucursal => sucursal.id) || [],
        idCategoriaPadre: selectedCategoria.categoriaPadre?.id || null
    } : {
        id: 0,
        denominacion: '',
        eliminado: false,
        idEmpresa: 0,
        idSucursales: [],
        idCategoriaPadre: null
    };

    return (
        <div>
            <Table striped bordered hover size="sm">
                <tbody className={styles.categorias_tabla_container}>
                    {categorias.map((categoria) => (
                        <React.Fragment key={categoria.id}>
                            <tr className={styles.categoria_container}>
                                <td className={styles.categoria_text}>{categoria.denominacion}</td>
                                <td className={styles.categoria_icons}>
                                    <span
                                        onClick={() => handleToggleSubcategories(categoria.id!, categoria)}
                                        className="material-symbols-outlined"
                                    >
                                        {isSubcategoriesVisible[categoria.id!] ? "arrow_drop_up" : "arrow_drop_down"}
                                    </span>

                                    <span onClick={() => handleEdit(categoria)} className="material-symbols-outlined">edit</span>
                                    <span
                                        className="material-symbols-outlined"
                                        onClick={() => handleCreateSubCategoria(categoria)}
                                    >
                                        add_circle
                                    </span>
                                </td>
                            </tr>

                            {/* Mostrar las subcategorías directamente desde `subCategorias` */}
                            {isSubcategoriesVisible[categoria.id!] && categoria.subCategorias?.length > 0 && (
                                categoria.subCategorias.map((subcategoria) => (
                                    <tr key={subcategoria.id} style={{ paddingLeft: "20px" }}>
                                        <td>{subcategoria.denominacion}</td>
                                        <td>-</td>
                                        <td><span onClick={() => handleEditSubCategoria(subcategoria)}className="material-symbols-outlined">ink_pen</span></td>
                                    </tr>
                                ))
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>

            {isModalOpen && selectedCategoria && isEditMode && (
                <ModalUpdateCategoria
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    initialForm={initialForm}
                    handleModificarCategoria={handleModificarCategoria}
                />
            )}

            {isCreateSubCategoriaModalOpen && selectedCategoria && (
                <ModalCreateSubCategoria
                    isOpen={isCreateSubCategoriaModalOpen}
                    onClose={handleCloseModal}  // Cierra el modal de subcategoría
                    idCategoriaPadre={selectedCategoria.id}
                    categoria={selectedCategoria}
                    idEmpresa={activeSucursal?.empresa.id}
                />
            )}
            {isUpdateSubCategoriaModalOpen && selectedSubCategoria && (
            <ModalUpdateSubCategoria
                isOpen={isUpdateSubCategoriaModalOpen}
                onClose={handleCloseModal}
                categoria={selectedSubCategoria}
                idCategoriaPadre={selectedSubCategoria?.categoriaPadre?.id || activeCategoria?.id} // Usar activeCategoria como respaldo
                idEmpresa={activeSucursal?.empresa.id}
                handleModificarSubCategoria={handleModificarSubCategoria}
            />
        )}



        </div>
    );
};

export default ListCategoria;
