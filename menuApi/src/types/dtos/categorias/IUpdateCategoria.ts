import { baseDto } from "../baseDto/baseDto";

export interface IUpdateCategoria extends baseDto {
  id: number | undefined;
  denominacion: string;
  eliminado?: boolean;
  idEmpresa: number;
  idSucursales?: number[] | undefined
  idCategoriaPadre?: number | null;
}
