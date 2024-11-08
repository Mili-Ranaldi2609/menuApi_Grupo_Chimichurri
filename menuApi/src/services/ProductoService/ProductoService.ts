import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
import { IProductos } from "../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../types/dtos/productos/IUpdateProducto";
import { AbstractProducto } from "./AbstractProducto";

export class ProductoService extends AbstractProducto<IProductos,ICreateProducto,IUpdateProducto>{
   
    constructor(baseUrl: string = "http://190.221.207.224:8090/articulos") {  // URL predeterminada
            super(baseUrl);
     }
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
    
    async post(data: ICreateProducto): Promise<IProductos | null> {
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
        return newData as IProductos;
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
        const response = await fetch(`${this.baseURL}/${id}`, {  // Cambiar a this.baseURL
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el elemento con ID ${id}`);
        }
    }
    
}