import { BarLoader as Spinner } from "react-spinners";

const BarLoader = ({
	loading = true,
	color = "red",
	height = 4,
	width = 600,
}) => {
	return (
		<div className="flex justify-center items-center h-24">
			<Spinner
				loading={loading}
				color={color}
				height={height}
				width={width}
			/>
		</div>
	);
};

export default BarLoader;
