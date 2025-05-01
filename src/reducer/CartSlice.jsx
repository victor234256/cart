import {
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";

const cartFromLocalStorage = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: [];

const savedCartFromLocalStorage = localStorage.getItem(
	"savedCart",
)
	? JSON.parse(localStorage.getItem("savedCart"))
	: [];

const { totalItems, sumTotalPrice } = calculateTotals(
	cartFromLocalStorage,
);
const initialState = {
	cart: cartFromLocalStorage,
	product: null,
	totalItems: totalItems,
	sumTotalPrice: sumTotalPrice,
	cartLoading: false,
	productLoading: false,
	error: null,
	cartStatus: false,
	showModal: false,
	productStatus: false,
	ifItemNew: false,
	orderHistory: savedCartFromLocalStorage,
};

export const fetchCarts = createAsyncThunk(
	"cart/fetchCarts",
	async () => {
		const response = await fetch(
			"https://fakestoreapi.com/products",
		);
		return await response.json();
	},
);

export const loadFetchCarts = createAsyncThunk(
	"cart/loadFetchCarts",
	async ({ params }) => {
		const { id } = params;
		const response = await fetch(
			`https://fakestoreapi.com/products/${id}`,
		);
		return await response.json();
	},
);

function calculateTotals(cart = []) {
	const totalItems = cart.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);
	const sumTotalPrice = cart.reduce(
		(sum, item) => sum + item.quantity * item.price,
		0,
	);

	return { totalItems, sumTotalPrice };
}

const CartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			const existingItem = state.cart.find(
				(item) => item.id === action.payload.id,
			);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.cart.push({ ...action.payload, quantity: 1 });
			}
			const totals = calculateTotals(state.cart);
			state.totalItems = totals.totalItems;
			state.sumTotalPrice = totals.sumTotalPrice;
			state.ifItemNew = true;
			localStorage.setItem(
				"cart",
				JSON.stringify(state.cart),
			);
		},
		removeItem(state, action) {
			state.cart = state.cart.filter(
				(item) => item.id !== action.payload,
			);
			const totals = calculateTotals(state.cart);
			state.totalItems = totals.totalItems;
			state.sumTotalPrice = totals.sumTotalPrice;
			state.ifItemNew = true;
			localStorage.setItem(
				"cart",
				JSON.stringify(state.cart),
			);
		},
		increaseQty(state, action) {
			const item = state.cart.find(
				(item) => item.id === action.payload,
			);
			if (item) item.quantity++;
			const totals = calculateTotals(state.cart);
			state.totalItems = totals.totalItems;
			state.sumTotalPrice = totals.sumTotalPrice;
			localStorage.setItem(
				"cart",
				JSON.stringify(state.cart),
			);
		},
		decreaseQty(state, action) {
			const item = state.cart.find(
				(item) => item.id === action.payload,
			);
			if (item && item.quantity > 0) item.quantity--;
			const totals = calculateTotals(state.cart);
			state.totalItems = totals.totalItems;
			state.sumTotalPrice = totals.sumTotalPrice;
			localStorage.setItem(
				"cart",
				JSON.stringify(state.cart),
			);
		},

		toggleModal(state, action) {
			state.showModal = action.payload;
		},
		clearCart(state) {
			state.cart = [];
			state.totalItems = 0;
			state.sumTotalPrice = 0;
			localStorage.removeItem("cart");
		},
		clearCartNotification(state) {
			state.ifItemNew = false;
		},

		saveOrder(state, action) {
			state.orderHistory.push({
				items: action.payload,
				date: new Date(),
			});
			localStorage.setItem(
				"savedCart",
				JSON.stringify(state.orderHistory),
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCarts.pending, (state) => {
				state.cartLoading = true;
				state.error = null;
				state.cartStatus = false;
			})
			.addCase(fetchCarts.fulfilled, (state, action) => {
				state.carts = action.payload;
				state.cartLoading = false;
				state.cartStatus = true;
			})
			.addCase(fetchCarts.rejected, (state, action) => {
				state.cartLoading = false;
				state.error = action.payload;
				state.cartStatus = false;
			})

			.addCase(loadFetchCarts.pending, (state) => {
				state.productLoading = true;
				state.error = null;
				state.productStatus = false;
			})
			.addCase(
				loadFetchCarts.fulfilled,
				(state, action) => {
					state.product = action.payload;
					state.productLoading = false;
					state.productStatus = true;
				},
			)
			.addCase(loadFetchCarts.rejected, (state, action) => {
				state.productLoading = false;
				state.error = action.payload;
				state.productStatus = false;
			});
	},
});

export const {
	addItem,
	removeItem,
	increaseQty,
	decreaseQty,
	toggleModal,
	clearCart,
	clearCartNotification,
	saveOrder,
} = CartSlice.actions;
export default CartSlice.reducer;
