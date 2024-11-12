import { configureStore } from "@reduxjs/toolkit";
import selectReducer from './rootDropdown/reducer';

const store = configureStore({
  reducer: {
    selectRootDropdownValue: selectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch  = typeof store.dispatch;

export default store;