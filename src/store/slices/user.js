import { createSlice } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	deleteUser,
	updateEmail
} from "firebase/auth";
import { auth } from '../../firebase';
import { users } from '../../services/database';
import { getTasks } from "./tasks";

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
	await users.create({
		email: accountInfo.email,
		username: "",
	}, auth.currentUser.uid);

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
	getTasks(dispatch);
}

export const updateUserProfile = async (dispatch, accountInfo) => {
	await users.create({
		email: accountInfo.email,
		username: "",
	}, auth.currentUser.uid);
	await updateEmail(auth.currentUser, accountInfo.email);
}

export const deleteAccount = async (dispatch) => {
	await users.remove(auth.currentUser.uid);
	await deleteUser(auth.currentUser);
	dispatch(userSlice.actions.setUser(null));
	dispatch(userSlice.actions.setLogin(false));
}


export default userSlice.reducer;
