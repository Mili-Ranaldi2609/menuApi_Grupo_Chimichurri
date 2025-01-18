import { useEffect, useState } from "react";
import ProductoPage from "../ProductosPage/ProductosPage";
import { AlergenoPage } from "../AlergenoPage/AlergenoPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { setActiveSucursal } from "../../redux/slices/sucursalActivaSlice";
import { CategoriaPage } from "../CategoriaPage/CategoriaPage";
import styles from "./MenuPage.module.css";
import { useNavigate } from "react-router-dom";

export const MenuPage = () => {
  const [activePage, setActivePage] = useState<"productos" | "alergenos" | "categorias" | null>(null);
  const navigate = useNavigate(); 
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
      <div className={styles.page_header}>
        <span  onClick={() => navigate("/principal")} id={styles.back_button} className="material-symbols-outlined">arrow_back</span>
        <h1>{activeSucursal?.nombre}</h1>
      </div>

      <div className={styles.page_content}>
        {/* Sidebar */}
        <div className={styles.menu_sidebar}>
          <h2>Administración</h2>
          <div className={styles.button_menu}>
            <button onClick={() => setActivePage("productos")} 
            className={activePage === "productos" ? styles.activeButton : ""}>
              Productos
            </button>
            <button onClick={() => setActivePage("alergenos")}
            className={activePage === "alergenos" ? styles.activeButton : ""}>
              Alergenos
            </button>
            <button onClick={() => setActivePage("categorias")}
            className={activePage === "categorias" ? styles.activeButton : ""}>
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
    </div>
  );
};

export default MenuPage;
