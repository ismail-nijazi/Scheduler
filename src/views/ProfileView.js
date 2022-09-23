import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { showProfile } from '../store/slices/user';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { auth } from "../firebase";
import Alert from '@mui/material/Alert';
import Spinner from "../components/Spinner";

function ProfileView() {
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
		if (!resetPasswordForm) {
			setPasswordForm(true);
			return;
		}
		if (validtatePassword()) {
			setLoading(true);
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
			}
			finally {
				setLoading(false);
			}
		}
	}

  return (
    <div className={profile.visible ? 'modal' : 'modal hidden'}>
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
              <label htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="example@mail.com"
              />
            </div>
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
						<div className="row resest-password">
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
							<div className="row">
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
					}
          <div className="row">
            <div className="col">
							<button
								type="button"
								className="btn primary-btn"
								onClick={(resetPassword)}
							>
								{resetPasswordForm ? "Update" : "Reset"} Password
								{loading && <Spinner className="spinner-small"/>}
							</button>
            </div>
          </div>

          <div className="row footer">
            <div className="col">
              <button type="button" className="btn danger-btn">Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
