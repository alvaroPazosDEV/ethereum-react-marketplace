import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DialogState {
  show: boolean;
  message: string | null;
}

const initialState: DialogState = {
  show: false,
  message: null,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<string>) => {
      state.show = true;
      state.message = action.payload;
    },
    stop: (state) => {
      state.show = false;
      state.message = null;
    },
  },
});

export const { start, stop } = loadingSlice.actions;

export default loadingSlice.reducer;
