const Footer = () => {
	return (
		<footer className="bg-slate-900 text-white py-6 mt-10">
			<div className="max-w-7xl mx-auto px-4 gap-4">
				<div className="text-center sm:text-center">
					<p className="text-sm">
						&copy; {new Date().getFullYear()} Vikki Pro. All
						rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
