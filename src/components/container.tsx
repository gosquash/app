import { ScrollView, ScrollViewProps } from "react-native";

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
			contentContainerStyle={props.style}
		>
			{children}
		</ScrollView>
	);
}
