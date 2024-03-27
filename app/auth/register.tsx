import { useRouter } from "expo-router";
import { View } from "react-native";

import Container from "@/components/container";
import Button from "@/components/button";
import Text from "@/components/text";
import { variables } from "@/utils/styles";
import Input from "@/components/input";
import Divider from "@/components/divider";

export default function Register() {
	const router = useRouter();

	return (
		<Container
			style={{
				justifyContent: "center",
				alignItems: "center",
				flex: 1,
			}}
		>
			<View
				style={{
					backgroundColor: variables.backgroundSecondary,
					width: "100%",
					padding: 24,
					borderRadius: 12,
					rowGap: 16,
				}}
			>
				<Text as="h1" style={{ textAlign: "center", marginBottom: 0 }}>
					Register
				</Text>

				<Input type="email" placeholder="Email" />
				<Input placeholder="Username" prefix="@" />
				<Input type="password" placeholder="Password" />

				<Button
					title="Register"
					onPress={() => {
						alert("Register");
					}}
				/>

				<Divider />

				<Button
					title="Login"
					variant="secondary"
					onPress={() => router.replace("auth/login")}
				/>
			</View>
		</Container>
	);
}
