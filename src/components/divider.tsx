import { variables } from "@/utils/styles";
import { View } from "react-native";

interface DividerProps {
	spacing?: number;
}

export default function Divider({ spacing = 8 }: DividerProps) {
	return (
		<View
			style={{
				width: "100%",
				borderBottomColor: variables.borderColor,
				borderBottomWidth: 1,
				marginVertical: spacing,
			}}
		/>
	);
}
