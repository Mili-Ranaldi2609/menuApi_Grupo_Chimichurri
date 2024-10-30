import { baseDto } from "../baseDto/baseDto";

export interface IUpdateEmpresaDto extends baseDto {
  nombre: string;
  razonSocial: string ;
  cuit: number | 0;
  logo: string | null;
}
