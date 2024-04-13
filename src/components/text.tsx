import { variables } from "@/utils/styles";
import type { TextProps as RNTextProps } from "react-native";
import { Text as RNText, StyleSheet } from "react-native";

interface TextProps {
	children: React.ReactNode;
	bold?: boolean;
	style?: object;

	as?: "h1" | "h2" | "h3" | "h4" | "p";
}

export default function Text({
	as,
	bold = false,
	children,
	style,
	...rest
}: TextProps & RNTextProps) {
	let textStyles: any = styles.text;

	if (bold) {
		textStyles = {
			...textStyles,
			...styles.bold,
		};
	}

	if (as) {
		textStyles = {
			...textStyles,
			...styles[as],
		};
	}

	if (style) {
		textStyles = {
			...textStyles,
			...style,
		};
	}

	textStyles.lineHeight = textStyles.fontSize * 1.2;

	return (
		<RNText style={textStyles} {...rest}>
			{children}
		</RNText>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Geomanist-Regular",
		color: variables.color,
		fontSize: 14,
		lineHeight: 16,
	},
	bold: {
		fontFamily: "Geomanist-Bold",
	},

	// as
	h1: {
		fontSize: 32,
		lineHeight: 40,
		fontFamily: "Geomanist-Bold",
		marginBottom: 16,
	},
	h2: {
		fontSize: 24,
		lineHeight: 32,
		fontFamily: "Geomanist-Bold",
		marginBottom: 16,
	},
	h3: {
		fontSize: 20,
		lineHeight: 24,
		fontFamily: "Geomanist-Bold",
		marginBottom: 16,
	},
	h4: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "Geomanist-Bold",
		marginBottom: 8,
	},
	p: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "Geomanist-Regular",
		marginBottom: 8,
	},
});
