import React, { useEffect, useState } from 'react';
import { EmpresaService } from '../../services/EmpresaService/EmpresaService';
import { IEmpresa } from '../../types/IEmpresa';

const empresaService = new EmpresaService();

const EmpresasPage: React.FC = () => {
    const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

    useEffect(() => {
        //para obtener todas las empresas
        empresaService.getAll().then(setEmpresas).catch(console.error);
    }, []);

    return (
        <div>
        {empresas.map(empresa => (
            <div key={empresa.id}>
            <h3>{empresa.name}</h3>
            <p>{empresa.description}</p>
            </div>
        ))}
        </div>
    );
};

export default EmpresasPage;
