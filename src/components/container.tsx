import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

interface ContainerProps extends ScrollViewProps {
	children?: React.ReactNode;

	notSicky?: boolean;
}

export default function Container({
	children,
	notSicky,
	...props
}: ContainerProps) {
	props.stickyHeaderIndices = [0];

	if (!notSicky) {
		delete props.stickyHeaderIndices;
	}

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			{...props}
			style={{ flex: 1, paddingHorizontal: 24 }}
			contentContainerStyle={{
				...styles.container,
				...(props.style as object),
			}}
		>
			{children}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});
