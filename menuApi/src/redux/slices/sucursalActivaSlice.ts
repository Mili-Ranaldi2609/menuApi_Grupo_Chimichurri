import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";


export interface ActiveSucursalState {
    activeSucursal: ISucursal | undefined;
}

const initialState: ActiveSucursalState = {
    activeSucursal: undefined,
};

// Slice para manejar la empresa activa
export const ActiveSucursalSlice = createSlice({
    name: "ActiveCategoria",
    initialState,
    reducers: {
        setActiveSucursal: (state, action: PayloadAction<ISucursal>) => {
            state.activeSucursal = action.payload;
        },
        clearActiveSucursal: (state) => {
            state.activeSucursal = undefined;
        },
    },
});

// Exportar las acciones y el reducer
export const { setActiveSucursal, clearActiveSucursal } = ActiveSucursalSlice.actions;
export default ActiveSucursalSlice.reducer;
