import { useLocation } from "react-router-dom";

const NotFound = () => {
	const location = useLocation();
	return (
		<div className="text-center mt-10">
			<h1 className="text-3xl font-bold">
				404 - Page Not Found
			</h1>
			<p className="text-muted-foreground">
				No match for <code>{location.pathname}</code>
			</p>
		</div>
	);
};

export default NotFound;
