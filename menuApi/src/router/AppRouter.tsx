import { Route, Routes } from "react-router-dom"
import { EmpresaPage } from "../pages/EmpresaPage/EmpresaPage"
import { SucursalPage } from "../pages/SucursalPage/SucursalPage"

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path= "/empresas" element={<EmpresaPage />} />
        <Route path= "/sucursales" element={<SucursalPage />} />
      </Routes>
    </>
  )
}
