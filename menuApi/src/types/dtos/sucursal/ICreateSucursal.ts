import { IDomicilio } from "../../IDomicilio";

export interface ICreateSucursal {
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  latitud: number;
  longitud: number;
  domicilio: IDomicilio;
  idEmpresa: number;
  logo: string | null;
}
