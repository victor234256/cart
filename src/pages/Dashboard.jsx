import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
	const { orderHistory } = useSelector(
		(state) => state.products,
	);
	JSON.parse(localStorage.getItem("user")) || null;

	return (
		<div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
				Your Orders
			</h1>

			{orderHistory.length === 0 ? (
				<p className="text-center text-gray-500 text-xl">
					You have not placed any orders yet.
				</p>
			) : (
				orderHistory.map((order, index) => (
					<div
						key={index}
						className="border border-gray-200 rounded-lg p-5 mb-8 bg-gray-50"
					>
						<p className="text-lg font-semibold text-blue-700 mb-4">
							Order #{index + 1} —{" "}
							<span className="text-gray-600">
								{new Date(order.date).toLocaleString()}
							</span>
						</p>

						<div className="space-y-4">
							{order.items.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm"
								>
									<div className="flex items-center gap-4">
										<img
											src={item.image}
											alt={item.title}
											className="w-16 h-16 object-cover rounded"
										/>
										<div>
											<p className="font-medium text-gray-800">
												{item.title}
											</p>
											<p className="text-sm text-gray-500">
												Quantity: {item.quantity}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-sm text-gray-600">
											$
											{(item.price * item.quantity).toFixed(
												2,
											)}
										</p>
										<p className="text-sm font-semibold text-green-600">
											Status: Successful
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default Dashboard;
