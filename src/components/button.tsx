import { Link } from "expo-router";
import {
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	type TextStyle,
	type TouchableOpacityProps,
} from "react-native";

import { Fragment } from "react";
import Text from "./text";

import { variables } from "@/utils/styles";
import type { LinkProps } from "expo-router/build/link/Link";

interface ButtonProps extends TouchableOpacityProps, ButtonLinkProps {
	variant?: "primary" | "secondary" | "danger";
	loading?: boolean;

	textStyle?: TextStyle;
	children?: React.ReactNode;
}

interface ButtonLinkProps {
	href?: string;
	replace?: boolean;
}

export default function Button({
	children,
	loading = false,
	variant = "primary",

	href,
	replace = false,

	textStyle,
	style,

	...props
}: ButtonProps) {
	const variantStyles = variants[variant] ?? {},
		variantTextStyle =
			variants[`${variant}Text` as keyof typeof variants] ?? {};

	const Parent = href ? Link : Fragment;
	const parentProps: LinkProps = (
		href ? { href, replace, asChild: true } : {}
	) as LinkProps;

	return (
		<Parent {...parentProps}>
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
				) : typeof children === "string" ? (
					<Text
						bold
						style={{
							...styles.text,
							...variantTextStyle,
							...textStyle,
						}}
					>
						{children}
					</Text>
				) : (
					children
				)}
			</TouchableOpacity>
		</Parent>
	);
}

const styles = StyleSheet.create({
	button: {
		// flex: 1,
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
		lineHeight: 24,
	},
});

// Variants
const variants = StyleSheet.create({
	primary: {
		backgroundColor: variables.accent,
	},
	primaryText: {
		color: "#000",
	},
	secondary: {
		backgroundColor: variables.backgroundTertiary,
	},
	secondaryText: {
		color: variables.color,
	},
	danger: {
		backgroundColor: variables.red,
	},
	dangerText: {
		color: "#FFF",
	},
});
