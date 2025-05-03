// import React, { useState } from "react";
import {
	addItem,
	loadFetchCarts,
} from "@/reducer/CartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BarLoader from "@/components/BarLoader";

const ProductDetail = ({ id }) => {
	const { product, productLoading } = useSelector(
		(state) => state.products,
	);

	const dispatch = useDispatch();
	function handleAddCart() {
		dispatch(addItem(product));
		toast.success("Cart Added Successfully");
		setTimeout(() => {
			window.location.reload();
		}, [2000]);
	}
	useEffect(() => {
		if (id) {
			dispatch(loadFetchCarts({ params: { id } }));
		}
	}, [id]);

	if (productLoading) return <BarLoader />;
	if (!product) return <p>No product found.</p>;
	return (
		<div>
			<img
				src={product.image}
				alt={product.title}
				className="w-[150px]"
			/>
			<h2 className="text-2xl text-amber-400 mb-3 mt-1.5 font-medium">
				{product.title}
			</h2>
			<p>{product.description}</p>
			<p className="text-red-600 mt-2.5 font-bold">
				Price: ${product.price}
			</p>
			<Button
				className="bg-amber-500 text-white my-5 cursor-pointer"
				onClick={handleAddCart}
			>
				Add to Cart
			</Button>
		</div>
	);
};

export default ProductDetail;
