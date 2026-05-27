import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const BACKEND = process.env.BACKEND_URL || "http://localhost:3001";

const API_PATTERNS = [
    "/chat",
    "/single-documents",
    "/tabular-review",
    "/user",
    "/users",
    "/download",
    "/health",
];

const PAGE_CONFLICT = ["/projects", "/workflows"];

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    const isApi = API_PATTERNS.some((p) => pathname === p || pathname.startsWith(p + "/"));

    if (isApi) {
        return NextResponse.rewrite(new URL(pathname + search, BACKEND));
    }

    const isPageConflict =
        request.method !== "GET" &&
        PAGE_CONFLICT.some(
            (p) => pathname === p || pathname.startsWith(p + "/"),
        );

    if (isPageConflict) {
        return NextResponse.rewrite(new URL(pathname + search, BACKEND));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/chat/:path*",
        "/single-documents/:path*",
        "/tabular-review/:path*",
        "/user/:path*",
        "/users/:path*",
        "/download/:path*",
        "/health",
        "/projects/:path*",
        "/workflows/:path*",
    ],
};
