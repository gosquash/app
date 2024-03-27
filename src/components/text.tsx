import { variables } from '@/utils/styles';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

interface TextProps {
	children: React.ReactNode
	bold?: boolean
	style?: object

	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
}

export default function Text ({ as, bold = false, children, style, ...rest }: TextProps & RNTextProps) {

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

	return (
		<RNText style={textStyles} {...rest}>
			{ children }
		</RNText>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Roundo-Regular',
		color: variables.color,
		fontSize: 14,
		position: 'relative',
		top: 1.5,
	},
	bold: {
		fontFamily: 'Roundo-Bold',
	},

	// as
	h1: {
		fontSize: 32,
		lineHeight: 40,
		fontFamily: 'Roundo-Bold',
		marginBottom: 16,
	},
	h2: {
		fontSize: 24,
		lineHeight: 32,
		fontFamily: 'Roundo-Bold',
		marginBottom: 16,
	},
	h3: {
		fontSize: 20,
		lineHeight: 24,
		fontFamily: 'Roundo-Bold',
		marginBottom: 16,
	},
	h4: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Roundo-Bold',
		marginBottom: 8,
	},
	p: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Roundo-Regular',
		marginBottom: 8,
	},
});
