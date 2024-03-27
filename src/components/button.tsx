import {
	StyleSheet,
	ButtonProps as RNButtonProps,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";

import Text from "./text";
import { variables } from "@/utils/styles";

interface ButtonProps extends RNButtonProps {
	variant?: "primary" | "secondary";
	loading?: boolean;
}

export default function Button({
	loading = false,
	variant = "primary",
	...props
}: ButtonProps) {
	return (
		<TouchableOpacity
			{...props}
			activeOpacity={0.75}
			style={{
				...styles.button,
				...(variant === "secondary" && styles.secondary),
			}}
		>
			{loading ? (
				<ActivityIndicator color={variant === "primary" ? "black" : "white"} />
			) : (
				<Text
					style={{
						...styles.text,
						...(variant === "secondary" && styles.secondaryText),
					}}
				>
					{props.title}
				</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		textAlign: "center",
		backgroundColor: variables.accent,

		alignItems: "center",
		justifyContent: "center",

		height: 48,
		borderRadius: 8,
	},

	text: {
		color: "#000",
		fontSize: 18,
		fontFamily: "Roundo-Bold",
	},

	secondary: {
		backgroundColor: variables.backgroundTertiary,
	},
	secondaryText: {
		color: variables.color,
	},
});
