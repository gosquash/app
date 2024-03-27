import { useHookstate } from "@hookstate/core";
import { useFonts } from "expo-font";
import { Tabs, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "@/components/text";
import { fetchUser, user } from "@/store";
import { variables } from "@/utils/styles";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
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

			{isLoading ? null : <App />}
		</>
	);
}

function App() {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const path = usePathname();

	const userState = useHookstate(user);

	useEffect(() => {
		const user = userState.get();

		if (!user || true) {
			router.push("auth/login");
		}
	}, []);

	const isAuth = path.startsWith("/auth/");

	return (
		<KeyboardAvoidingView
			style={{
				backgroundColor: "#131317",
				flex: 1,
			}}
		>
			<Tabs
				initialRouteName="index"
				screenOptions={{
					headerShown: false,

					tabBarStyle: {
						display: isAuth ? "none" : "flex",
						backgroundColor: "#0C0C0E",
						borderTopWidth: 1,
						borderTopColor: "#26262b",
						paddingTop: 8,
						paddingBottom: 8 + insets.bottom,
						height: 64 + insets.bottom,
					},

					tabBarActiveTintColor: variables.accent,
					tabBarInactiveTintColor: variables.colorSecondary,
				}}
				sceneContainerStyle={{
					backgroundColor: "#131317",
					paddingTop: insets.top,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						lazy: true,
						tabBarLabel: (labelProps) => (
							<TabText text="Home" {...labelProps} />
						),
					}}
				/>
				<Tabs.Screen
					name="groups/index"
					options={{
						lazy: true,
						tabBarLabel: (labelProps) => (
							<TabText text="Groups" {...labelProps} />
						),
					}}
				/>

				<Tabs.Screen name="games/index" options={{ href: null }} />

				<Tabs.Screen name="auth/login" options={{ href: null }} />
				<Tabs.Screen name="auth/register" options={{ href: null }} />
			</Tabs>
		</KeyboardAvoidingView>
	);
}

function TabText({
	text,
	focused,
	color,
}: {
	text: string;
	focused: boolean;
	color: string;
}) {
	return (
		<Text bold={focused} style={{ color, fontSize: 12, lineHeight: 14 }}>
			{text}
		</Text>
	);
}
