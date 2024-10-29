import axios from "axios";
import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
import { IUpdateEmpresaDto } from "../../types/dtos/empresa/IUpdateEmpresaDto";
import { IEmpresa } from "../../types/IEmpresa";
import { AbstractBackendClient } from "../AbstractBackendClient";

class EmpresaService extends AbstractBackendClient<IEmpresa, ICreateEmpresaDto, IUpdateEmpresaDto> {
   
   
   
    constructor() {
        super("http://190.221.207.224:8090/empresas"); // URL de la API
    }

    // Método para crear una empresa
    public async create(empresaData: ICreateEmpresaDto): Promise<IEmpresa> {
        try {
            const response = await axios.post<IEmpresa>(this.baseUrl, empresaData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            throw error;
        }
    }

    // Método para obtener todas las empresas
    public async getAll(): Promise<IEmpresa[]> {
        try {
            const response = await axios.get<IEmpresa[]>(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error("Error al obtener empresas:", error);
            throw error;
        }
    }

    // Método para obtener una empresa por ID
    public async getById(id: number): Promise<IEmpresa | null> {
        try {
            const response = await axios.get<IEmpresa>(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener la empresa con ID ${id}:`, error);
            throw error;
        }
    }

    // Método para actualizar una empresa
    public async update(id: number, empresaData: IUpdateEmpresaDto): Promise<IEmpresa> {
        try {
            const response = await axios.put<IEmpresa>(`${this.baseUrl}/${id}`, empresaData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar la empresa con ID ${id}:`, error);
            throw error;
        }
    }

    // Método para eliminar una empresa
    public async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${this.baseUrl}/${id}`);
        } catch (error) {
            console.error(`Error al eliminar la empresa con ID ${id}:`, error);
            throw error;
        }
    }
}

export default EmpresaService;
