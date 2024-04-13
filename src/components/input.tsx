import { useState } from "react";
import type { TextInputProps } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";

import Text from "@/components/text";

import { variables } from "@/utils/styles";

interface InputProps extends TextInputProps {
	type?: "text" | "password" | "email";

	prefix?: string;
}

export default function Input({ type = "text", ...props }: InputProps) {
	const [focus, setFocus] = useState(false);

	switch (type) {
		case "text":
			props.keyboardType = "default";
			props.autoComplete = "off";
			break;
		case "password":
			props.secureTextEntry = true;
			props.autoComplete = "current-password";
			break;
		case "email":
			props.keyboardType = "email-address";
			props.autoComplete = "email";
			break;
	}

	return (
		<View style={styles.container}>
			{props.prefix && (
				<View style={styles.prefix}>
					<Text bold style={{ fontSize: 16 }}>
						{props.prefix}
					</Text>
				</View>
			)}

			<TextInput
				{...props}
				style={{
					...styles.input,
					fontFamily: "Geomanist-Regular",
					borderColor: focus ? variables.accent : variables.borderColor,
				}}
				onFocus={(event) => {
					props.onFocus && props.onFocus(event);
					setFocus(true);
				}}
				onBlur={(event) => {
					props.onBlur && props.onBlur(event);
					setFocus(false);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 40,
		borderWidth: 1,
		borderColor: variables.borderColor,
		backgroundColor: variables.backgroundDarker,
		borderRadius: 8,

		flexDirection: "row",
		width: "100%",
	},
	input: {
		width: "100%",
		height: "100%",
		flex: 1,
		fontFamily: "GothamSSm-Book",
		paddingHorizontal: 16,
		lineHeight: 18,
		fontSize: 16,
		color: variables.color,
	},

	prefix: {
		width: 40 - 4,
		aspectRatio: 1,

		alignItems: "center",
		justifyContent: "center",
		borderColor: variables.borderColor,
		borderRightWidth: 1,
	},
});
