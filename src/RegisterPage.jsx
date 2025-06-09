import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./api";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match!");
			return;
		}

		try {
			await registerUser(username, password);
			alert("Registration successful! Please login.");
			navigate("/login");
		} catch (error) {
			if (error.response) {
				setError(error.response.data.error || "Registration failed");
			} else {
				setError("Network error occurred. Please check the server.");
			}
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold text-center mb-6">Register</h2>
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}
				<form onSubmit={handleRegister}>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
					>
						Register
					</button>
				</form>
				<p className="mt-4 text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500">
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
