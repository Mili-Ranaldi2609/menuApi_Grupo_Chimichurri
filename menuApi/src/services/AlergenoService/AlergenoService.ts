import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../../types/dtos/alergenos/IUpdateAlergeno";
import { IUpdateProducto } from "../../types/dtos/productos/IUpdateProducto";
import { BackendClient } from "../BackendClient";

export class AlergenoService extends BackendClient<ICreateAlergeno>{
    
    async getAll(): Promise<IAlergenos[]> {
        const response=await fetch(`${this.baseURL}`);
        const data= await response.json();
        return data as IAlergenos[];
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
    
    async put(id: number | undefined, data: IUpdateAlergeno): Promise<IUpdateProducto> {
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