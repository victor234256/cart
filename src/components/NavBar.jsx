import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SigninLayout from "./SigninLayout";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

const NavBar = () => {
	const [open, setOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const { totalItems, cart } = useSelector(
		(state) => state.products,
	);
	const user =
		JSON.parse(localStorage.getItem("user")) || null;
	const isAuthenticated = user?.Authenticated;
	const navigate = useNavigate();

	const handleCartview = () => {
		totalItems === 0
			? toast.info("Cart is currently empty")
			: navigate("/cart");
	};

	const handleSigninModal = () => setOpen(true);

	const handleLogout = () => {
		localStorage.setItem(
			"user",
			JSON.stringify({ ...user, Authenticated: false }),
		);
		toast.warn("Logged out successfully");
		navigate("/");
	};

	return (
		<nav className="bg-white shadow-md px-4 py-3">
			<div className="flex justify-between items-center">
				<h2
					onClick={() => navigate("/")}
					className="font-bold text-xl sm:text-2xl md:text-3xl text-amber-600 border-amber-500 border-4 p-1 cursor-pointer"
				>
					Vikki Pro
				</h2>

				<div className="hidden md:flex items-center space-x-4">
					<div className="flex w-full max-w-sm items-center space-x-2"></div>
					<div
						className="relative cursor-pointer"
						onClick={handleCartview}
					>
						<ShoppingCart />
						{totalItems > 0 && (
							<span className="absolute bottom-2 left-4 bg-red-500 text-white text-xs rounded-full px-1">
								{cart.length}
							</span>
						)}
					</div>
					{isAuthenticated ? (
						<Button
							onClick={handleLogout}
							className="bg-slate-950 text-white"
						>
							Logout
						</Button>
					) : (
						<Button
							onClick={handleSigninModal}
							className="bg-slate-950 text-white"
						>
							Sign in
						</Button>
					)}
				</div>

				<div className="md:hidden">
					{menuOpen ? (
						<X
							className="cursor-pointer"
							onClick={() => setMenuOpen(false)}
						/>
					) : (
						<Menu
							className="cursor-pointer"
							onClick={() => setMenuOpen(true)}
						/>
					)}
				</div>
			</div>

			{menuOpen && (
				<div className="md:hidden mt-4 space-y-4">
					<div className="flex items-center space-x-2"></div>
					<div className="flex items-center gap-4">
						<div
							className="relative cursor-pointer"
							onClick={handleCartview}
						>
							<ShoppingCart />
							{totalItems > 0 && (
								<span className="absolute bottom-2 left-4 bg-red-500 text-white text-xs rounded-full px-1">
									{cart.length}
								</span>
							)}
						</div>
						{isAuthenticated ? (
							<Button
								onClick={handleLogout}
								className="bg-slate-950 text-white w-full"
							>
								Logout
							</Button>
						) : (
							<Button
								onClick={handleSigninModal}
								className="bg-slate-950 text-white w-full"
							>
								Sign in
							</Button>
						)}
					</div>
				</div>
			)}

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-xl bg-white z-[9999]">
					<DialogTitle></DialogTitle>
					<DialogHeader>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<SigninLayout />
				</DialogContent>
			</Dialog>
		</nav>
	);
};

export default NavBar;
