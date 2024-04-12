import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "@/components/button";
import Container from "@/components/container";
import Divider from "@/components/divider";
import Input from "@/components/input";
import Text from "@/components/text";
import { fetchAPI } from "@/modules/api";
import { variables } from "@/utils/styles";

export default function Login() {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [fields, setFields] = useState({ email: "", password: "" });

	async function login() {
		setLoading(true);

		const { email, password } = fields;

		const data = await fetchAPI<{ token: string }>("/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (data.error === true) {
			alert("Invalid email or password");
			return;
		}

		const { token } = data;

		await AsyncStorage.setItem("token", token);

		setLoading(false);
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

				<Input
					type="email"
					placeholder="Email"
					value={fields.email}
					autoCapitalize="none"
					onChangeText={(value) =>
						setFields((prev) => ({
							...prev,
							email: value,
						}))
					}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={fields.password}
					onChangeText={(value) =>
						setFields((prev) => ({
							...prev,
							password: value,
						}))
					}
				/>

				<Button title="Login" loading={loading} onPress={login} />

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
