import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    async rewrites() {
        return [
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap/sitemap.xml",
            },
            {
                source: "/sitemap_:slug.xml",
                destination: "/api/sitemap/sitemap_:slug.xml",
            },
            {
                source: "/chat/:path*",
                destination: `${BACKEND_URL}/chat/:path*`,
            },
            {
                source: "/projects/:path*",
                destination: `${BACKEND_URL}/projects/:path*`,
            },
            {
                source: "/single-documents/:path*",
                destination: `${BACKEND_URL}/single-documents/:path*`,
            },
            {
                source: "/tabular-review/:path*",
                destination: `${BACKEND_URL}/tabular-review/:path*`,
            },
            {
                source: "/workflows/:path*",
                destination: `${BACKEND_URL}/workflows/:path*`,
            },
            {
                source: "/user/:path*",
                destination: `${BACKEND_URL}/user/:path*`,
            },
            {
                source: "/users/:path*",
                destination: `${BACKEND_URL}/users/:path*`,
            },
            {
                source: "/download/:path*",
                destination: `${BACKEND_URL}/download/:path*`,
            },
            {
                source: "/health",
                destination: `${BACKEND_URL}/health`,
            },
        ];
    },
    skipTrailingSlashRedirect: true,
};

export default nextConfig;
