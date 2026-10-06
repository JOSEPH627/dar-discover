
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      password,
      confirmPassword,
    } = body;

    // -----------------------------
    // BASIC VALIDATION
    // -----------------------------

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return NextResponse.json(
        {
          message: "Invalid request data.",
        },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (
      !cleanName ||
      !normalizedEmail ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // NAME VALIDATION
    // -----------------------------

    if (cleanName.length < 2) {
      return NextResponse.json(
        {
          message: "Please enter your full name.",
        },
        { status: 400 }
      );
    }

    if (cleanName.length > 100) {
      return NextResponse.json(
        {
          message: "Name is too long.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // EMAIL VALIDATION
    // -----------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        {
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (normalizedEmail.length > 254) {
      return NextResponse.json(
        {
          message: "Email address is too long.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // PASSWORD VALIDATION
    // -----------------------------

    if (password.length < 8) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return NextResponse.json(
        {
          message: "Password is too long.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Passwords do not match.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // CHECK EXISTING USER
    // -----------------------------

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
        select: {
          id: true,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    // -----------------------------
    // HASH PASSWORD
    // -----------------------------

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    // -----------------------------
    // CREATE USER
    // -----------------------------

    await prisma.user.create({
      data: {
        name: cleanName,
        email: normalizedEmail,
        passwordHash,
      },
    });

    // -----------------------------
    // SUCCESS
    // -----------------------------

    return NextResponse.json(
      {
        message:
          "Account created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGN UP ERROR:", error);

    return NextResponse.json(
      {
        message:
          "Something went wrong while creating the account.",
      },
      { status: 500 }
    );
  }
}

