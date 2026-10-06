
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "You must be signed in.",
        },
        { status: 401 }
      );
    }

    if (currentUser.role !== "USER") {
      return NextResponse.json(
        {
          message: "This account cannot access user reviews.",
        },
        { status: 403 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET_USER_REVIEWS_ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while fetching your reviews.",
      },
      { status: 500 }
    );
  }
}
