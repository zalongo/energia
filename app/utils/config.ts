interface AppConfig {
	API_URL: string;
	API_TIMEOUT_MS: number;
}

const defaultConfig: AppConfig = {
	// API_URL: "http://localhost:3000/api",
	API_URL: "http://192.168.1.142:3000/api",
	API_TIMEOUT_MS: 10000
};

export const config: AppConfig = defaultConfig;