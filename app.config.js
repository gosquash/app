const os = require("os");
const interfaces = os.networkInterfaces();

let ipAddress = "";

for (const name in interfaces) {
	for (const iface of interfaces[name]) {
		if (iface.family === "IPv4" && !iface.internal) {
			ipAddress = iface.address;
			break;
		}
	}
}

console.log(ipAddress);

/** @type {import("expo/config").ExpoConfig} */
module.exports = {
	expo: {
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
			apiUrl: process.env.API_URL,
		},
	},
};
