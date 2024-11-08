import { Table } from "react-bootstrap";
import ModalUpdateCategoria from "../../../components/modals/BaseModal/CrearEditarCategorias/UpdateCategoria";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";

const ListCategoria: React.FC = () => {
    const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<ICategorias | null>(null);
   
    useEffect(() => {
        const fetchCategorias = async () => {
            if (!activeSucursal) {
                console.error("No hay sucursal activa");
                return;
            }

            try {
                const response = await fetch(`http://190.221.207.224:8090/categorias/allCategoriasPorEmpresa/${activeSucursal.empresa.id}`);
                
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
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedCategoria(null);
        setIsModalOpen(false);
        setIsEditMode(false);
    };

    const handleModificarCategoria = (updatedCategoria: ICategorias) => {
        setCategorias((prevCategorias) => 
            prevCategorias.map((categoria) =>
                categoria.id === updatedCategoria.id ? updatedCategoria : categoria
            )
        );
    };
    const initialForm: IUpdateCategoria = selectedCategoria ? {
        id: selectedCategoria.id!,
        denominacion: selectedCategoria.denominacion,
        eliminado: selectedCategoria.eliminado,
        idEmpresa: activeSucursal?.empresa.id || 0,
        idSucursales: selectedCategoria.sucursales?.map(sucursal => sucursal.id) || [], // Convertir sucursales a idSucursales
        idCategoriaPadre: selectedCategoria.categoriaPadre?.id || null
    } : {
        id: 0,
        denominacion: '',
        eliminado: false, // Valor por defecto
        idEmpresa: 0,
        idSucursales: [],
        idCategoriaPadre: null
    };
    
    

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    {/* Encabezado de la tabla */}
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.id}>
                            <td>{categoria.denominacion}</td>
                            <td>
                                <span className="material-symbols-outlined">arrow_drop_down</span>
                                <span onClick={() => handleEdit(categoria)} className="material-symbols-outlined">edit</span>
                                <span className="material-symbols-outlined">add_circle</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {isModalOpen && selectedCategoria && isEditMode && (
                <ModalUpdateCategoria
                    isOpen={isModalOpen}
                    onClose={handleCloseModal} initialForm={initialForm} handleModificarCategoria={handleModificarCategoria}                />
            )}
        </div>
    );
};

export default ListCategoria;
