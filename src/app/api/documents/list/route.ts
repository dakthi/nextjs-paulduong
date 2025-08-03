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
    const category = searchParams.get('category')
    const published = searchParams.get('published')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (published !== null && published !== 'all') {
      where.isPublished = published === 'true'
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ]
    }

    // For non-admin users, only show published documents
    if (session.user.role !== "ADMIN") {
      where.isPublished = true
    }

    // Get total count
    const total = await prisma.document.count({ where })

    // Get documents
    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        category: true,
        tags: true,
        isFree: true,
        isPublished: true,
        fileName: true,
        fileSize: true,
        mimeType: true,
        downloadCount: true,
        viewCount: true,
        createdAt: true,
        publishedAt: true,
        analysis: {
          select: {
            keywords: true,
            summary: true,
            language: true,
            wordCount: true,
            readingTime: true
          }
        }
      }
    })

    return NextResponse.json({
      documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("List documents error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}