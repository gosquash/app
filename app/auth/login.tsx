import { useRouter } from "expo-router";
import { View } from "react-native";

import Container from "@/components/container";
import Button from "@/components/button";
import Text from "@/components/text";
import { variables } from "@/utils/styles";
import Input from "@/components/input";
import Divider from "@/components/divider";

export default function Login() {
	const router = useRouter();

	async function login() {
		// todo: implement login
	}

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
					Welcome back!
				</Text>

				<Input type="email" placeholder="Email" />
				<Input type="password" placeholder="Password" />

				<Button title="Login" loading={false} onPress={login} />

				<Divider />

				<Button
					title="Register"
					variant="secondary"
					onPress={() => router.replace("auth/register")}
				/>
			</View>
		</Container>
	);
}
