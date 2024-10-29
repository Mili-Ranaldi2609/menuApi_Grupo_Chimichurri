import React, { useEffect, useState } from 'react';
import EmpresaService from '../../../services/EmpresaService/EmpresaService';
import CardEmpresa from '../../../components/cards/CardEmpresa/CardEmpresa';
import EmpresaModal from '../../../components/modals/BaseModal/CrearEditarEmpresa/CrearEditarEmpresa';
import DetalleEmpresa from '../../../components/cards/CardEmpresa/DetalleEmpresa/DetalleEmpresa';
import { IEmpresa2 } from '../../../types/dtos/empresa/IEmpresa2';


const EmpresaList: React.FC = () => {
  const [empresas, setEmpresas] = useState<IEmpresa2[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<IEmpresa2 | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchEmpresas = async () => {
    const empresaService = new EmpresaService();
    try {
        const fetchedEmpresas = await empresaService.getAll();
        const empresasFormatted = fetchedEmpresas.map((empresa) => ({
          ...empresa,
          nombre: empresa.nombre || "", // Ajusta este valor según sea necesario
          razonSocial: empresa.razonSocial || "",
          cuitts: empresa.cuit || ""
        }));
        setEmpresas(empresasFormatted);
        
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
      setEmpresas([]);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handleShowDetails = (empresa: IEmpresa2) => {
    setSelectedEmpresa(empresa);
    setIsEditMode(false); // Vista solo de detalles
    setIsModalOpen(false);
  };

  const handleEdit = (empresa: IEmpresa2) => {
    setSelectedEmpresa(empresa);
    setIsEditMode(true); // Activar modo de edición
    setIsModalOpen(true); // Abre el modal en modo edición
  };

  const handleCloseModal = () => {
    setSelectedEmpresa(null);
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    fetchEmpresas();
    handleCloseModal();
  };

  return (
    <div>
      <button onClick={() => {
        setSelectedEmpresa(null); // Limpia la empresa seleccionada al crear una nueva
        setIsEditMode(false); // Modo de creación
        setIsModalOpen(true);
      }}>
        Crear Empresa
      </button>
      
      {empresas.map((empresa) => (
        <CardEmpresa 
          key={empresa.id}
          empresa={empresa}
          onView={handleShowDetails}
          onEdit={handleEdit} 
        />
      ))}
      
      {isModalOpen && (
        <EmpresaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          empresa={isEditMode && selectedEmpresa ? selectedEmpresa : undefined} // Si es edición y hay empresa seleccionada, pasa la empresa; si no, undefined para crear
        />
      )}
      
      {selectedEmpresa && !isEditMode && (
        <DetalleEmpresa
          empresa={selectedEmpresa}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EmpresaList;
