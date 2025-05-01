import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";

const PageLayout = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="fixed w-full bg-white">
				<NavBar />
			</div>

			<div className="pt-10 flex-grow">
				<Outlet />
			</div>
			<Footer />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
};

export default PageLayout;
