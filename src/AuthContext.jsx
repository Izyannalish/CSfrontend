import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, checkSession } from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifySession = async () => {
			const sessionValid = await checkSession();
			setIsLoggedIn(sessionValid);
			setLoading(false);
		};
		verifySession();
	}, []);

	const login = async (username, password) => {
		try {
			const response = await loginUser(username, password);
			// Backend returns HTML, not JSON, on success or failure
			// Check response.data (string) for signs of failure
			if (typeof response.data === "string") {
				if (response.data.includes("Invalid credentials")) {
					throw new Error("Invalid credentials");
				}
				if (response.data.includes("Too many failed attempts")) {
					throw new Error("Too many failed attempts. Try again later.");
				}
				if (response.data.includes("Account locked")) {
					throw new Error("Account is locked. Please try again later.");
				}
			}
			// If no error and status is 200, assume success (checks for "home" in HTML as a hint)
			if (
				response.status === 200 &&
				typeof response.data === "string" &&
				response.data.includes("home")
			) {
				setIsLoggedIn(true);
				return true;
			}
			throw new Error("Unexpected response from server");
		} catch (error) {
			setIsLoggedIn(false);
			throw error; // Let the component handle the error
		}
	};

	const logout = async () => {
		try {
			await logoutUser();
			setIsLoggedIn(false);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
