import { IDomicilio } from "../../IDomicilio";
import { ICategorias } from "../categorias/ICategorias";
import { IEmpresa2 } from "../empresa/IEmpresa2";



export interface ISucursal {
  id: number;
  nombre: string;
  empresa: IEmpresa2;
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
