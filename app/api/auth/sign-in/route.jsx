import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    // Create session token
    const sessionToken = createSessionToken();

    // Session expires after 7 days
    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    // Save session in database
    await prisma.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expiresAt,
      },
    });

    // Create response
    const response = NextResponse.json(
      {
        message: "Signed in successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 200,
      }
    );

    // Save session token in browser cookie
    response.cookies.set({
      name: "session_token",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error("SIGN IN ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while signing in.",
      },
      {
        status: 500,
      }
    );
  }
}