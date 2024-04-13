import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useUser } from "@/store/user";
import { variables } from "@/utils/styles";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const fetchUser = useUser((state) => state.fetchUser);
	const [userLoading, setUserLoading] = useState(true);

	const [fontsLoaded] = useFonts({
		"Roundo-Regular": require("../assets/fonts/Roundo-Regular.ttf"),
		"Roundo-Bold": require("../assets/fonts/Roundo-Bold.ttf"),
		"Roundo-Light": require("../assets/fonts/Roundo-Light.ttf"),
	});

	useEffect(() => {
		async function run() {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			await fetchUser();

			setUserLoading(false);
		}

		run();
	}, []);

	useEffect(() => {
		if (!fontsLoaded || userLoading) return;

		SplashScreen.hideAsync();
	}, [fontsLoaded, userLoading]);

	const isLoading = !fontsLoaded || userLoading;

	return (
		<>
			<StatusBar style="light" />

			<KeyboardAvoidingView
				style={{
					backgroundColor: "#131317",
					flex: 1,
				}}
			>
				{!isLoading && <App />}
			</KeyboardAvoidingView>
		</>
	);
}

function App() {
	const insets = useSafeAreaInsets();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: variables.background,
					paddingTop: insets.top,
				},
				animation: "flip",
			}}
		>
			<Stack.Screen name="(tabs)" />

			<Stack.Screen name="(auth)/login" />
			<Stack.Screen name="(auth)/register" />
		</Stack>
	);
}
