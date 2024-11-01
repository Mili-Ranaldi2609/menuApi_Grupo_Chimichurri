import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";


export interface ActiveSucursalState {
    activeSucursal: ICreateSucursal | undefined;
}

const initialState: ActiveSucursalState = {
    activeSucursal: undefined,
};

// Slice para manejar la empresa activa
export const ActiveSucursalSlice = createSlice({
    name: "ActiveSucursal",
    initialState,
    reducers: {
        setActiveSucursal: (state, action: PayloadAction<ICreateSucursal>) => {
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
