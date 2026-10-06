import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export function createSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return null;
    }

    const session = await prisma.session.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      return null;
    }

    // Check if session has expired
    if (session.expiresAt < new Date()) {
      await prisma.session.delete({
        where: {
          id: session.id,
        },
      });

      return null;
    }

    return session.user;
  } catch (error) {
    console.error("GET_CURRENT_USER_ERROR:", error);

    return null;
  }
}