import { variables } from "@/utils/styles";
import Stack from "expo-router/stack";

export default function ProfileSettingsLayout() {
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
		</Stack>
	);
}
