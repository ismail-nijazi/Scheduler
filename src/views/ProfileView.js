import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { showProfile,deleteAccount, updateUserProfile } from '../store/slices/user';
import {
  updatePassword,
  reauthenticateWithCredential,
	EmailAuthProvider,
} from 'firebase/auth';
import { auth } from "../firebase";
import {
	Alert,
} from "@mui/material";
import Spinner from "../components/Spinner";
import PopupQuestion from '../components/PopupQuestion';

function ProfileView() {
	const navigate = useNavigate();
	const profile = useSelector((state) => state.profile);
	const [accountInfo, setAccountInfo] = useState({
		email: profile.user.email,
		oldPassword: "",
		newPassowrd: ""
	});
	const [reapeatPass, setRepeatPass] = useState("");
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
	}

	const updateProfile = async () => {
		try {
			setLoading(true);
			if (resetPasswordForm) {
				await resetPassword();
			}
			await updateUserProfile(dispatch, {
				email: accountInfo.email,
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

  return (
		<div className={profile.visible ? 'modal' : 'modal hidden'}>
			<PopupQuestion
				title={"Delete Account"}
				text="Are you sure you want to delet your account?"
				visible={confirmation}
				onClose={() => showConfirm(false)}
				confirm={async () => {
						await deleteAccount(dispatch);
						navigate("/")
					}
				}
				cancle={() => showConfirm(false)}
			/>
      <div className="profile">
        <div
          className="row close-btn"
        >
          <button
            type="button"
            className="btn transparent-btn"
            onClick={() => dispatch(showProfile(false))}
          >
            <FaTimes size={30} />
          </button>
        </div>
				<div className="head">
					<input type="file" name="profie-image" hidden/>
          <button className="profile-image">
            <img src={require('../assets/images/profile.png')} alt="profile" />
          </button>
        </div>
				<div className="content">
					<div className="row">
						{error && <Alert className="col" severity="error">{error}</Alert>}
					</div>
					<div className="row">
						{success &&
							<Alert className="col" severity="success">{success}</Alert>
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
					</div>
					{resetPasswordForm &&
						<div className="resest-password">
							<div className="col">
								<span htmlFor="oldPassword">
									Old password
								</span>
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
									<span htmlFor="newPassowrd">
										new Password
									</span>
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
									<span htmlFor="repeatPass">
										Repeat password
									</span>
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
