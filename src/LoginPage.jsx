import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			await login(username, password);
			navigate("/welcome");
		} catch (error) {
			if (error.response && error.response.status === 429) {
				setError("Too many login attempts. Please try again later.");
			} else {
				setError(
					error.message || "Login failed. Please check your credentials."
				);
			}
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}
				<form onSubmit={handleLogin}>
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
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
					>
						Login
					</button>
				</form>
				<p className="mt-4 text-center">
					Don't have an account?{" "}
					<Link to="/register" className="text-blue-500">
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
