import { variables } from "@/utils/styles";
import { Stack } from "expo-router";

export default function GroupsLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: variables.background,
				},
			}}
			initialRouteName="index"
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="create" />
		</Stack>
	);
}
