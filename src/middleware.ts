// // src/middleware.ts
// import { NextResponse, type NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // 🚀 بررسی مستقیم کوکی Better Auth
//   const sessionCookie =
//     request.cookies.get("better-auth.session_token") ||
//     request.cookies.get("__Secure-better-auth.session_token");

//   const isAuthenticated = !!sessionCookie;

//   const pathname = request.nextUrl.pathname;
//   const isAuthRoute = pathname.startsWith("/auth");
//   const isDashboardRoute = pathname.startsWith("/dashboard");

//   // 🛡️ قانون اول: اگر لاگین نیست و می‌خواد بره داشبورد -> هدایت به لاگین
//   if (!isAuthenticated && isDashboardRoute) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // 🛡️ قانون دوم: اگر لاگین هست و می‌خواد بره صفحه لاگین/ثبت‌نام -> هدایت به داشبورد
//   if (isAuthenticated && isAuthRoute) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/:path*"],
// };

// // src/middleware.ts
// import { NextResponse, type NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // 🚀 بررسی هوشمند تمام کوکی‌ها (پشتیبانی کامل از فایرفاکس و Cookie Chunking)
//   const allCookies = request.cookies.getAll();
//   const hasSessionCookie = allCookies.some((cookie) =>
//     cookie.name.includes("session_token"),
//   );

//   const pathname = request.nextUrl.pathname;
//   const isAuthRoute = pathname.startsWith("/auth");
//   const isDashboardRoute = pathname.startsWith("/dashboard");

//   // 🛡️ اگر کوکی وجود ندارد و کاربر می‌خواهد برود داشبورد -> هدایت به لاگین
//   if (!hasSessionCookie && isDashboardRoute) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // 🛡️ اگر کوکی وجود دارد و کاربر می‌خواهد برود صفحه لاگین -> هدایت به داشبورد
//   if (hasSessionCookie && isAuthRoute) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/:path*"],
// };

// src/middleware.ts
// import { NextResponse, type NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // 🚀 ۱. استثنا کردن مسیرهای API جهت جلوگیری از تداخل در OAuth Callback
//   if (pathname.startsWith("/api/auth")) {
//     return NextResponse.next();
//   }

//   // 🚀 ۲. بررسی وجود کوکی سشن (پشتیبانی از کروم، فایرفاکس و پروکسی‌ها)
//   const allCookies = request.cookies.getAll();
//   const hasSessionCookie = allCookies.some((cookie) =>
//     cookie.name.includes("session_token"),
//   );

//   const isAuthRoute = pathname.startsWith("/auth");
//   const isDashboardRoute = pathname.startsWith("/dashboard");

//   // 🛡️ اگر کوکی وجود ندارد و کاربر می‌خواهد برود داشبورد -> هدایت به لاگین
//   if (!hasSessionCookie && isDashboardRoute) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // 🛡️ اگر کوکی وجود دارد و کاربر در صفحات لاگین/ثبت‌نام است -> هدایت به داشبورد
//   if (hasSessionCookie && isAuthRoute) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/:path*"],
// };

// // src/middleware.ts
// import { NextResponse, type NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const allCookies = request.cookies.getAll();
//   const hasSessionCookie = allCookies.some((cookie) =>
//     cookie.name.includes("session_token"),
//   );

//   const pathname = request.nextUrl.pathname;
//   const isDashboardRoute = pathname.startsWith("/dashboard");

//   // 🛡️ فقط یک قانون: اگر کوکی نداری، حق ورود به داشبورد را نداری
//   if (!hasSessionCookie && isDashboardRoute) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // اجازه عبور برای سایر درخواست‌ها
//   return NextResponse.next();
// }

// export const config = {
//   // فقط روی مسیر داشبورد حساس باشد
//   matcher: ["/dashboard/:path*"],
// };

// // src/middleware.ts
// import { NextResponse, type NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // ۱. نادیده گرفتن فایل‌های استاتیک و APIها
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   const allCookies = request.cookies.getAll();
//   const hasSessionCookie = allCookies.some((cookie) =>
//     cookie.name.includes("session_token"),
//   );

//   // 🛡️ فقط یک قانون: اگر کاربر کوکی ندارد و می‌خواهد برود داشبورد -> برود لاگین
//   if (pathname.startsWith("/dashboard") && !hasSessionCookie) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // 🚨 نکته کلیدی: هیچ ردیرکتی از /auth به /dashboard انجام نمی‌دهیم تا چرخه لوپ شکسته شود!
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/:path*"],
// };

// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Static Assets
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   // Better Auth Session Cookie
//   const hasSession = request.cookies
//     .getAll()
//     .some(({ name }) => name.includes("session_token"));

//   // Protect Dashboard
//   if (pathname.startsWith("/dashboard") && !hasSession) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 🚀 ۱. بررسی وجود کوکی سشن Better Auth
  const hasSession = request.cookies
    .getAll()
    .some(({ name }) => name.includes("session_token"));

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth");

  // 🛡️ ۲. اگر کاربر لاگین نیست و می‌خواهد وارد داشبورد شود -> هدایت به لاگین همراه با حفظ آدرس درخواستی
  if (isDashboardRoute && !hasSession) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // 🛡️ ۳. اگر کاربر لاگین است و می‌خواهد وارد صفحات لاگین/ثبت‌نام شود -> هدایت به داشبورد
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// 🎯 تعیین دقیق مسیرهایی که میدلور باید روی آن‌ها حساس باشد (فیلتر استاتیک‌ها توسط خود Next.js)
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
