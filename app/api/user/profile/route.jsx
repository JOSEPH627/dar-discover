import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "You must be signed in." },
        { status: 401 }
      );
    }

    if (currentUser.role !== "USER") {
      return NextResponse.json(
        { message: "This account cannot update this profile." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();

    if (!name) {
      return NextResponse.json(
        { message: "Full name is required." },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { message: "Full name must contain at least 2 characters." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Email address is required." },
        { status: 400 }
      );
    }

    const emailExists = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: currentUser.id,
        },
      },
    });

    if (emailExists) {
      return NextResponse.json(
        { message: "This email address is already in use." },
        { status: 409 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(
      {
        message: "Profile updated successfully.",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while updating your profile.",
      },
      { status: 500 }
    );
  }
}