import { useEffect, useState } from "react";
import ProductoPage from "../ProductosPage/ProductosPage";
import { AlergenoPage } from "../AlergenoPage/AlergenoPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { setActiveSucursal } from "../../redux/slices/sucursalActivaSlice";

export const MenuPage = () => {
  const [activePage, setActivePage] = useState<"productos" | "alergenos" | null>(null);

  const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
  console.log("Sucursal activa en MenuPage:", activeSucursal);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedSucursal = localStorage.getItem("activeSucursal");
    if (savedSucursal && !activeSucursal) {
      dispatch(setActiveSucursal(JSON.parse(savedSucursal)));
    }
  }, [dispatch, activeSucursal]);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", padding: "20px", borderRight: "1px solid #ccc" }}>
        {/* Mostrar el nombre principal solo si no hay una página activa */}
        {!activePage && (
          <div className="menu__header-contenedor">
            {activeSucursal ? (
              <h2>{activeSucursal.nombre}</h2>
            ) : (
              <h2>Error Al Cargar</h2>
            )}
          </div>
        )}
        <h1>Administración</h1>
        <div className="button_menu">
          <button onClick={() => setActivePage("productos")}>
            Productos
          </button>
          <button onClick={() => setActivePage("alergenos")}>
            Alergenos
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: "20px" }}>
        {activePage === "productos" && <ProductoPage />}
        {activePage === "alergenos" && <AlergenoPage />}
      </div>
    </div>
  );
};

export default MenuPage;
