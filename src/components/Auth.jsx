import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
	let user = null;

	try {
		user = JSON.parse(localStorage.getItem("user"));
	} catch (e) {
		console.error(
			"Error parsing user from localStorage",
			e,
		);
	}

	const isAuthenticated = user?.authenticated ?? false;

	return isAuthenticated ? (
		<>
			<Outlet />
		</>
	) : (
		<Navigate to={"/signinlayout"} />
	);
};

export default AuthenticatedLayout;
