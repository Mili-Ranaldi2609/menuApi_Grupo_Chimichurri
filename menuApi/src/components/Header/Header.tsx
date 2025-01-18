
interface HeaderProps {
  nombreVista: string;
}

export const Header = ({nombreVista}: HeaderProps) => {
  return (
    <>
      <div className="header">
        <h1>{nombreVista}</h1>
      </div>
    </>
  );
};