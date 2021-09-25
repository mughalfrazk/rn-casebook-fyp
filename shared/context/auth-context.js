import { createContext } from "react";

export const AuthContext = createContext({
	uid: "",
	name: "",
	email: "",
	role: "",
	token: "",
	login: () => {},
	logout: () => {},
});
