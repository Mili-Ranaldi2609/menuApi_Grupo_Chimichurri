
import React, { useEffect, useState } from 'react';
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';
import { AlergenoService } from '../../../services/AlergenoService/AlergenoService';
import CardAlergeno from '../../../components/cards/CardAlergeno/CardAlergeno';


const AlergenoList: React.FC = () => {
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlergeno, setSelectedAlergeno] = useState<IAlergenos | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchAlergenos = async () => {
    const alergenoService = new AlergenoService();
    try {
        const fetchedAlergenos = await alergenoService.getAll();
        const alergenosFormatted = fetchedAlergenos.map((alergeno) => ({
          ...alergeno,
          denominacion: alergeno.denominacion,
          imagen:{
            name:alergeno?.imagen.name,
            url:alergeno?.imagen.url || ''
           },
           id: alergeno.id,
        }));
        setAlergenos(alergenosFormatted);
        
    } catch (error) {
      console.error("Error al obtener los alergenos:", error);
      setAlergenos([]);
    }
  };

  useEffect(() => {
    fetchAlergenos();
  }, []);

  const handleShowDetails = (alergeno: IAlergenos) => {
    setSelectedAlergeno(alergeno);
    setIsEditMode(false); // Vista solo de detalles
    setIsModalOpen(false);
  };

  const handleEdit = (alergeno: IAlergenos) => {
    setSelectedAlergeno(alergeno);
    setIsEditMode(true); // Activar modo de edición
    setIsModalOpen(true); // Abre el modal en modo edición
  };

  const handleCloseModal = () => {
    setSelectedAlergeno(null);
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    fetchAlergenos();
    handleCloseModal();
  };

  return (
    <div >

      
      <div >
        {alergenos.map((alergeno) => (
          <CardAlergeno 
                key={alergeno.id}
                onView={handleShowDetails}
                onEdit={handleEdit} alergeno={alergeno}          />
        ))}
      </div>
      
      {/*isModalOpen && (
        <EmpresaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          empresa={isEditMode && selectedAlergeno ? selectedAlergeno : undefined} // Si es edición y hay empresa seleccionada, pasa la empresa; si no, undefined para crear
        />
      )}
      
      {selectedAlergeno && !isEditMode && (
        <DetalleEmpresa
          empresa={selectedAlergeno}
          onClose={handleCloseModal}
        />
      )*/}
    </div>
  );
};

export default AlergenoList;
