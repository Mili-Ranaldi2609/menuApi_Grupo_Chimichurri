
interface TextInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange }) => (
    <div className="text-input">
        <label>{label}</label>
        <input type="text" value={value} onChange={onChange} />
    </div>
);

export default TextInput;
