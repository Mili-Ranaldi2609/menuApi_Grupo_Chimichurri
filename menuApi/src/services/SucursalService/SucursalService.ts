
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";
import { AbstractBackendClient } from "../AbstractBackendClient";

export class SucursalService extends AbstractBackendClient<ISucursal, ICreateSucursal, IUpdateSucursal> {
    constructor() {
        super("https://url-api/sucursales");
    }
    async getSucursalesPorEmpresa(idEmpresa: number): Promise<ISucursal[]> {
        const response = await fetch(`${this.baseUrl}?idEmpresa=${idEmpresa}`);
        if (!response.ok) {
            throw new Error('Error al obtener sucursales');
        }
        return response.json();
    }
    async getAll(): Promise<ISucursal[]> {
        return this.handleRequest(fetch(this.baseUrl));
    }

    async getById(id: number): Promise<ISucursal | null> {
        return this.handleRequest(fetch(`${this.baseUrl}/${id}`));
    }

    async create(data: ICreateSucursal): Promise<ISucursal> {
        return this.handleRequest(
            fetch(this.baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
        );
    }

    async update(id: number, data: IUpdateSucursal): Promise<ISucursal> {
        return this.handleRequest(
            fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
        );
    }

    async delete(id: number): Promise<void> {
        await this.handleRequest(fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' }));
    }
}
