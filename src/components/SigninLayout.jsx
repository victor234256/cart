import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import Login from "@/pages/Login";
import Signin from "@/pages/Signin";

export default function SigninLayout() {
	return (
		<Tabs
			defaultValue="account"
			className="w-[400px] mt-7 mx-auto"
		>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="account">Login</TabsTrigger>
				<TabsTrigger value="password">Sign up</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				<Card className="border-0">
					<CardHeader>
						<CardDescription className="text-red-600 text-center">
							Don't have an account? Signup
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<Login />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="password">
				<Card className="border-0">
					<CardHeader>
						<CardDescription className="text-red-600 text-center">
							Already have an account? Login
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<Signin />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
