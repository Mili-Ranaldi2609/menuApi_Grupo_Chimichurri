import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { IProductos } from '../../../types/dtos/productos/IProductos';
import CardProducto from '../../../components/cards/CardProducto/CardProducto';
import ModalUpdateProducto from '../../../components/modals/BaseModal/CrearEditarProducto/UpdateProducto';

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
                    console.error("Error al obtener los artículos:", response.statusText);
                    throw new Error('Error al obtener los artículos de la sucursal');
                }
                
                const data = await response.json();
                console.log("Datos recibidos de la API:", data); // Verifica aquí si los datos tienen la estructura esperada
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
        setIsEditMode(false); // Vista solo de detalles
        setIsModalOpen(true);
    };

    const handleEdit = (producto: IProductos) => {
        setSelectedProducto(producto);
        setIsEditMode(true); // Activar modo de edición
        setIsModalOpen(true); // Abre el modal en modo edición
    };

    const handleCloseModal = () => {
        setSelectedProducto(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="sucursales-list">
                {productos.map((producto) => (
                    <CardProducto
                        key={producto.id}
                        onView={handleShowDetails}
                        onEdit={handleEdit} 
                        producto={producto}                
                    />
                ))}
            </div>
            
            {isModalOpen && selectedProducto && (
                <ModalUpdateProducto
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    producto={isEditMode && selectedProducto ? selectedProducto : undefined}
                />
            )}

            {/*selectedProducto && !isEditMode && (
                <DetalleProducto
                    producto={selectedProducto}
                    onClose={handleCloseModal}
                />
            )*/}
        </div>
    );
};

export default ListProducto;
