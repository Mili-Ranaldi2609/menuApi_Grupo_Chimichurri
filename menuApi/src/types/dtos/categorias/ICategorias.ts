import { IProductos } from "../productos/IProductos";
import { ISucursal } from "../sucursal/ISucursal";

export interface ICategorias {
  id: number | undefined;
  denominacion: string;
  eliminado: boolean;
  sucursal?: ISucursal | undefined;
  sucursales?:ISucursal[] ;
  subCategorias: ICategorias[];
  categoriaPadre?: ICategorias | undefined;
  articulos: IProductos | undefined;
}
