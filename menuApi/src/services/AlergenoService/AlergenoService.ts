import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../../types/dtos/alergenos/IUpdateAlergeno";

import { AbstractAlergeno } from "./AbstractAlergeno";

export class AlergenoService extends AbstractAlergeno<ICreateAlergeno>{
    create(data: ICreateAlergeno): Promise<ICreateAlergeno> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: ICreateAlergeno): Promise<ICreateAlergeno> {
        throw new Error("Method not implemented.");
    }
   
 
    constructor() {
        super("http://190.221.207.224:8090/alergenos"); // URL de la API
    }

    // Método para obtener todas las empresas
    public async getAll(): Promise<IAlergenos[]> {
        try {
            const response = await fetch(this.baseUrl);

            if (!response.ok) {
                throw new Error(`Error al obtener alergenos: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IAlergenos[];
        } catch (error) {
            
            console.error("Error al obtener alergenos:", error);
            throw error;
        }
    }
    
    async getById(id: number): Promise<IAlergenos | null> {
        const response=await fetch(`${this.baseURL}/${id}`);
        if(!response.ok){
            return null;
        }
        const data=await response.json();
        return data as IAlergenos;        
    }
    async post(data: ICreateAlergeno): Promise<ICreateAlergeno | null> {
        console.log(data)
        const result=await fetch(`${this.baseURL}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
        if (!result.ok) {
            console.error("Failed to post data:", result.statusText);
            return null;
        }
        const newData=await result.json();
        return newData as ICreateAlergeno;
    }
    async put(id: number | undefined, data: IUpdateAlergeno): Promise<IUpdateAlergeno> {
        const result=await fetch(`${this.baseURL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        });
        const newData=await result.json();
        return newData as IUpdateAlergeno;
    }
    
    async delete(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "POST",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el elemento con ID ${id}`);
        }
    }
}