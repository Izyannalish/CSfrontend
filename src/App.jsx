import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import WelcomePage from "./WelcomePage";

const ProtectedRoute = ({ children }) => {
	const { isLoggedIn, loading } = useAuth();
	if (loading) return <div>Loading...</div>;
	return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="App">
					<Routes>
						<Route path="/" element={<Navigate to="/login" />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route
							path="/welcome"
							element={
								<ProtectedRoute>
									<WelcomePage />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
