import { IEmpresa } from "../../types/IEmpresa";
import { BackendClient } from "../BackendClient";


export class EmpresaService extends BackendClient<IEmpresa> {
    constructor() {
        super("https://url-api"); // URL de la API
    }
}
