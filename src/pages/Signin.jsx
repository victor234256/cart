import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Signin = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSignin(e) {
		e.preventDefault();
		const user = {
			name,
			email,
			password,
			Authenticated: false,
		};

		localStorage.setItem("user", JSON.stringify(user));
		toast.success("You have Successfully Registered");
		<Navigate to={"signinlayout"} />;
	}
	return (
		<div>
			<form
				className="bg-white rounded px-8 pt-6 pb-8 mb-4 border-0"
				onSubmit={handleSignin}
			>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Enter your full name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="email"
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
					<Button
						className=" w-full bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign Up
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Signin;
