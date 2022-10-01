import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes,FaQuestionCircle } from 'react-icons/fa';
import { 
	deleteAccount, 
	updateUserProfile,
	MINST_HOURS_PER_WEEK, 
	MAX_HOURS_PER_WEEK,
	login
} from '../store/slices/user';
import {
  updatePassword,
  reauthenticateWithCredential,
	EmailAuthProvider,
} from 'firebase/auth';
import { auth } from "../firebase";
import {
	Alert,
	Tooltip
} from "@mui/material";
import Spinner from "../components/Spinner";
import PopupQuestion from '../components/PopupQuestion';

function ProfileView() {
	const navigate = useNavigate();
	const profile = useSelector((state) => state.profile);
	const [accountInfo, setAccountInfo] = useState({
		email: profile.user.email,
		capacity: profile.userCapacity,
		oldPassword: "",
		newPassowrd: ""
	});
	
	const [reapeatPass, setRepeatPass] = useState("");
	const [passwordDeleteConfirm, setPassword] = useState("");
	const [resetPasswordForm, setPasswordForm] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const [confirmation, showConfirm] = useState(false);
	const dispatch = useDispatch();

	const validtatePassword = () => {
		if (!accountInfo.oldPassword || !accountInfo.newPassowrd || !reapeatPass) {
			setError("You have to fill all fiels");
			return false;
		}
		
		if (accountInfo.newPassowrd !== reapeatPass) {
			setError("Passwords are not matched!");
			return false;
		}
		return true;
	}

	const validateFields = () => {
		if (
			accountInfo.capacity < MINST_HOURS_PER_WEEK ||
			accountInfo.capacity > MAX_HOURS_PER_WEEK) {
			setError("The capacity should be between 1 to 168 hours");
			return false;
		}
		return true;
	}
	
	const resetPassword = async () => {
		if (validtatePassword()) {
			try {
				const credential = EmailAuthProvider.credential(
					profile.user.email,
					accountInfo.oldPassword
				);
				await reauthenticateWithCredential(auth.currentUser, credential);
				await updatePassword(auth.currentUser, accountInfo.newPassowrd);
				setSuccess("Your password was chnaged successfully!");
				setError("");
				setPasswordForm(false);
			} catch (err) {
				if (err.code == "auth/wrong-password") {
					setError("The old password is not currect!");
				}
				else if (err.code == "auth/weak-password") {
					setError("The password is too weak.");
				}
				throw err;
			}
		}
		throw new Error(error);
	}

	const updateProfile = async () => {
		if (validateFields()) {
			try {
				setLoading(true);
				if (resetPasswordForm) {
					await resetPassword();
				}
				await updateUserProfile(dispatch, {
					email: accountInfo.email,
					capacity: accountInfo.capacity
				});
				setSuccess("Your profile was updated successfully!");
			} catch (err){
				if (err.code == "auth/email-already-in-use") {
					setError("The email address is already in use");
				}
			} finally {
				setLoading(false);
			}
		}
	}

	const deleteUserAccount = async () => {
		try {
			setLoading(true);
			await login(dispatch, {
				email: profile.user.email,
				password: passwordDeleteConfirm
			});
			await deleteAccount(dispatch);
			navigate("/")
		} catch (err) {
			if (err.code == "auth/internal-error") {
				setError("Something went wrong!");
			}
			else if (err.code == "auth/wrong-password") {
				setError("The entered password was incorrect!");
			}
			showConfirm(false);
		} finally {
			setLoading(false);
		}
	}

  return (
		<div className="modal">
			<div className="profile">
				<PopupQuestion
					title={"Delete Account"}
					text="Are you sure you want to delet your account?"
					body={
						<div className="confirm-pass">
							<label htmlFor="password">
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								value={passwordDeleteConfirm}
								onChange={event => setPassword(event.target.value)}
								placeholder="Password"
							/>
						</div>}
					visible={confirmation}
					onClose={() => showConfirm(false)}
					confirm={deleteUserAccount}
					cancle={() => showConfirm(false)}
				/>
				{/* <div className="head">
					<input type="file" name="profie-image" hidden/>
          <button className="profile-image">
            <img src={require('../assets/images/profile.png')} alt="profile" />
          </button>
        </div> */}

				<div className="head">
					<span
						className="title">
						Pofile
					</span>
					<div>
						<button
							type="button"
							className="btn transparent-btn"
							onClick={() => navigate(-1)}>
							<FaTimes/>
						</button>
					</div>
        </div>
				<div className="content">
					<div className="row">
						{error && <Alert 
							className="alert" 
							severity="error" 
							sx={{width: "100%"}}>{error}</Alert>}
					</div>
					<div className="row">
						{success &&
							<Alert 
							className="alert" 
							severity="success">{success}</Alert>
						}
					</div>
          <div className="row">
            <div className="col">
              <label htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
								id="email"
								value={accountInfo.email}
								onChange={event => setAccountInfo(
									{ ...accountInfo, email: event.target.value })
								}
                placeholder="example@mail.com"
              />
						</div>
						<div className="col">
							<label htmlFor="capacity">
								Capacity
								<Tooltip
									title={
										"Count of hours/weeks you \
										would spend on your tasks"
									}
								>
									<button className="field-description">
										<FaQuestionCircle />
									</button>
								</Tooltip>
							</label>
							<input
								type="number"
								name="capacity"
								value={accountInfo.capacity}
								id="capacity"
								onChange={(event) => setAccountInfo(
									{ ...accountInfo, capacity: event.target.value })
								}
								min={MINST_HOURS_PER_WEEK}
								max={MAX_HOURS_PER_WEEK}
							/>
						</div>
					</div>
					{resetPasswordForm &&
						<div className="resest-password">
							<div className="col">
								<label htmlFor="oldPassword">
									Old password
								</label>
								<input
									type="password"
									name="old-password"
									id="oldPassword"
									value={accountInfo.oldPassword}
									onChange={event => setAccountInfo(
										{
											...accountInfo,
											oldPassword: event.target.value
										})
									}
									placeholder="Old password"
								/>
							</div>
							<div className="row">
								<div className="col">
									<label htmlFor="newPassowrd">
										new Password
									</label>
									<input
										type="password"
										name="new-password"
										id="newPassowrd"
										value={accountInfo.newPassowrd}
										onChange={event => setAccountInfo(
											{
												...accountInfo,
												newPassowrd: event.target.value
											})
										}
										placeholder="New password"
									/>
								</div>
								<div className="col">
									<label htmlFor="repeatPass">
										Repeat password
									</label>
									<input
										type="password"
										id="repeatPass"
										value={reapeatPass}
										onChange={event =>
											setRepeatPass(event.target.value)
										}
										placeholder="Repeat password"
									/>
								</div>
							</div>
						</div>
					}
					<div className="row">
							<div className="col">
								<button
									type="button"
									className="btn primary-btn"
									onClick={()=> setPasswordForm(!resetPasswordForm)}
								>
									{ !resetPasswordForm ? "Reset Password" : "Cancel"}
								</button>
							</div>
						</div>
					
					<div className="footer">
						<button
								type="button"
								className="btn primary-btn"
								onClick={updateProfile}
							>
								Update profile
								{loading && <Spinner className="spinner-small"/>}
						</button>
						<button
								type="button"
								className="btn danger-btn"
								onClick={() => showConfirm(true)}
							>
								Delete account
						</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
