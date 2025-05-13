import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Ignora ESLint durante el build en Vercel
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Alias '@' → carpeta 'src'
    turbopack: {
        resolveAlias: {
            "@": path.resolve(__dirname, "src"),
        },
    },

    // Fallback para Webpack
    webpack(config) {
        config.resolve.alias!["@"] = path.resolve(__dirname, "src");
        return config;
    },
};

export default nextConfig;