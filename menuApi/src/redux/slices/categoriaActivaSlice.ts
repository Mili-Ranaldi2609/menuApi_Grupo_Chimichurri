import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";

export interface ActiveCategoriaState {
    activeCategoria: ICategorias | undefined;
}

const initialState: ActiveCategoriaState = {
    activeCategoria: undefined,
};

export const ActiveCategoriaSlice = createSlice({
    name: "ActiveCategoria",
    initialState,
    reducers: {
        setActiveCategoria: (state, action: PayloadAction<ICategorias>) => {
            state.activeCategoria = action.payload;
        },
        clearActiveCategoria: (state) => {
            state.activeCategoria = undefined;
        },
        updateActiveCategoria: (state, action: PayloadAction<ICategorias>) => {
            if (state.activeCategoria && state.activeCategoria.id === action.payload.id) {
                state.activeCategoria = action.payload; // Actualiza solo si coincide el id
            }
        },
    },
});

export const { setActiveCategoria, clearActiveCategoria, updateActiveCategoria } = ActiveCategoriaSlice.actions;
export default ActiveCategoriaSlice.reducer;
