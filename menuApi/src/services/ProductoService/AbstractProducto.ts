// Clase abstracta que define métodos para operaciones CRUD en un servicio genérico
export abstract class AbstractProducto<T, CreateDto = T, UpdateDto = T> {
    
    protected baseURL: string;
    
    constructor(baseURL: string) {
            this.baseURL = baseURL;
    }
    
    
    abstract getAll(): Promise<T[]>;
    abstract getById(id: number): Promise<T | null>;

    abstract post(data: CreateDto): Promise<T>;
    abstract put(id: number, data: UpdateDto): Promise<T>;

    // Método abstracto para eliminar un elemento por su ID
    abstract delete(id: number): Promise<void>;

    // Método auxiliar para manejar errores en las peticiones
    protected async handleRequest(request: Promise<Response>): Promise<any> {
        const response = await request;
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
    }
}