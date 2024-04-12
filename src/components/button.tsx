import {
	StyleSheet,
	type TouchableOpacityProps,
	TouchableOpacity,
	ActivityIndicator,
	type TextStyle,
} from "react-native";

import Text from "./text";
import { variables } from "@/utils/styles";

interface ButtonProps extends TouchableOpacityProps {
	variant?: "primary" | "secondary" | "danger";
	loading?: boolean;

	textStyle?: TextStyle;
	children?: React.ReactNode;
}

export default function Button({
	children,
	loading = false,
	variant = "primary",

	textStyle,
	style,

	...props
}: ButtonProps) {
	const variantStyles = variants[variant];

	return (
		<TouchableOpacity
			{...props}
			activeOpacity={0.75}
			style={{
				...styles.button,
				...variantStyles,
				...(style as object),
			}}
		>
			{loading ? (
				<ActivityIndicator color={variant === "primary" ? "#000" : "#FFF"} />
			) : (
				<Text
					style={{
						...styles.text,
						...(variant === "secondary" && styles.secondaryText),
						...textStyle,
					}}
				>
					{children}
				</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		textAlign: "center",
		backgroundColor: variables.accent,

		alignItems: "center",
		justifyContent: "center",

		height: "100%",
		maxHeight: 48,
		borderRadius: 8,
	},

	text: {
		color: "#000",
		fontSize: 18,
		fontFamily: "Roundo-Bold",
	},

	secondaryText: {
		color: variables.color,
	},
});

// Variants
const variants = StyleSheet.create({
	primary: {
		backgroundColor: variables.accent,
		color: "#FFF",
	},
	secondary: {
		backgroundColor: variables.backgroundTertiary,
		color: variables.color,
	},
	danger: {
		backgroundColor: variables.red,
		color: "#FFF",
	},
});
