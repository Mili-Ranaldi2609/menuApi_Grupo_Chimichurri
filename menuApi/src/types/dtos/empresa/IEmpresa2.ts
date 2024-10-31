import { IPais } from "../../IPais";

import { ISucursal } from "../sucursal/ISucursal";
export interface IEmpresa2 {
  id: number;
  nombre?: string;
  razonSocial?: string;
  cuit?: number;
  logo?: string
  sucursales?: ISucursal[];
  pais?: IPais;
} 
