import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
import { IEmpresa2 } from "../../types/dtos/empresa/IEmpresa2";

import { IUpdateEmpresaDto } from "../../types/dtos/empresa/IUpdateEmpresaDto";

import { AbstractBackendClient } from "../AbstractBackendClient";

class EmpresaService extends AbstractBackendClient<IEmpresa2, ICreateEmpresaDto, IUpdateEmpresaDto> {
    constructor() {
        super("http://190.221.207.224:8090/empresas"); // URL de la API
    }

    // Método para crear una empresa
    public async create(empresaData: ICreateEmpresaDto): Promise<IEmpresa2> {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empresaData),
            });

            if (!response.ok) {
                throw new Error(`Error al crear la empresa: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IEmpresa2;
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            throw error;
        }
    }

    // Método para obtener todas las empresas
    public async getAll(): Promise<IEmpresa2[]> {
        try {
            const response = await fetch(this.baseUrl);

            if (!response.ok) {
                throw new Error(`Error al obtener empresas: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IEmpresa2[];
        } catch (error) {
            console.error("Error al obtener empresas:", error);
            throw error;
        }
    }

    // Método para obtener una empresa por ID
    public async getById(id: number): Promise<IEmpresa2 | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`);

            if (!response.ok) {
                throw new Error(`Error al obtener la empresa con ID ${id}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IEmpresa2;
        } catch (error) {
            console.error(`Error al obtener la empresa con ID ${id}:`, error);
            throw error;
        }
    }

    // Método para actualizar una empresa
    public async update(id: number, empresaData: IUpdateEmpresaDto): Promise<IEmpresa2> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empresaData),
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar la empresa con ID ${id}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IEmpresa2;
        } catch (error) {
            console.error(`Error al actualizar la empresa con ID ${id}:`, error);
            throw error;
        }
    }

    // Método para eliminar una empresa
    public async delete(id: number): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar la empresa con ID ${id}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error al eliminar la empresa con ID ${id}:`, error);
            throw error;
        }
    }
}

export default EmpresaService;

// import axios from "axios";
// import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
// import { IUpdateEmpresaDto } from "../../types/dtos/empresa/IUpdateEmpresaDto";
// import { IEmpresa } from "../../types/IEmpresa";
// import { AbstractBackendClient } from "../AbstractBackendClient";

// class EmpresaService extends AbstractBackendClient<IEmpresa, ICreateEmpresaDto, IUpdateEmpresaDto> {
   
   
   
//     constructor() {
//         super("http://190.221.207.224:8090/empresas"); // URL de la API
//     }

//     // Método para crear una empresa
//     public async create(empresaData: ICreateEmpresaDto): Promise<IEmpresa> {
//         try {
//             const response = await axios.post<IEmpresa>(this.baseUrl, empresaData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             return response.data;
//         } catch (error) {
//             console.error("Error al crear la empresa:", error);
//             throw error;
//         }
//     }

//     // Método para obtener todas las empresas
//     public async getAll(): Promise<IEmpresa[]> {
//         try {
//             const response = await axios.get<IEmpresa[]>(this.baseUrl);
//             return response.data;
//         } catch (error) {
//             console.error("Error al obtener empresas:", error);
//             throw error;
//         }
//     }

//     // Método para obtener una empresa por ID
//     public async getById(id: number): Promise<IEmpresa | null> {
//         try {
//             const response = await axios.get<IEmpresa>(`${this.baseUrl}/${id}`);
//             return response.data;
//         } catch (error) {
//             console.error(`Error al obtener la empresa con ID ${id}:`, error);
//             throw error;
//         }
//     }

//     // Método para actualizar una empresa
//     public async update(id: number, empresaData: IUpdateEmpresaDto): Promise<IEmpresa> {
//         try {
//             const response = await axios.put<IEmpresa>(`${this.baseUrl}/${id}`, empresaData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             return response.data;
//         } catch (error) {
//             console.error(`Error al actualizar la empresa con ID ${id}:`, error);
//             throw error;
//         }
//     }

//     // Método para eliminar una empresa
//     public async delete(id: number): Promise<void> {
//         try {
//             await axios.delete(`${this.baseUrl}/${id}`);
//         } catch (error) {
//             console.error(`Error al eliminar la empresa con ID ${id}:`, error);
//             throw error;
//         }
//     }
// }

// export default EmpresaService;
