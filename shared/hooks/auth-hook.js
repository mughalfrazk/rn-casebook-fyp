import React, { useState } from "react";

export const useAuth = () => {
	const [authData, setAuthData] = useState({
		uid: "",
		name: "",
		email: "",
		role: "",
		token: "",
	});

	const login = (loginData) => {
		setAuthData(loginData);
	};

	const logout = () => {
		// Sign-out successful.
		setAuthData({
			uid: "",
			name: "",
			email: "",
			role: "",
			token: "",
		});
	};
	return {
		uid: authData.uid,
		name: authData.name,
		email: authData.email,
		role: authData.role,
		token: authData.token,
		login,
		logout,
	};
};
