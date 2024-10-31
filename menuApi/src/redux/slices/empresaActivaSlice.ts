import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa2 } from "../../types/dtos/empresa/IEmpresa2";


export interface ActiveEmpresaState {
    activeEmpresa: IEmpresa2 | undefined;
}

const initialState: ActiveEmpresaState = {
    activeEmpresa: undefined,
};

// Slice para manejar la empresa activa
export const ActiveEmpresaSlice = createSlice({
    name: "ActiveEmpresa",
    initialState,
    reducers: {
        setActiveEmpresa: (state, action: PayloadAction<IEmpresa2>) => {
            state.activeEmpresa = action.payload;
        },
        clearActiveEmpresa: (state) => {
            state.activeEmpresa = undefined;
        },
    },
});

// Exportar las acciones y el reducer
export const { setActiveEmpresa, clearActiveEmpresa } = ActiveEmpresaSlice.actions;
export default ActiveEmpresaSlice.reducer;
