import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('documentId')

    if (!documentId) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      )
    }

    // Check if document is free
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    if (document.isFree) {
      return NextResponse.json({ hasAccess: true, reason: "free" })
    }

    // Check if user has purchased the document
    const purchase = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        documentId: documentId,
        status: "COMPLETED"
      }
    })

    if (purchase) {
      return NextResponse.json({ hasAccess: true, reason: "purchased" })
    }

    // Check if user is admin
    if (session.user.role === "ADMIN") {
      return NextResponse.json({ hasAccess: true, reason: "admin" })
    }

    return NextResponse.json({ hasAccess: false })
  } catch (error) {
    console.error("Check access error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}