//targetas reutilizables

interface InfoCardProps {
    title: string;
    description: string;
    onEdit: () => void;
    onView: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, onEdit, onView }) => (
    <div className="entity-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={onEdit}>Editar</button>
        <button onClick={onView}>Ver</button>
    </div>
);

export default InfoCard;
