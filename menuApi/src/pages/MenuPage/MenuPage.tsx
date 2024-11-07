import { useEffect, useState } from "react";
import ProductoPage from "../ProductosPage/ProductosPage";
import { AlergenoPage } from "../AlergenoPage/AlergenoPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { setActiveSucursal } from "../../redux/slices/sucursalActivaSlice";
import { CategoriaPage } from "../CategoriaPage/CategoriaPage";
import styles from "./MenuPage.module.css";

export const MenuPage = () => {
  const [activePage, setActivePage] = useState<"productos" | "alergenos" | "categorias" | null>(null);

  const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedSucursal = localStorage.getItem("activeSucursal");
    if (savedSucursal && !activeSucursal) {
      dispatch(setActiveSucursal(JSON.parse(savedSucursal)));
    }
  }, [dispatch, activeSucursal]);

  return (
    <div className={styles.menu_page}>
      {/* Sidebar */}
      <div className={styles.menu_sidebar}>
        {/* Mostrar el nombre principal solo si no hay una página activa */}
        {!activePage && (
          <div className={styles.menu_header_container}>
            {activeSucursal ? (
              <h2>{activeSucursal.nombre}</h2>
            ) : (
              <h2>Error Al Cargar</h2>
            )}
          </div>
        )}
        <h1>Administración</h1>
        <div className={styles.button_menu}>
          <button onClick={() => setActivePage("productos")}>
            Productos
          </button>
          <button onClick={() => setActivePage("alergenos")}>
            Alergenos
          </button>
          <button onClick={() => setActivePage("categorias")}>
            Categorias
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.content_area}>
        {activePage === "productos" && <ProductoPage />}
        {activePage === "alergenos" && <AlergenoPage />}
        {activePage === "categorias" && <CategoriaPage />}
      </div>
    </div>
  );
};

export default MenuPage;
