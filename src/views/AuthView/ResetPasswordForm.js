import React from 'react';
import { Link } from "react-router-dom";

function ResetPasswordForm() {
	return (
		<div className="window">
			<h3 className="title">Reset Password</h3>
			<form>
				<p className="text">
					Enter your email below, you will receive an email
					with instructions on how to reset your password in a few minutes.
				</p>
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
						<button
							type="button"
							className="btn primary-btn"
						>
							Send
						</button>
					</div>
				</div>
			</form>
			<div className="row">
				<Link to="/login" className="link">
					Login
				</Link>
			</div>
		</div>
	)
}

export default ResetPasswordForm