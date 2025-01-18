// src/redux/slices/alergenosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlergenos } from '../../types/dtos/alergenos/IAlergenos';

interface AlergenosState {
  alergenos: IAlergenos[];
}

const initialState: AlergenosState = {
  alergenos: [],
};

const AlergenosSlice = createSlice({
  name: 'AlergenosSlice',
  initialState,
  reducers: {
    setAlergenos: (state, action: PayloadAction<IAlergenos[]>) => {
      state.alergenos = action.payload;
    },
    addAlergeno: (state, action: PayloadAction<IAlergenos>) => {
      state.alergenos.push(action.payload);
    },
    updateAlergeno: (state, action: PayloadAction<IAlergenos>) => {
      const index = state.alergenos.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.alergenos[index] = action.payload;
      }
    },
    removeAlergeno: (state, action: PayloadAction<number>) => {
      state.alergenos = state.alergenos.filter(a => a.id !== action.payload);
    },
  },
});

export const { setAlergenos, addAlergeno, updateAlergeno, removeAlergeno } = AlergenosSlice.actions;

export default AlergenosSlice.reducer;
