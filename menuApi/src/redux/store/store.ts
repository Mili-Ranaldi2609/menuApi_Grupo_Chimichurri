import { configureStore } from "@reduxjs/toolkit"
import { ActiveEmpresaSlice } from "../slices/empresaActivaSlice"


export const store =configureStore ({
    reducer:{
        empresaActiva:ActiveEmpresaSlice.reducer
    },
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch