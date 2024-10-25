//MODAL BASE PARA REUTILIZAR
import {ReactNode } from 'react' ;

interface BaseModalProps {
    title: string;
    children: ReactNode;
    onClose: () => void;
    onSave: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({ title, children, onClose, onSave }) => (
    <div className="modal">
        <div className="modal-content">
        <h2>{title}</h2>
        {children}
        <button onClick={onSave}>Guardar</button>
        <button onClick={onClose}>Cerrar</button>
        </div>
    </div>
);

export default BaseModal;