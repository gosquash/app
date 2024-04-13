import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome, faUser, faUsers } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "@/components/text";
import { useUser } from "@/store/user";
import { variables } from "@/utils/styles";

export default function TabsLayout() {
	const user = useUser((state) => state.user);

	if (!user) {
		return <Redirect href="/(auth)/login" />;
	}

	return <Routes />;
}

function Routes() {
	const insets = useSafeAreaInsets();

	const user = useUser((state) => state.user);

	return (
		<Tabs
			initialRouteName="index"
			backBehavior="history"
			screenOptions={{
				headerShown: false,

				tabBarStyle: {
					display: "flex",
					backgroundColor: "#0C0C0E",
					borderTopWidth: 1,
					borderTopColor: "#26262B",
					paddingTop: 8,
					paddingBottom: 8 + insets.bottom,
					height: 64 + insets.bottom,
				},

				tabBarActiveTintColor: variables.accent,
				tabBarInactiveTintColor: variables.colorSecondary,
			}}
			sceneContainerStyle={{ backgroundColor: variables.background }}
		>
			<Tabs.Screen
				name="index"
				options={{
					lazy: true,
					tabBarIcon: ({ focused }) => (
						<TabIcon icon={faHome} focused={focused} />
					),
					tabBarLabel: (labelProps) => <TabText text="Home" {...labelProps} />,
				}}
			/>
			<Tabs.Screen
				name="groups"
				options={{
					lazy: true,
					tabBarIcon: ({ focused }) => (
						<TabIcon icon={faUsers} focused={focused} />
					),
					tabBarLabel: (labelProps) => (
						<TabText text="Groups" {...labelProps} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile/[username]"
				options={{
					lazy: true,
					href: `/profile/${user?.name}`,
					tabBarIcon: ({ focused }) => (
						<TabIcon icon={faUser} focused={focused} />
					),
					tabBarLabel: (labelProps) => (
						<TabText text="Profile" {...labelProps} />
					),
				}}
			/>

			<Tabs.Screen name="games/index" options={{ href: null }} />
		</Tabs>
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

function TabIcon({ focused, icon }: { focused: boolean; icon: IconProp }) {
	return (
		<FontAwesomeIcon
			style={{ color: focused ? variables.accent : variables.colorSecondary }}
			size={24}
			icon={icon}
		/>
	);
}
