import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const token = body.token?.trim();
    const password = body.password;
    const confirmPassword = body.confirmPassword;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or missing reset token.",
        },
        {
          status: 400,
        }
      );
    }

    if (!password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in both password fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        {
          status: 400,
        }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match.",
        },
        {
          status: 400,
        }
      );
    }

    const resetToken =
      await prisma.passwordResetToken.findUnique({
        where: {
          token,
        },
        include: {
          user: true,
        },
      });

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        {
          status: 400,
        }
      );
    }

    if (resetToken.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({
        where: {
          id: resetToken.id,
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "This reset link has expired.",
        },
        {
          status: 400,
        }
      );
    }

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    await prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        passwordHash,
      },
    });

    // Delete token so it cannot be reused.
    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    // Invalidate existing sessions after password change.
    await prisma.session.deleteMany({
      where: {
        userId: resetToken.userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your password has been reset successfully.",
    });
  } catch (error) {
    console.error(
      "RESET_PASSWORD_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}