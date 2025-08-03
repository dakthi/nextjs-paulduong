import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { documentId } = await request.json()

    if (!documentId) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      )
    }

    // Get document details
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    if (!document.isPublished) {
      return NextResponse.json(
        { error: "Document is not available" },
        { status: 403 }
      )
    }

    // Check access rights
    let hasAccess = false;
    let accessReason = "";

    // Admin has access to everything
    if (session.user.role === "ADMIN") {
      hasAccess = true;
      accessReason = "admin";
    }
    // Free documents are accessible to everyone
    else if (document.isFree) {
      hasAccess = true;
      accessReason = "free";
    }
    // Check if user has purchased the document
    else {
      const purchase = await prisma.payment.findFirst({
        where: {
          userId: session.user.id,
          documentId: documentId,
          status: "COMPLETED"
        }
      });

      if (purchase) {
        hasAccess = true;
        accessReason = "purchased";
      }
    }

    if (!hasAccess) {
      return NextResponse.json(
        { error: "Access denied. Please purchase this document first." },
        { status: 403 }
      )
    }

    // Log the download
    await prisma.download.upsert({
      where: {
        userId_documentId: {
          userId: session.user.id,
          documentId: documentId
        }
      },
      update: {
        // Update timestamp if record exists
        createdAt: new Date()
      },
      create: {
        userId: session.user.id,
        documentId: documentId,
        ipAddress: request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });

    // Increment download count
    await prisma.document.update({
      where: { id: documentId },
      data: { downloadCount: { increment: 1 } }
    });

    // Generate signed URL or return direct URL
    // For now, return the direct URL (in production, you'd want signed URLs)
    return NextResponse.json({
      downloadUrl: document.filePath,
      fileName: document.fileName,
      fileSize: document.fileSize,
      accessReason: accessReason
    });

  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}