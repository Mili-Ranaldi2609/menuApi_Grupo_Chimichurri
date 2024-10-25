
import TextInput from '../../../inputs/TextInput/TextInput';
import BaseModal from '../BaseModal';


interface CrearEditarEmpresaModalProps {
    onClose: () => void; //aca irian los handle pero hay q hacerlos
    onSave: () => void;
}

const CrearEditarEmpresaModal: React.FC<CrearEditarEmpresaModalProps> = ({ onClose, onSave }) => (
    <BaseModal title="Crear/EditarEmpresa" onClose={onClose} onSave={onSave}>
        <TextInput label="Nombre de la Empresa" value="" onChange={() => {}} />
        {/* Otros inputs que sean necesarios */}
    </BaseModal>
);

export default CrearEditarEmpresaModal;
