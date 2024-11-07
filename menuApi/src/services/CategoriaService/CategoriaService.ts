
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../../types/dtos/categorias/IUpdateCategoria";
import { BackendClient } from "../BackendClient";

export class CategoriaService extends BackendClient<ICreateCategoria>{
    
    async getAll(): Promise<ICategorias[]> {
        const response=await fetch(`${this.baseURL}`);
        const data= await response.json();
        return data as ICategorias[];
    }

    async getById(id: number): Promise<ICategorias | null> {
        const response=await fetch(`${this.baseURL}/${id}`);
        if(!response.ok){
            return null;
        }
        const data=await response.json();
        return data as ICategorias;        
    }
    
    async post(data: ICreateCategoria): Promise<ICreateCategoria | null> {
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
        return newData as ICreateCategoria;
    }
    
    async put(id: number | undefined, data: IUpdateCategoria): Promise<IUpdateCategoria> {
        const result=await fetch(`${this.baseURL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        });
        const newData=await result.json();
        return newData as IUpdateCategoria;
    }
    async delete(id: number): Promise<void> {
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar la categoria con ID ${id}`);
        }
    }
}