import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
	const user =
		JSON.parse(localStorage.getItem("user")) || null;
	const isAuthenticated = user.Authenticated;

	return isAuthenticated ? (
		<>
			<Outlet />
		</>
	) : (
		<Navigate to={"signinlayout"} />
	);
};

export default AuthenticatedLayout;
