
import { Table } from 'react-bootstrap';
import { IProductos } from '../../../types/dtos/productos/IProductos';
interface CardProductosProps {
  producto: IProductos;
  onView: (producto: IProductos) => void;
  onEdit: (producto: IProductos) => void;

}

const CardProducto: React.FC<CardProductosProps> = ({ producto, onView, onEdit }) => {
  
  return (

    <div className='card-producto'>
  
  <Table striped bordered hover>
      <tbody className='body_productos'>
        <tr>
          <td>{producto.denominacion}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.habilitado ? "Sí" : "No"}</td>
          <td>{producto.precioVenta}</td>
          <td>{producto.categoria.denominacion}</td>
          <td>
       
        <div className="cardSucursal__botones">
        {<span onClick={() => onView(producto)} className="boton material-symbols-outlined">visibility</span>}
        {<span onClick={() => onEdit(producto)} className="boton material-symbols-outlined">edit</span>}
        </div>
          </td>
        </tr>
      </tbody>
    </Table>
     
    </div>
  );
};
export default CardProducto;
