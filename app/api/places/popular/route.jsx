import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const listings =
      await prisma.listing.findMany({
        where: {
          isActive: true,
        },

        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          category: true,
          location: true,
          price: true,
          image: true,
          rating: true,
          reviewCount: true,
        },

        orderBy: [
          {
            rating: "desc",
          },
          {
            reviewCount: "desc",
          },
        ],

        take: 12,
      });

    const places = listings.map(
      (listing) => ({
        id: listing.id,

        title: listing.title,

        description:
          listing.description,

        type: listing.type,

        category:
          listing.category,

        location:
          listing.location,

        price:
          listing.price !== null
            ? Number(listing.price)
            : null,

        image:
          listing.image,

        rating:
          Number(listing.rating || 0),

        reviewCount:
          listing.reviewCount || 0,
      })
    );

    return NextResponse.json(
      {
        success: true,
        count: places.length,
        places,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Popular places API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load popular places.",
      },
      {
        status: 500,
      }
    );
  }
}