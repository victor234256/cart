import { Button } from "@/components/ui/button";
import { fetchCarts } from "@/reducer/CartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartBanner from "../assets/cartBanner.jpg";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import ProductDetail from "./ProductDetail";
import BarLoader from "@/components/BarLoader";

const Home = () => {
	const { carts, cartStatus, cartLoading } = useSelector(
		(state) => state.products,
	);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(null);

	useEffect(() => {
		dispatch(fetchCarts());
	}, []);

	const handleViewClick = (id) => {
		setSelectedId(id);
		setOpen(true);
	};
	if (cartLoading) return <BarLoader />;
	return (
		<>
			<div>
				<img
					src={cartBanner}
					alt=""
					className="h-[50vh] w-full object-cover object-[20%, 70%]"
				/>
			</div>
			{cartStatus === true ? (
				<div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5] sm:grid-cols-2">
					{carts.map((product) => (
						<div key={product.id}>
							<div className="card shadow-2xl rounded-2xl p-5 h-[100%] mr-3">
								<img
									src={product.image}
									alt={product.title}
									className="w-[220px] md:h-[30vh] sm:h-[20vh]"
								/>
								<div>
									{product.title}
									<p>${product.price}</p>
								</div>
								<div>
									<Button
										className="bg-slate-950 text-white"
										onClick={() =>
											handleViewClick(product.id)
										}
									>
										View
									</Button>
								</div>
							</div>
						</div>
					))}
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogContent className="max-w-xl bg-white z-[9999]">
							<DialogHeader>
								<DialogTitle>Product Details</DialogTitle>
								<DialogDescription></DialogDescription>
							</DialogHeader>

							<ProductDetail id={selectedId} />
						</DialogContent>
					</Dialog>
				</div>
			) : (
				<div>
					<p>Unable to fetch products</p>
				</div>
			)}
		</>
	);
};

export default Home;
