import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

import Button from "@/components/button";
import Container from "@/components/container";
import Divider from "@/components/divider";
import Input from "@/components/input";
import Text from "@/components/text";

import useForm from "@/hooks/use-form";

import { fetchAPI } from "@/modules/api";

import { variables } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";

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
		console.log(email, password);

		const data = await fetchAPI<{ token: string }>("/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (data.error === true) {
			alert("Invalid email or password");
			return false;
		}

		const { token } = data;
		await AsyncStorage.setItem("token", token);

		return true;
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
			scrollEnabled={false}
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
					<Button
						onPress={async () => {
							const result = await submit(fields);
							if (result) {
								console.log("success");
								router.replace("(tabs)");
							}
						}}
						loading={loading}
					>
						Login
					</Button>

					<Divider />

					<Button href="register" variant="secondary" replace>
						Register
					</Button>
				</View>
			</View>
		</Container>
	);
}
