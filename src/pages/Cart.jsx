import SigninLayout from "@/components/SigninLayout";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	clearCart,
	decreaseQty,
	increaseQty,
	removeItem,
	saveOrder,
} from "@/reducer/CartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Cart = () => {
	const { cart, sumTotalPrice } = useSelector(
		(state) => state.products,
	);

	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user =
		JSON.parse(localStorage.getItem("user")) || null;

	const isAuthenticated = user.Authenticated;
	useEffect(() => {
		// dispatch(clearCartNotification());
		if (cart.length === 0) {
			toast.warn(
				"Cart is empty, please go and add to cart",
			);
			navigate("/");
		}
	}, []);

	function handleCheckout() {
		if (!isAuthenticated) {
			toast.error("Please log in to complete checkout");
			setOpen(true);
		} else {
			dispatch(saveOrder(cart));
			dispatch(clearCart());
			toast.success(
				"Checkout successful! Redirecting to dashboard...",
			);
			navigate("dashboard");
		}
	}
	return (
		<div>
			<div className="text-center mt-15 mb-4 text-xl sm:text-2xl font-bold">
				Your Cart
			</div>
			<div className="overflow-x-auto w-full px-2 sm:px-10">
				<table className="min-w-[600px] w-full text-left">
					<thead>
						<tr className="border-b border-gray-400">
							<th>Item</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Total</th>
						</tr>
					</thead>
					{cart.map((item) => (
						<tbody key={item.id}>
							<tr className="mb-5 border-y-2 border-gray-400">
								<td className="flex gap-7 items-center py-5">
									<img
										src={item.image}
										alt={item.title}
										className="w-[50px] sm:w-[70px]"
									/>
									<span className="md:text-2xl text-amber-600 sm:text-base font-medium">
										{item.title}
									</span>
								</td>
								<td>${item.price}</td>
								<td>
									<Button
										onClick={() => {
											item.quantity > 1 &&
												dispatch(decreaseQty(item.id));
										}}
									>
										-
									</Button>
									{item.quantity}

									<Button
										onClick={() =>
											dispatch(increaseQty(item.id))
										}
									>
										+
									</Button>
								</td>
								<td>
									${(item.price * item.quantity).toFixed(2)}
								</td>
								<td
									onClick={() =>
										dispatch(removeItem(item.id))
									}
									className="cursor-pointer text-red-500 font-bold"
								>
									x
								</td>
							</tr>
						</tbody>
					))}
				</table>
				<div className="text-right w-full px-4 sm:px-10 mt-5">
					<p>
						<span className="md:text-2xl text-amber-600 font-bold mr-5">
							Sum Total:
						</span>{" "}
						<span className="sm:text-sm md:text-2xl font-bold mr-3">
							${sumTotalPrice.toFixed(2)}
						</span>
					</p>
					<Button
						className="bg-gray-900 text-white w-50 mt-5"
						onClick={handleCheckout}
					>
						Checkout
					</Button>
				</div>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-xl bg-white z-[9999]">
					<DialogTitle></DialogTitle>
					<DialogHeader>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<SigninLayout />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Cart;
