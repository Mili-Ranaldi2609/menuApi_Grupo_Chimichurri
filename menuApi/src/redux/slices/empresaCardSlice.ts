// empresaSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmpresa } from '../../types/IEmpresa';

interface EmpresaState {
    activeEmpresa: IEmpresa | null;
}

const initialState: EmpresaState = {
    activeEmpresa: null, // Inicialmente no hay empresa activa
};

 export const empresaSlice = createSlice({
    name: 'empresa',
    initialState,
    reducers: {
        setActiveEmpresa: (state, action: PayloadAction<IEmpresa | null>) => {
            state.activeEmpresa = action.payload; // Establecer la empresa activa
        },
        clearActiveEmpresa: (state) => {
            state.activeEmpresa = null; // Limpiar la empresa activa
        },
    },
});

// Exportar las acciones para usarlas en componentes
export const { setActiveEmpresa, clearActiveEmpresa } = empresaSlice.actions;

// Exportar el reducer para usarlo en la store
export default empresaSlice.reducer; // Esto es lo que necesitas importar
