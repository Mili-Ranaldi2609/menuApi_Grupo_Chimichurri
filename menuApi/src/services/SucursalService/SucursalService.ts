import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "../BackendClient";


export class SucursalService extends BackendClient<ICreateSucursal>{
    
    async getAll(): Promise<ICreateSucursal[]> {
        const response=await fetch(`${this.baseURL}`);
        const data= await response.json();
        return data as ICreateSucursal[];
    }

    async getById(id: number): Promise<ICreateSucursal | null> {
        const response=await fetch(`${this.baseURL}/${id}`);
        if(!response.ok){
            return null;
        }
        const data=await response.json();
        return data as ICreateSucursal;        
    }
    async post(data: ICreateSucursal): Promise<ICreateSucursal | null> {
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
        return newData as ICreateSucursal;
    }
    async put(id: number | undefined, data: IUpdateSucursal): Promise<IUpdateSucursal> {
        const result=await fetch(`${this.baseURL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        });
        const newData=await result.json();
        return newData as IUpdateSucursal;
    }

};