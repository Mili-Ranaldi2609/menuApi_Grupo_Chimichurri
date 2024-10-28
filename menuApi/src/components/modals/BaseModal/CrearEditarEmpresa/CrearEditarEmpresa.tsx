import React, { useState } from 'react';
import BaseModal from '../BaseModal';
import { ICreateEmpresaDto } from '../../../../types/dtos/empresa/ICreateEmpresaDto';
import { EmpresaService } from '../../../../services/EmpresaService/EmpresaService';


interface EmpresaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Callback para manejar el éxito
}

const EmpresaModal: React.FC<EmpresaModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [empresa, setEmpresa] = useState<ICreateEmpresaDto>({
        nombre: '',
       razonSocial:"",
        cuit:0,
        logo:"",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type } = e.target;
        const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : (e.target as HTMLInputElement).value;
    
        setEmpresa((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const empresaService = new EmpresaService();
            await empresaService.create(setEmpresa); // Pasa los datos de `empresa`
            onSuccess(); // Callback para refrescar la lista de empresas
            onClose(); // Cierra el modal
        } catch (error) {
            console.error("Error al guardar la empresa:", error);
        }
    };
    

    return (
        isOpen && (
            <BaseModal title="Crear una empresa" onClose={onClose} onSave={handleSubmit}>
                <div>
                  
                    <input
                        type="text"
                        name="nombre"
                        value={empresa.nombre}
                        onChange={handleChange}
                        placeholder="Nombre de la Empresa"
                    />
                      <input
                        type="text"
                        name="razon social"
                        value={empresa.razonSocial}
                        placeholder="razon social"
                    />
                    <input
                        type="number"
                        name="cuit"
                        value={empresa.cuit}
                        placeholder="cuit"
                    />
                    <input
                        type="text"
                        name="logo"
                        value={empresa.logo ??""}
                        placeholder="logo"
                    />
            
                    
                </div>
            </BaseModal>
        )
    );
};

export default EmpresaModal;