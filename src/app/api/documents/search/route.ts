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
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: "Search query must be at least 2 characters" },
        { status: 400 }
      )
    }

    // Build search conditions
    const whereConditions: any = {
      isPublished: true,
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          tags: {
            hasSome: [query]
          }
        },
        {
          analysis: {
            keywords: {
              hasSome: [query.toLowerCase()]
            }
          }
        },
        {
          analysis: {
            summary: {
              contains: query,
              mode: 'insensitive'
            }
          }
        }
      ]
    }

    // Add category filter if specified
    if (category && category !== 'all') {
      whereConditions.category = category
    }

    // For non-admin users, only show published documents
    if (session.user.role !== "ADMIN") {
      whereConditions.isPublished = true
    }

    // Get total count for pagination
    const total = await prisma.document.count({
      where: whereConditions
    })

    // Search documents with analysis data
    const documents = await prisma.document.findMany({
      where: whereConditions,
      include: {
        analysis: {
          select: {
            keywords: true,
            summary: true,
            language: true,
            wordCount: true,
            readingTime: true
          }
        }
      },
      orderBy: [
        // Prioritize title matches
        {
          title: 'asc'
        }
      ],
      skip: (page - 1) * limit,
      take: limit
    })

    // Calculate relevance scores (simple implementation)
    const documentsWithScore = documents.map(doc => {
      let score = 0
      const queryLower = query.toLowerCase()
      
      // Title match (highest weight)
      if (doc.title.toLowerCase().includes(queryLower)) {
        score += 10
      }
      
      // Description match
      if (doc.description.toLowerCase().includes(queryLower)) {
        score += 5
      }
      
      // Keywords match
      if (doc.analysis?.keywords.some(keyword => 
        keyword.toLowerCase().includes(queryLower) || 
        queryLower.includes(keyword.toLowerCase())
      )) {
        score += 8
      }
      
      // Content match (lower weight due to potential noise)
      if (doc.content?.toLowerCase().includes(queryLower)) {
        score += 2
      }
      
      // Tag match
      if (doc.tags.some(tag => tag.toLowerCase().includes(queryLower))) {
        score += 6
      }

      return {
        ...doc,
        relevanceScore: score,
        matchedKeywords: doc.analysis?.keywords.filter(keyword => 
          keyword.toLowerCase().includes(queryLower) || 
          queryLower.includes(keyword.toLowerCase())
        ) || []
      }
    })

    // Sort by relevance score
    documentsWithScore.sort((a, b) => b.relevanceScore - a.relevanceScore)

    // Extract search suggestions from keywords
    const allKeywords = documents
      .flatMap(doc => doc.analysis?.keywords || [])
      .filter(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)

    return NextResponse.json({
      documents: documentsWithScore.map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        price: doc.price,
        category: doc.category,
        tags: doc.tags,
        isFree: doc.isFree,
        fileName: doc.fileName,
        fileSize: doc.fileSize,
        downloadCount: doc.downloadCount,
        viewCount: doc.viewCount,
        createdAt: doc.createdAt,
        relevanceScore: doc.relevanceScore,
        matchedKeywords: doc.matchedKeywords,
        analysis: doc.analysis
      })),
      suggestions: allKeywords,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      searchQuery: query
    })

  } catch (error) {
    console.error("Search documents error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}