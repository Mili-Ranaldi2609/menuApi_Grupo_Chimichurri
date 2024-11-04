import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
import { IProductos } from "../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../types/dtos/productos/IUpdateProducto";
import { BackendClient } from "../BackendClient";

export class ProductoService extends BackendClient<ICreateProducto>{
    
    async getAll(): Promise<IProductos[]> {
        const response=await fetch(`${this.baseURL}`);
        const data= await response.json();
        return data as IProductos[];
    }

    async getById(id: number): Promise<IProductos | null> {
        const response=await fetch(`${this.baseURL}/${id}`);
        if(!response.ok){
            return null;
        }
        const data=await response.json();
        return data as IProductos;        
    }
    
    async post(data: ICreateProducto): Promise<ICreateProducto | null> {
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
        return newData as ICreateProducto;
    }
    
    async put(id: number | undefined, data: IUpdateProducto): Promise<IUpdateProducto> {
        const result=await fetch(`${this.baseURL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        });
        const newData=await result.json();
        return newData as IUpdateProducto;
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