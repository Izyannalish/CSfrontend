import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true, // Send session cookies
});

export const registerUser = async (username, password) => {
	const formData = new URLSearchParams();
	formData.append("username", username);
	formData.append("password", password);
	return api.post("/register", formData, {
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	});
};

export const loginUser = async (username, password) => {
	const formData = new URLSearchParams();
	formData.append("username", username);
	formData.append("password", password);
	return api.post("/login", formData, {
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	});
};

export const logoutUser = async () => {
	return api.get("/logout");
};

export const getLogs = async () => {
	return api.get("/admin/logs");
};

export const getHealth = async () => {
	return api.get("/health");
};

// Check if session is valid by hitting /logout
export const checkSession = async () => {
	try {
		const response = await api.get("/logout", { validateStatus: () => true });
		// If logged in, /logout redirects to /login (302 or HTML with "login" in it)
		const isRedirected =
			response.status === 302 ||
			(response.data &&
				typeof response.data === "string" &&
				response.data.includes("login"));
		return !isRedirected; // If redirected, session was likely valid; assume invalid if no redirect
	} catch (error) {
		return false; // Error means session likely invalid or server issue
	}
};

export default api;
