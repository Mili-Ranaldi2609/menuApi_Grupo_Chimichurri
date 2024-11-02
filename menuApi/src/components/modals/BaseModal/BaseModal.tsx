//MODAL BASE PARA REUTILIZAR
import {ReactNode } from 'react' ;
import './BaseModal.css'; 

interface BaseModalProps {
    title: string;
    children?: ReactNode;
    onClose: () => void;
    onSave?: (e: React.FormEvent) => Promise<void>;
    idEmpresa?:number | undefined
}

const BaseModal: React.FC<BaseModalProps> = ({ title, children, onClose, onSave }) => (
    <div className="modal_fondo">
        <div className="modal_contenedor">
            <h2 className='modal_titulo'>{title}</h2>
            {children}
            <div className="modal_botones_contenedor">
                <button onClick={onClose}>Cerrar</button>
                {<button onClick={onSave}>Guardar</button>}
            </div>
        </div>
    </div>
);

export default BaseModal;