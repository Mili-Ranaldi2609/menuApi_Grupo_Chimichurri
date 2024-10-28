import { Route, Routes } from "react-router-dom"

import { SucursalPage } from "../pages/SucursalPage/SucursalPage"
import {EmpresaPage} from "../pages/EmpresaPage/EmpresaPage"

import styles from './Principal.module.css';
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path= "/" element={
            <>
            <div className={styles.containerPrincipal}>
              <EmpresaPage />
              <SucursalPage />
            </div>
            </>
          } />
        
      </Routes>
    </>
  )
}
