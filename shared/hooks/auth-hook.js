import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = () => {
	let authDataInput = {
		uid: "",
		name: "",
		email: "",
		role: "",
		access_token: "",
		refresh_token: "",
		expires_in: "",
		expires_at: "",
	};

	const [authData, setAuthData] = useState(authDataInput);

	const login = (loginData) => {
		setAuthData(loginData);
		AsyncStorage.setItem("casebook_auth", JSON.stringify(loginData));
	};

	const logout = async () => {
		try {
			await AsyncStorage.removeItem("casebook_auth");
			setAuthData(authDataInput);
		} catch (error) {}
	};

	const checkAsyncStorage = async () => {
		try {
			const storedData = await AsyncStorage.getItem("casebook_auth");
			setAuthData(JSON.parse(storedData));
		} catch (error) {}
	};

	useEffect(() => {
		checkAsyncStorage();
	}, []);

	return {
		uid: authData?.uid,
		name: authData?.name,
		email: authData?.email,
		role: authData?.role,
		access_token: authData?.access_token,
		refresh_token: authData?.refresh_token,
		expires_in: authData?.expires_in,
		expires_at: authData?.expires_at,
		login,
		logout,
	};
};
