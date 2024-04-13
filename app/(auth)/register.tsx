import { View } from "react-native";

import Button from "@/components/button";
import Container from "@/components/container";
import Divider from "@/components/divider";
import Input from "@/components/input";
import Text from "@/components/text";

import useForm from "@/hooks/use-form";

import { fetchAPI } from "@/modules/api";

import { variables } from "@/utils/styles";

interface Fields {
	email: string;
	username: string;
	password: string;
}

const form = useForm<Fields>({
	fields: {
		email: "",
		username: "",
		password: "",
	},
	async submit({ email, username, password }) {
		const { error } = await fetchAPI<{ error: boolean }>("/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, username, password }),
		});

		if (error) {
			alert("Invalid email or password");
			return;
		}

		alert("Register successful");
	},
});

export default function Register() {
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
					onChangeText={(email) => setFields({ email })}
				/>
				<Input
					placeholder="Username"
					autoCapitalize="none"
					prefix="@"
					value={fields.username}
					onChangeText={(username) => setFields({ username })}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={fields.password}
					onChangeText={(password) => setFields({ password })}
				/>

				<Button onPress={() => submit(fields)} loading={loading}>
					Register
				</Button>

				<Divider />

				<Button href="login" variant="secondary" replace>
					Login
				</Button>
			</View>
		</Container>
	);
}
