import React from 'react';
import { Link } from "react-router-dom";

function LoginForm() {
	return (
		<div className="window loginForm">
			<h3 className="title">Log in</h3>
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
				</div>
				<div className="row">
					<div className="col">
						<button
							type="button"
							className="btn primary-btn">Login</button>
					</div>
				</div>
			</form>
			<div className="row">
				<Link to="/reset_password" className="link">
					<span>Forgot password</span>
				</Link>
			</div>
			<div className="row">
				<p>
					{"Don't have an account? "}
					<Link to="/sign_up" className="btn link">Sign up</Link>
				</p>
			</div>
		</div>
	)
}

export default LoginForm;