import { IEmpresa2 } from '../../types/dtos/empresa/IEmpresa2';
import { ICreateSucursal } from '../../types/dtos/sucursal/ICreateSucursal';
import { ISucursal } from '../../types/dtos/sucursal/ISucursal';
import { IUpdateSucursal } from '../../types/dtos/sucursal/IUpdateSucursal';
import { IEmpresa } from '../../types/IEmpresa';

class SucursalService {
    private baseUrl: string = 'http://190.221.207.224:8090/sucursales';
    private sucursales: ISucursal[] = []; // Arreglo para almacenar sucursales
    private buildUrl(endpoint: string): string {
        return `${this.baseUrl}/${endpoint}`;
    }
    
    async createSucursalByEmpresa(sucursalData: ICreateSucursal, empresa: IEmpresa2): Promise<ISucursal | null> {
        try {
            // Validación de datos de entrada
            if (!sucursalData.nombre || !sucursalData.domicilio) {
                throw new Error('Faltan campos requeridos para crear la sucursal');
            }
    
            const dataToSend = {
                ...sucursalData,
                idEmpresa: empresa.id,
            };
    
            const response = await fetch(this.buildUrl('create'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (!response.ok) {
                const errorText = await response.text(); // Captura el cuerpo del error
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }
    
            const data: ISucursal = await response.json();
            this.sucursales.push(data);
            return data;
        } catch (error) {
            console.error('Error al crear la sucursal', error);
            return null;
        }
    }
    

    async getSucursalesByEmpresa(empresa: IEmpresa): Promise<ISucursal[]> {
        try {
            const response = await fetch(`${this.baseUrl}/empresa/${empresa.id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            this.sucursales = await response.json(); // Actualizar el arreglo local
            return this.sucursales;
        } catch (error) {
            console.error('Error al obtener las sucursales', error);
            return [];
        }
    }

    async getEmpresaBySucursal(idSucursal: number): Promise<IEmpresa | null> {
        try {
            const response = await fetch(`${this.baseUrl}/sucursal/${idSucursal}/empresa`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error al obtener la empresa asociada a la sucursal', error);
            return null;
        }
    }

    async updateSucursalById(idSucursal: number | undefined, sucursalData: Partial<IUpdateSucursal>): Promise<ISucursal | null> {
        try {
            const response = await fetch(`${this.baseUrl}/update/${idSucursal}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sucursalData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ISucursal = await response.json();

            // Actualiza la sucursal en el arreglo local si es necesario
            const index = this.sucursales.findIndex(sucursal => sucursal.id === idSucursal);
            if (index !== -1) {
                this.sucursales[index] = data; // Actualizar la sucursal editada
            }

            return data;
        } catch (error) {
            console.error('Error al editar la sucursal', error);
            return null;
        }
    }

    getSucursales(): ISucursal[] {
        return this.sucursales;
    }
}

export default SucursalService;
