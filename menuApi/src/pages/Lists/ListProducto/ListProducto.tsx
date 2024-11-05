import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { IProductos } from '../../../types/dtos/productos/IProductos';
import ModalUpdateProducto from '../../../components/modals/BaseModal/CrearEditarProducto/UpdateProducto';
import DetalleProducto from '../../../components/cards/CardProducto/DetalleProducto/DetalleProducto';
import { Table } from 'react-bootstrap';
import './ListProducto.css';

const ListProducto: React.FC = () => {
    const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
    const [productos, setProductos] = useState<IProductos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProducto, setSelectedProducto] = useState<IProductos | null>(null);

    useEffect(() => {
        const fetchProductos = async () => {
            if (!activeSucursal) {
                console.error("No hay sucursal activa");
                return;
            }

            try {
                const response = await fetch(`http://190.221.207.224:8090/articulos/porSucursal/${activeSucursal.id}`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener sucursales');
                }
                
                const data = await response.json();
                console.log("Datos recibidos de la API:", data);
                setProductos(data);
            } catch (err) {
                console.error("Error en la solicitud:", err);
                setError('Error al obtener los artículos de la sucursal');
            } finally {
                setLoading(false);
            }
        };
    
        fetchProductos();
    }, [activeSucursal]);
    
    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleShowDetails = (producto: IProductos) => {
        setSelectedProducto(producto);
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEdit = (producto: IProductos) => {
        setSelectedProducto(producto);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProducto(null);
        setIsModalOpen(false);
        setIsEditMode(false); // Añade esta línea para reiniciar el estado de edición
    };
    

    return (
        <div>
            <div className="productos-list">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Habilitado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.denominacion}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.categoria.denominacion}</td>
                                <td>{producto.precioVenta}</td>
                                <td >{producto.habilitado  ? "Sí" : "No"}</td>
                                <td className='card__botones'>
                                        <span onClick={() => handleShowDetails(producto)} className="boton material-symbols-outlined">visibility</span>
                                        <span onClick={() => handleEdit(producto)} className="boton material-symbols-outlined">edit</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            
                        {isModalOpen && selectedProducto && isEditMode && (
                <ModalUpdateProducto
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    producto={selectedProducto}
                />
            )}

            {isModalOpen && selectedProducto && !isEditMode && (
                <DetalleProducto
                    producto={selectedProducto}
                    onClose={handleCloseModal}
                />
            )}

        </div>
    );
};

export default ListProducto;
