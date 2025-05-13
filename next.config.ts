// next.config.ts
import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Ignora ESLint durante el build en Vercel
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Tu alias y demás
    turbopack: {
        resolveAlias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    webpack(config) {
        config.resolve.alias!["@"] = path.resolve(__dirname, "src");
        return config;
    },
};

export default nextConfig;
