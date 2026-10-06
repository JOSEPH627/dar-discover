import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isValidCoordinate(value, min, max) {
  const number = Number(value);

  return (
    Number.isFinite(number) &&
    number >= min &&
    number <= max
  );
}

function calculateDistance(
  latitude1,
  longitude1,
  latitude2,
  longitude2
) {
  const earthRadiusKm = 6371;

  const lat1 = (latitude1 * Math.PI) / 180;
  const lat2 = (latitude2 * Math.PI) / 180;

  const deltaLatitude =
    ((latitude2 - latitude1) * Math.PI) / 180;

  const deltaLongitude =
    ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLatitude / 2) *
      Math.sin(deltaLatitude / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(
      request.url
    );

    const latitude = Number(
      searchParams.get("latitude")
    );

    const longitude = Number(
      searchParams.get("longitude")
    );

    const category =
      searchParams.get("category")?.trim() || "";

    const radius = Number(
      searchParams.get("radius") || "20"
    );

    /*
     * ------------------------------------------------
     * Validate user's coordinates
     * ------------------------------------------------
     */

    if (
      !isValidCoordinate(
        latitude,
        -90,
        90
      ) ||
      !isValidCoordinate(
        longitude,
        -180,
        180
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Valid latitude and longitude are required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ------------------------------------------------
     * Validate radius
     * ------------------------------------------------
     */

    if (
      !Number.isFinite(radius) ||
      radius <= 0 ||
      radius > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Radius must be between 1 and 100 kilometers.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ------------------------------------------------
     * Get active listings from database
     * ------------------------------------------------
     */

    const listings =
      await prisma.listing.findMany({
        where: {
          isActive: true,

          ...(category
            ? {
                category: {
                  equals: category,
                },
              }
            : {}),
        },

        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          category: true,
          location: true,
          latitude: true,
          longitude: true,
          price: true,
          image: true,
          rating: true,
          reviewCount: true,
        },
      });

    /*
     * ------------------------------------------------
     * Calculate real distance
     * ------------------------------------------------
     */

    const nearbyPlaces = listings
      .map((listing) => {
        const placeLatitude =
          Number(listing.latitude);

        const placeLongitude =
          Number(listing.longitude);

        const distance =
          calculateDistance(
            latitude,
            longitude,
            placeLatitude,
            placeLongitude
          );

        return {
          id: listing.id,
          title: listing.title,
          description:
            listing.description,
          type: listing.type,
          category:
            listing.category,
          location:
            listing.location,
          latitude:
            placeLatitude,
          longitude:
            placeLongitude,
          price:
            listing.price
              ? Number(listing.price)
              : null,
          image:
            listing.image,
          rating:
            Number(listing.rating),
          reviewCount:
            listing.reviewCount,
          distance: Number(
            distance.toFixed(2)
          ),
        };
      })
      .filter(
        (place) =>
          place.distance <= radius
      )
      .sort(
        (a, b) =>
          a.distance - b.distance
      );

    /*
     * ------------------------------------------------
     * Response
     * ------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,

        userLocation: {
          latitude,
          longitude,
        },

        filters: {
          category:
            category || null,
          radius,
        },

        count:
          nearbyPlaces.length,

        places:
          nearbyPlaces,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Nearby places API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load nearby places.",
      },
      {
        status: 500,
      }
    );
  }
}