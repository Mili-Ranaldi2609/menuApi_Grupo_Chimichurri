// Clase abstracta que define métodos para operaciones CRUD en un servicio genérico
export abstract class AbstractAlergeno<T, CreateDto = T, UpdateDto = T> {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    abstract getAll(): Promise<T[]>;
    abstract getById(id: number): Promise<T | null>;

    abstract create(data: CreateDto): Promise<T>;
    abstract update(id: number, data: UpdateDto): Promise<T>;

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