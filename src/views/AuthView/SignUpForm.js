import React from 'react';
import { Link } from "react-router-dom";

function SignUpForm() {
	return (
		<div className="window">
			<h3 className="title">Sign up</h3>
			<form>
				<div className="row">
					<div className="col">
						<label htmlFor="email">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="ismail@gmail.com"
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
							placeholder="Repeat password"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<button
							type="button"
							className="btn primary-btn">Sign up</button>
					</div>
				</div>
			</form>
			<div className="row">
				<p>
					{"Already registered? "}
					<Link to="/login" className="btn link">Login</Link>
				</p>
			</div>
		</div>
	)
}

export default SignUpForm;