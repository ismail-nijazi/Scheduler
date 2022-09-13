import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    showProfile: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { showProfile } = profileSlice.actions;

export default profileSlice.reducer;
