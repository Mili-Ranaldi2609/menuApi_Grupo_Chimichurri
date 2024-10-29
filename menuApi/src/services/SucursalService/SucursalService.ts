import axios from 'axios';
import { ICreateSucursal } from '../../types/dtos/sucursal/ICreateSucursal';
import { ISucursal } from '../../types/dtos/sucursal/ISucursal';
import { IEmpresa } from '../../types/IEmpresa';


class SucursalService {
    private baseUrl: string = 'http://190.221.207.224:8090/sucursales';
    private sucursales: ISucursal[] = []; // Arreglo para almacenar sucursales

    async createSucursalByEmpresa(sucursalData: ICreateSucursal, empresa: IEmpresa): Promise<ISucursal | null> {
        try {
            const dataToSend = {
                ...sucursalData,
                idEmpresa: empresa.id, // Usar el id de la empresa
            };

            const response = await axios.post<ISucursal>(`${this.baseUrl}/create`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            this.sucursales.push(response.data); // Agregar la nueva sucursal al arreglo
            return response.data;
        } catch (error) {
            console.error('Error al crear la sucursal', error);
            return null;
        }
    }

    async getSucursalesByEmpresa(idEmpresa: number): Promise<ISucursal[]> {
        try {
            const response = await axios.get<ISucursal[]>(`${this.baseUrl}/empresa/${idEmpresa}`);
            this.sucursales = response.data; // Actualizar el arreglo local
            return this.sucursales;
        } catch (error) {
            console.error('Error al obtener las sucursales', error);
            return [];
        }
    }

    async getEmpresaBySucursal(idSucursal: number): Promise<IEmpresa | null> {
        try {
            const response = await axios.get<IEmpresa>(`${this.baseUrl}/sucursal/${idSucursal}/empresa`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la empresa asociada a la sucursal', error);
            return null;
        }
    }

    async updateSucursalById(idSucursal: number, sucursalData: Partial<ICreateSucursal>): Promise<ISucursal | null> {
        try {
            const response = await axios.put<ISucursal>(`${this.baseUrl}/update/${idSucursal}`, sucursalData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Actualiza la sucursal en el arreglo local si es necesario
            const index = this.sucursales.findIndex(sucursal => sucursal.id === idSucursal);
            if (index !== -1) {
                this.sucursales[index] = response.data; // Actualizar la sucursal editada
            }

            return response.data;
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
