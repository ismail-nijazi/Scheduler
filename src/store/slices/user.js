import { createSlice } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from '../../firebase';

const initialState = {
  visible: false,
	isLoggedIn: false,
	user: null
};

const userSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    showProfile: (state, action) => {
      state.visible = action.payload;
    },
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
		},
		forgotPassword: async (state) => {
      state.isLoggedIn = true;
		},
		
		setUser: (state, action) => {
			state.user = action.payload;
		}
  }
});

export const {
	showProfile,
	setLogin,
	forgotPassword,
	setUser
} = userSlice.actions;

export const signUp = async (dispatch,accountInfo) => {
	const user = await createUserWithEmailAndPassword(
			auth,
			accountInfo.email,
			accountInfo.password
	);

	dispatch(userSlice.actions.setUser(user));
	dispatch(userSlice.actions.setLogin(true));
}

export const login = async (dispatch,accountInfo) => {
	const user = await signInWithEmailAndPassword(
			auth,
			accountInfo.email,
			accountInfo.password
	);
	dispatch(userSlice.actions.setUser(user));
}

export default userSlice.reducer;
