import { IDomicilio } from "../../IDomicilio";
import { IEmpresa } from "../../IEmpresa";

export interface ICreateSucursal {
  id?:number
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  latitud: number;
  longitud: number;
  domicilio: IDomicilio;
  empresa:IEmpresa
  logo: string | '';
}
