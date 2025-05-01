import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import SigninLayout from "./components/signinLayout";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import { Checkout } from "./pages/Checkout";
import AuthenticatedLayout from "./components/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<PageLayout />}>
					<Route index element={<Home />} />
					<Route
						path="home/:id"
						element={<ProductDetail />}
					/>
					<Route path="cart" element={<Cart />} />
					<Route
						path="checkout"
						element={
							<AuthenticatedLayout>
								<Checkout />
							</AuthenticatedLayout>
						}
					/>
					<Route element={<AuthenticatedLayout />}>
						<Route
							path="dashboard"
							element={<Dashboard />}
						/>
					</Route>
					<Route
						path="signinlayout"
						element={<SigninLayout />}
					>
						<Route index element={<Login />} />
						<Route path="signin" element={<Signin />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</>,
		),
	);
	return <RouterProvider router={router} />;
}

export default App;
