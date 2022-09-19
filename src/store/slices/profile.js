import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	visible: false,
	isLoggedIn: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    showProfile: (state, action) => {
      state.visible = action.payload;
		},
		login: (state)=>{
			state.isLoggedIn = true;
		}
  },
});

export const { 
	showProfile, login
} = profileSlice.actions;

export default profileSlice.reducer;
