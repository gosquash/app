import type { ConfigContext, ExpoConfig } from "expo/config";
import { ip } from "address";

const ipAddress = ip();

export default ({ config }: ConfigContext): ExpoConfig => {
	return {
		...config,
		name: "GoSquash",
		slug: "gosquash",
		scheme: "gosquash",
		version: "0.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "dark",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#131317",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#131317",
			},
		},
		web: {
			favicon: "./assets/favicon.png",
		},
		plugins: ["expo-router"],

		extra: {
			apiUrl: process.env.EXPO_PUBLIC_API_URL ?? `http://${ipAddress}:1323`,
		},
	};
};
