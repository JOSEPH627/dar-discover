import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be signed in to record a view.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const listingId = Number(body?.listingId);

    if (
      !Number.isInteger(listingId) ||
      listingId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid listing ID is required.",
        },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.findFirst({
      where: {
        id: listingId,
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    if (!listing) {
      return NextResponse.json(
        {
          success: false,
          message: "Listing not found.",
        },
        { status: 404 }
      );
    }

    const view = await prisma.listingView.create({
      data: {
        listingId: listing.id,
        userId: currentUser.id,
      },
      select: {
        id: true,
        listingId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Listing view recorded.",
        view,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Listing view API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to record listing view.",
      },
      { status: 500 }
    );
  }
}
