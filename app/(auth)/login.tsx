import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View } from "react-native";

import Button from "@/components/button";
import Container from "@/components/container";
import Divider from "@/components/divider";
import Input from "@/components/input";
import Text from "@/components/text";

import useForm from "@/hooks/use-form";

import { fetchAPI } from "@/modules/api";

import { variables } from "@/utils/styles";

type Fields = {
	email: string;
	password: string;
};

const form = useForm<Fields>({
	fields: {
		email: "",
		password: "",
	},
	async submit({ email, password }) {
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
	},
});

export default function Login() {
	const router = useRouter();

	const [loading, fields, setFields, submit] = form((state) => [
		state.loading,
		state.fields,
		state.setFields,
		state.submit,
	]);

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
					gap: 16,
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
					onChangeText={(email) => setFields({ email })}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={fields.password}
					onChangeText={(password) => setFields({ password })}
				/>

				<View>
					<Button onPress={() => submit(fields)} loading={loading}>
						Login
					</Button>

					<Divider />

					<Button
						variant="secondary"
						onPress={() => router.replace("register")}
					>
						Register
					</Button>
				</View>
			</View>
		</Container>
	);
}
