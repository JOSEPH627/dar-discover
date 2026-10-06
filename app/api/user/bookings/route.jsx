import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    // User must be signed in
    if (!currentUser) {
      return NextResponse.json(
        {
          message: "You must be signed in.",
        },
        { status: 401 }
      );
    }

    // Only normal users can access My Bookings
    if (currentUser.role !== "USER") {
      return NextResponse.json(
        {
          message: "This account cannot access user bookings.",
        },
        { status: 403 }
      );
    }

    // Fetch only bookings belonging to the logged-in user
    const bookings = await prisma.booking.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        listing: true,
      },
      orderBy: {
        bookingDate: "desc",
      },
    });

    return NextResponse.json(
      {
        bookings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET_USER_BOOKINGS_ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while fetching your bookings.",
      },
      { status: 500 }
    );
  }
}