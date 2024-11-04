import { Route, Routes } from "react-router-dom";
import { EmpresaPage } from "../pages/EmpresaPage/EmpresaPage";
import { MenuPage } from "../pages/MenuPage/MenuPage";


export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/principal" element={<EmpresaPage />} />
        <Route path="/administracion" element={<MenuPage />} />
      </Routes>
    </>
  );
};