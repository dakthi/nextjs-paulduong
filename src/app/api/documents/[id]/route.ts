import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const document = await prisma.document.findUnique({
      where: { id: params.id }
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // For non-admin users, only show published documents
    if (session.user.role !== "ADMIN" && !document.isPublished) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.document.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } }
    })

    return NextResponse.json({ document })
  } catch (error) {
    console.error("Get document error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const updates = await request.json()

    const document = await prisma.document.update({
      where: { id: params.id },
      data: updates
    })

    return NextResponse.json({ 
      message: "Document updated successfully",
      document 
    })
  } catch (error) {
    console.error("Update document error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    // Check if document exists
    const document = await prisma.document.findUnique({
      where: { id: params.id }
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // Delete associated records first
    await prisma.payment.deleteMany({
      where: { documentId: params.id }
    })

    await prisma.download.deleteMany({
      where: { documentId: params.id }
    })

    // Delete the document
    await prisma.document.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ 
      message: "Document deleted successfully" 
    })
  } catch (error) {
    console.error("Delete document error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}