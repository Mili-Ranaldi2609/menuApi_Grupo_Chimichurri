import { IImagen } from "../../IImagen";

export interface ICreateProducto {
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  habilitado: boolean;
  codigo: string;
  idCategoria: number | undefined;
  idAlergenos: number[] ;
  imagenes: IImagen[]
}
