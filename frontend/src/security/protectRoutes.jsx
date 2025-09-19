import { useAuth } from "./authContext.jsx";
import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

/*PROTECT ROUTE COMPONENT: Wrap protected routes with this component to ensure only authenticated users can access them*/
const ProtectRoute = ({ children }) => {
	const { accessToken, setAccessToken } = useAuth();
	const location = useLocation();
	const [status, setStatus] = useState("loading"); // "loading" | "valid" | "invalid" | "expired"
	console.log("Protected");

	/*EFFECT TO VALIDATE TOKEN: On component mount or when accessToken changes, validate the token with the backend*/
	useEffect(() => {
		console.log("Current accessToken111:", accessToken);
		const validateToken = async () => {
			if (!accessToken) {
				setStatus("invalid");
				return;
			}
		/*TRY VALIDATING TOKEN: Send the accessToken to the backend for validation*/
		try {
			const response = await fetch("http://localhost:3000/api/checkaccess", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ token: accessToken }),
			});

			const data = await response.json();
			if (response.status === 200) {
				setStatus("valid");
				console.log("Token validation response:", data);
				return;
			}
			if (response.status === 403) {
				setStatus("invalid");
				console.log("Token validation response:", data);
				return;
			}
			if (response.status === 401) {
				setStatus("expired");
				console.log("Token validation response:", data);
				return;
			}
		} catch (error) {
			console.log(error);
			setStatus("invalid");
		}
    };
    /*CALL VALIDATE TOKEN: Call the function to validate the token*/
    validateToken();
  }, [accessToken, location.pathname]);

	useEffect(() => {
		if (status !== "expired") return;
		const refresh = async () => {
			try {
				const response = await fetch("https://localhost:5001/api/refresh_token", {
					method: "POST",
					credentials: "include", // Include cookies
				});
				const data = await response.json();
				console.log("Trying to refresh token1111");
				if (response.status === 200) {
					setAccessToken(data.accessToken);
					setStatus("valid");
					console.log("Token refreshed successfully:", data);
					return;
				}
				if (response.status === 403) {
					setStatus("invalid");
					console.log("Token not refreshed:", data);
					return;
				}
			} catch (error) {
				console.log("Refresh token error:", error);
				setStatus("invalid");
			}
		};
		refresh();
	}, [status]);


	// While checking token validity, show a loading indicator
	if (status === "loading") return <div>Loading...</div>;

	// If token is invalid, go to login
	if (status === "invalid") return <Navigate to="/about" replace />;

  // Otherwise show the protected page
  return children;
};

export default ProtectRoute;
