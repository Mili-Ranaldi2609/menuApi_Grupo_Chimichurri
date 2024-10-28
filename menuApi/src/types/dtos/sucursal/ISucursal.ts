import { IDomicilio } from "../../IDomicilio";
import { IEmpresa } from "../../IEmpresa";
import { ICategorias } from "../categorias/ICategorias";



export interface ISucursal {
  id: number;
  nombre: string;
  empresa: IEmpresa;
  domicilio: IDomicilio;

  latitud: number;
  longitud: number;
  categorias?: ICategorias[];
  esCasaMatriz: boolean;
  horarioApertura: string;
  eliminado?: boolean;
  horarioCierre: string;
  logo?: string;
}
