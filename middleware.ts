import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ['/signin', '/signup']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = cookies().get('token');
    const pathIsPublic = publicRoutes.includes(path);

    if (pathIsPublic && token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!token && !pathIsPublic) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|images|icons|_next/image|.*\\.png$).*)'],
}