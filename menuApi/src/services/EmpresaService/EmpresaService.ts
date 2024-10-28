import { IEmpresa } from "../../types/IEmpresa";
import { BackendClient } from "../BackendClient";


export class EmpresaService extends BackendClient<IEmpresa> {
  
    constructor() {
        super("https://url-api"); // URL de la API
    } 
    create(data: IEmpresa): Promise<IEmpresa> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: IEmpresa): Promise<IEmpresa> {
        throw new Error("Method not implemented.");
    }
}
