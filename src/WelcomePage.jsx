import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const WelcomePage = () => {
	const navigate = useNavigate();
	const { isLoggedIn, logout, loading } = useAuth();

	useEffect(() => {
		if (!loading && !isLoggedIn) {
			navigate("/login");
		}
	}, [isLoggedIn, loading, navigate]);

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className="flex items-center justify-center min-h-screen bg-green-100">
			<div className="bg-white p-8 rounded-lg shadow-md text-center">
				<h1 className="text-2xl font-bold text-green-700">
					✅ Successfully Logged In!
				</h1>
				<p className="mt-4 text-gray-700">Welcome to the system.</p>
				<button
					onClick={handleLogout}
					className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default WelcomePage;
