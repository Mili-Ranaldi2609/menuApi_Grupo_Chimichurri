//MODAL BASE PARA REUTILIZAR
import {ReactNode } from 'react' ;
import styles from './BaseModal.module.css'; 

interface BaseModalProps {
    title: string;
    children?: ReactNode;
    onClose: () => void;
    onSave?: (e: React.FormEvent) => Promise<void>;
    idEmpresa?:number | undefined
}

const BaseModal: React.FC<BaseModalProps> = ({ title, children, onClose, onSave }) => (
    <div className={styles.modal_fondo }>
        <div className={styles.modal_contenedor}>
            <h2 className={styles.modal_titulo}>{title}</h2>
            {children}
            <div className={styles.modal_botones_contenedor}>
                <button onClick={onClose}>Cerrar</button>
                {<button onClick={onSave}>Guardar</button>}
            </div>
        </div>
    </div>
);

export default BaseModal;