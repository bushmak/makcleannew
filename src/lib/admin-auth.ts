import crypto from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "makclean_admin";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? "admin" : "");
}

export function createAdminToken() {
  const secret = process.env.ADMIN_SESSION_SECRET || getAdminPassword();
  return crypto
    .createHmac("sha256", secret)
    .update("makclean-admin-session")
    .digest("hex");
}

export function isValidAdminToken(token?: string) {
  if (!token || !getAdminPassword()) return false;
  const expected = createAdminToken();
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  return tokenBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(tokenBuffer, expectedBuffer);
}

export function isAdminRequest(req: NextRequest) {
  return isValidAdminToken(req.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export function verifyAdminPassword(password: string) {
  const expected = getAdminPassword();
  if (!expected) return false;

  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);

  return passwordBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(passwordBuffer, expectedBuffer);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}
