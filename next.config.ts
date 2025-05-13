// next.config.ts
import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Configuración específica para Turbopack
    turbopack: {
        resolveAlias: {
            // Alias '@' → carpeta 'src'
            "@": path.resolve(__dirname, "src"),
        },
    },

    // Para que Webpack también lo sepa (fallback)
    webpack(config) {
        config.resolve.alias!["@"] = path.resolve(__dirname, "src");
        return config;
    },
};

export default nextConfig;
