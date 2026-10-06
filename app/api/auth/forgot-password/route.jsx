import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your email address.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    /*
     * Do not reveal whether the email exists.
     * This prevents account/email enumeration.
     */
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been created.",
      });
    }

    /*
     * Remove any previous reset tokens for this user.
     */
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    /*
     * Generate a secure random token.
     */
    const token = crypto.randomBytes(32).toString("hex");

    /*
     * Token expires after 30 minutes.
     */
    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    );

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    /*
     * IMPORTANT:
     * The reset page is inside:
     *
     * app/user/reset-password/page.jsx
     *
     * Therefore the URL must contain /user/reset-password
     */
    const resetUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/user/reset-password?token=${token}`;

    /*
     * Development only:
     * We will later replace this with a real email service.
     */
    console.log("=================================");
    console.log("PASSWORD RESET URL:");
    console.log(resetUrl);
    console.log("=================================");

    return NextResponse.json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been created.",

      /*
       * Return the URL only during local development.
       */
      resetUrl:
        process.env.NODE_ENV !== "production"
          ? resetUrl
          : undefined,
    });
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}