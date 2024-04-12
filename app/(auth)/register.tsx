import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import Container from "@/components/container";
import Button from "@/components/button";
import Text from "@/components/text";
import Input from "@/components/input";
import Divider from "@/components/divider";

import { fetchAPI } from "@/modules/api";

import { variables } from "@/utils/styles";

interface Fields {
	email: string;
	username: string;
	password: string;
}

async function register(values: Fields) {
	const { email, username, password } = values;

	const data = await fetchAPI("/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, username, password }),
	});

	if (data.error === true) {
		console.log(data);
		alert("Invalid email or password");
		return;
	}

	alert("Register successful");
}

export default function Register() {
	const router = useRouter();

	const [fields, setFields] = useState<Fields>({
		email: "",
		username: "",
		password: "",
	});

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

				<Input
					type="email"
					placeholder="Email"
					autoCapitalize="none"
					value={fields.email}
					onChangeText={(value) => setFields({ ...fields, email: value })}
				/>
				<Input
					placeholder="Username"
					autoCapitalize="none"
					prefix="@"
					value={fields.username}
					onChangeText={(value) => setFields({ ...fields, username: value })}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={fields.password}
					onChangeText={(value) => setFields({ ...fields, password: value })}
				/>

				<Button
					title="Register"
					onPress={() => {
						register(fields);
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
