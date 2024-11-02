
import { baseDto } from "../baseDto/baseDto";
import { ICategorias } from "../categorias/ICategorias";

export interface IUpdateSucursal extends baseDto {
  id:number | undefined
  nombre: string | undefined;
  idEmpresa: number | undefined;
  eliminado: boolean | undefined;
  latitud: number | undefined;
  longitud: number | undefined;
  domicilio: {
    id: number | undefined;
    calle: string | undefined;
    numero: number | undefined;
    cp: number | undefined;
    piso: number | undefined;
    nroDpto: number | undefined;
    idLocalidad: number | undefined;
  };
  logo: string | undefined;
  categorias?: ICategorias[];
  esCasaMatriz: boolean | undefined;
  horarioApertura: string |undefined;
  horarioCierre: string | undefined;
}
