import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../store/slices/user";
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import Spinner from '../../components/Spinner';

function SignUpForm() {
	const [accountInfo, setAccount] = useState({ email: "", password:"" });
	const [error, setError] = useState("");
	const [repteatPass, setRepeatPass] = useState("");
	const [loading, setLoding] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const register = async () =>{
		if (!accountInfo.email || !accountInfo.password) {
			setError("You have to fill all fields!");
		}

		else if (accountInfo.password !== repteatPass) {
			setError("Password are not mtached!");
		}
		else {
			setLoding(true);
			try {
				await signUp(dispatch, accountInfo);
				navigate("/");
			} catch (err) {
				if (err.code == "auth/email-already-in-use") {
					setError("The email address is already in use");
				}
				else if (err.code == "auth/weak-password") {
					setError("The password is too weak.");
				}
			}
			setLoding(false);
		}
	} 

	return (
		<div className="window">
			<h3 className="title">Sign up </h3>
			<form>
				<div className="row">
					{error && <Alert className="col" severity="error">{error}</Alert>}
				</div>
				<div className="row">
					<div className="col">
						<label htmlFor="email">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={accountInfo.email}
							id="email"
							onChange={(event) => setAccount(
								{ ...accountInfo, email: event.target.value })
							}
							placeholder="example@mail.com"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<label htmlFor="password">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={accountInfo.password}
							onChange={(event) => setAccount(
								{ ...accountInfo, password: event.target.value })
							}
							id="password"
							placeholder="password"
						/>
					</div>
					<div className="col">
						<label htmlFor="password2">
							Repeat Password
						</label>
						<input
							type="password"
							name="password2"
							id="password2"
							value={repteatPass}
							onChange={(event) => setRepeatPass(event.target.value)}
							placeholder="Repeat password"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<button
							type="button"
							onClick={register}
							className="btn primary-btn">
							Sign up
							{loading && <Spinner className="spinner-small"/>}
						</button>
					</div>
				</div>
			</form>
			<div className="row">
				<p>
					{"Already registered? "}
					<Link to="/login" className="link">Login</Link>
				</p>
			</div>
		</div>
	)
}

export default SignUpForm;