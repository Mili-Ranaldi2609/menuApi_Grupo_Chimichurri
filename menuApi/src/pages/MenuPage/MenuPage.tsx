// MenuPage.tsx
import { useEffect, useState } from "react";
import ProductoPage from "../ProductosPage/ProductosPage";
import { AlergenoPage } from "../AlergenoPage/AlergenoPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { setActiveSucursal } from "../../redux/slices/sucursalActivaSlice";
export const MenuPage = () => {
  const [currentView, setCurrentView] = useState("menu");
  const activeSucursal = useSelector((state: RootState) => state.sucursalActiva.activeSucursal);
  console.log("Sucursal activa en MenuPage:", activeSucursal);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedSucursal = localStorage.getItem("activeSucursal");
    if (savedSucursal && !activeSucursal) {
      dispatch(setActiveSucursal(JSON.parse(savedSucursal)));
    }
  }, [dispatch, activeSucursal]);
  
  const handleProductosClick = () => {
    setCurrentView("productos");
  };

  const handleAlergenosClick = () => {
    setCurrentView("alergenos");
  };

  const handleBackToMenu = () => {
    setCurrentView("menu");
  };

  return (
    <>
      {currentView === "menu" ? (
        <>
           <div className="menu__header-contenedor">
          {activeSucursal ? (
            <h2>{activeSucursal.nombre}</h2>
          ) : (
            <h2>Error Al Cargar</h2>
          )}
        </div>

          <h1>Administración</h1>
          <div className="button_menu">
             <button  onClick={handleProductosClick}>Productos</button>
          <button  onClick={handleAlergenosClick}>Alergenos</button>
          </div>
         
        </>
      ) : currentView === "productos" ? (
        <ProductoPage onBack={handleBackToMenu} />
      ) : (
        <AlergenoPage onBack={handleBackToMenu} /> // Renderiza AlergenoPage si currentView es "alergenos"
      )}
    </>
  );
};

export default MenuPage;