import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("session_token")?.value;

    if (token) {
      await prisma.session.deleteMany({
        where: {
          token,
        },
      });
    }

    const response = NextResponse.json(
      {
        message: "Logged out successfully.",
      },
      {
        status: 200,
      }
    );

    response.cookies.set({
      name: "session_token",
      value: "",
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while logging out.",
      },
      {
        status: 500,
      }
    );
  }
}