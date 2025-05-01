import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	RadioGroup,
	RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@radix-ui/react-select";
import { BanknoteIcon, LucideApple } from "lucide-react";

export function Checkout() {
	return (
		<div className="mx-auto h-auto bg-white">
			<Card className="shadow-xl border border-gray-300">
				<CardHeader>
					<CardTitle className="text-2xl">
						Payment Method
					</CardTitle>
					<CardDescription>
						Add a new payment method to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-6">
					<RadioGroup
						defaultValue="card"
						className="grid grid-cols-3 gap-4"
					>
						{/* Card Option */}
						<div>
							<RadioGroupItem
								value="card"
								id="card"
								className="peer sr-only"
								aria-label="Card"
							/>
							<Label
								htmlFor="card"
								className="flex flex-col items-center justify-between rounded-md border hover:border-black hover:border-2 border-gray-400 bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="mb-3 h-6 w-6 text-amber-600"
								>
									<rect
										width="20"
										height="14"
										x="2"
										y="5"
										rx="2"
									/>
									<path d="M2 10h20" />
								</svg>
								Card
							</Label>
						</div>

						{/* Paypal Option */}
						<div>
							<RadioGroupItem
								value="paypal"
								id="paypal"
								className="peer sr-only"
								aria-label="Paypal"
							/>
							<Label
								htmlFor="paypal"
								className="flex flex-col items-center justify-between rounded-md border hover:border-black hover:border-2 border-gray-400 bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
							>
								<BanknoteIcon className="mb-3 h-6 w-6 text-amber-500" />
								Paypal
							</Label>
						</div>

						{/* Apple Option */}
						<div>
							<RadioGroupItem
								value="apple"
								id="apple"
								className="peer sr-only"
								aria-label="Apple"
							/>
							<Label
								htmlFor="apple"
								className="flex flex-col items-center justify-between rounded-md border hover:border-black hover:border-2 border-gray-400 bg-transparent p-4 hover:bg-accent hover:text-accent-foreground"
							>
								<LucideApple className="mb-3 h-6 w-6 text-amber-500" />
								Apple
							</Label>
						</div>
					</RadioGroup>

					{/* Name */}
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							placeholder="First Last"
							className="border-gray-300"
						/>
					</div>

					{/* City */}
					<div className="grid gap-2">
						<Label htmlFor="city">City</Label>
						<Input id="city" className="border-gray-300" />
					</div>

					{/* Card Number */}
					<div className="grid gap-2">
						<Label htmlFor="number">Card number</Label>
						<Input
							id="number"
							className="border-gray-300"
						/>
					</div>

					{/* Month, Year, CVC */}
					<div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
						{/* Month */}
						<div className="rounded-xl border p-4 shadow-sm relative grid gap-2 border-gray-300 md:w-full">
							<Label htmlFor="month">Month</Label>
							<Select>
								<SelectTrigger
									id="month"
									aria-label="Month"
									className="border"
								>
									<SelectValue placeholder="Month" />
								</SelectTrigger>
								<SelectContent
									sideOffset={4}
									position="popper"
									className="z-50 bg-white p-5 cursor-pointer"
								>
									<SelectItem option="1">
										January
									</SelectItem>
									<SelectItem option="2">
										February
									</SelectItem>
									<SelectItem option="3">March</SelectItem>
									<SelectItem option="4">April</SelectItem>
									<SelectItem option="5">May</SelectItem>
									<SelectItem option="6">June</SelectItem>
									<SelectItem option="7">July</SelectItem>
									<SelectItem option="8">August</SelectItem>
									<SelectItem option="9">
										September
									</SelectItem>
									<SelectItem option="10">
										October
									</SelectItem>
									<SelectItem option="11">
										November
									</SelectItem>
									<SelectItem option="12">
										December
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Year */}
						<div className="rounded-xl border p-4 shadow-sm relative grid gap-2 border-gray-300">
							<Label htmlFor="year">Year</Label>
							<Select>
								<SelectTrigger
									id="year"
									aria-label="Year"
									className="border"
								>
									<SelectValue placeholder="Year" />
								</SelectTrigger>
								<SelectContent
									sideOffset={4}
									position="popper"
									className="z-50"
								>
									{Array.from({ length: 10 }, (_, i) => {
										const year =
											new Date().getFullYear() + i;
										return (
											<SelectItem
												key={year}
												value={year.toString()}
												className="bg-white p-1 hover:bg-amber-100 cursor-pointer"
											>
												{year}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
						</div>

						{/* CVC */}
						<div className="rounded-xl border p-4 shadow-sm grid gap-2 border-gray-300">
							<Label htmlFor="cvc">CVC</Label>
							<Input id="cvc" placeholder="CVC" />
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full bg-black text-white">
						Continue
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
