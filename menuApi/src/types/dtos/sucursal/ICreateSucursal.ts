import { IDomicilio } from "../../IDomicilio";
import { IEmpresa2 } from "../empresa/IEmpresa2";

export interface ICreateSucursal {
  id?:number
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  latitud: number;
  longitud: number;
  domicilio: IDomicilio;
  empresa:IEmpresa2
  logo: string | '';
}
