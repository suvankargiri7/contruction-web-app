import { createSlice } from '@reduxjs/toolkit';

export const selectSlice = createSlice({
  name: 'selectedValue',
  initialState: {
    value: '00 00 00',
  },
  reducers: {
    setSelectedValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedValue } = selectSlice.actions;

export default selectSlice.reducer;
