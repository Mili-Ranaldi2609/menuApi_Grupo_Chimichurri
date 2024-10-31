import React, { useState, useEffect } from 'react';
import BaseModal from '../BaseModal';
import EmpresaService from '../../../../services/EmpresaService/EmpresaService';
import { IUpdateEmpresaDto } from '../../../../types/dtos/empresa/IUpdateEmpresaDto';
import { IEmpresa2 } from '../../../../types/dtos/empresa/IEmpresa2';

interface EmpresaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    empresa?: IEmpresa2; // Prop opcional para editar
}

const EmpresaModal: React.FC<EmpresaModalProps> = ({ isOpen, onClose, onSuccess, empresa }) => {
    const [formData, setFormData] = useState<IUpdateEmpresaDto>({
        id: empresa?.id || 0, // `id` viene de `baseDto`
        nombre: empresa?.nombre || '',
        razonSocial: empresa?.razonSocial || '',
        cuit: empresa?.cuit || 0,
        logo: empresa?.logo || null,
    });
                                                                                                                        
    useEffect(() => {
        if (empresa) {
            setFormData({
                id: empresa.id,
                nombre: empresa.nombre || '',
                razonSocial: empresa.razonSocial || '' ,
                cuit: empresa.cuit || 0,
                logo: empresa.logo || null,
            });
        }
    }, [empresa]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === "cuit" ? parseInt(value) : value }));
    };

    const handleSubmit = async () => {
        const empresaService = new EmpresaService();
        try {
            if (empresa) {
                await empresaService.update(empresa.id, formData); // Usa `formData` que ahora cumple con `IUpdateEmpresaDto`
            } else {
                await empresaService.create(formData);
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error al guardar la empresa:", error);
        }
    };

    return (
        isOpen && (
            <BaseModal title={empresa ? "Editar Empresa" : "Crear Empresa"} onClose={onClose} onSave={handleSubmit}>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre de la Empresa" />
                <input type="text" name="razonSocial" value={formData.razonSocial} onChange={handleChange} placeholder="Razón Social" />
                <input type="number" name="cuit" value={formData.cuit} onChange={handleChange} placeholder="CUIT" />
                <input type="text" name="logo" value={formData.logo ?? ''} onChange={handleChange} placeholder="Logo URL" />
            </BaseModal>
        )
    );
};

export default EmpresaModal;
