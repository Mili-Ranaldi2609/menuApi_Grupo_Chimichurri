import { configureStore } from "@reduxjs/toolkit"
import { ActiveEmpresaSlice } from "../slices/empresaActivaSlice"
import { ActiveSucursalSlice } from "../slices/sucursalActivaSlice"
import { ActiveCategoriaSlice } from "../slices/categoriaActivaSlice"


export const store =configureStore ({
    reducer:{
        empresaActiva:ActiveEmpresaSlice.reducer,
        sucursalActiva:ActiveSucursalSlice.reducer,
        categoriaActiva:ActiveCategoriaSlice.reducer
    },
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch