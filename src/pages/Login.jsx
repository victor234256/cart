import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { cart } = useSelector((state) => state.products);
	function handleLogin() {
		const user =
			JSON.parse(localStorage.getItem("user")) || null;

		if (
			user.email === email &&
			user.password === password
		) {
			toast.success("Logged in successfully");
			cart.length >= 1 ? navigate("cart") : navigate("/");
			localStorage.setItem(
				"user",
				JSON.stringify({ ...user, Authenticated: true }),
			);
		} else {
			localStorage.setItem(
				"user",
				JSON.stringify({ ...user, Authenticated: false }),
			);
			toast.error("Invalid email or password");
			return;
		}
		if (!user) {
			toast.error("User not Found");
			return;
		}
	}
	return (
		<div>
			<form
				className="bg-white rounded px-8 pt-6 pb-8 mb-4 border-0"
				onSubmit={handleLogin}
			>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="email"
						required
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="******************"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="text-center">
					<button
						className=" w-full bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
