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
	isLoggedIn: false,
	user: null,
	userCapacity: 0,
	loading: false,
};

export const MINST_HOURS_PER_WEEK = 1;
export const MAX_HOURS_PER_WEEK = 168;

const userSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLogin: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		forgotPassword: async (state) => {
      state.isLoggedIn = true;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setUserCapacity: (state, action) => {
			state.userCapacity = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		}
  }
});

export const {
	setLogin,
	forgotPassword,
	setUser,
	setUserCapacity,
	setLoading
} = userSlice.actions;

export const signUp = async (dispatch, accountInfo) => {
	const user = await createUserWithEmailAndPassword(
		auth,
		accountInfo.email,
		accountInfo.password,
	);
	await users.create({
		email: accountInfo.email,
		username: "",
		capacity: accountInfo.capacity
	}, auth.currentUser.uid);
	dispatch(userSlice.actions.setUser(user));
	dispatch(userSlice.actions.setUserCapacity(user.capacity));
	dispatch(userSlice.actions.setLogin(true));
}

export const login = async (dispatch,accountInfo) => {
	await signInWithEmailAndPassword(
			auth,
			accountInfo.email,
			accountInfo.password
	);
	const user = users.getOne(auth.currentUser.uid);
	dispatch(userSlice.actions.setUser(user));
	dispatch(userSlice.actions.setUserCapacity(user.capacity));
	getTasks(dispatch);
}

export const updateUserProfile = async (dispatch, accountInfo) => {
	await users.create({
		email: accountInfo.email,
		capacity: accountInfo.capacity
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
