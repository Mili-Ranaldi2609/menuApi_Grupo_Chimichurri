import { Route, Routes } from "react-router-dom";
import { EmpresaPage } from "../pages/EmpresaPage/EmpresaPage";


export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/principal" element={<EmpresaPage />} />

      </Routes>
    </>
  );
};