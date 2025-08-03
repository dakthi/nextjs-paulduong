import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const {
      title,
      description,
      price,
      category,
      tags,
      isFree,
      isPublished,
      filePath,
      fileName,
      fileSize,
      mimeType
    } = await request.json()

    // Validate required fields
    if (!title || !description || !category || !filePath || !fileName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create document in database
    const document = await prisma.document.create({
      data: {
        title,
        description,
        price: isFree ? 0 : parseFloat(price) || 0,
        category,
        tags: Array.isArray(tags) ? tags : [],
        isFree: Boolean(isFree),
        isPublished: Boolean(isPublished),
        filePath,
        fileName,
        fileSize: parseInt(fileSize) || 0,
        mimeType,
        publishedAt: Boolean(isPublished) ? new Date() : null,
      }
    })

    return NextResponse.json(
      { 
        message: "Document created successfully",
        document 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create document error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}