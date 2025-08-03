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
    const limit = parseInt(searchParams.get('limit') || '5')

    let recommendations: any[] = []

    if (documentId) {
      // Get recommendations based on a specific document
      recommendations = await getDocumentBasedRecommendations(documentId, limit)
    } else {
      // Get personalized recommendations based on user's download history
      recommendations = await getUserBasedRecommendations(session.user.id, limit)
    }

    return NextResponse.json({
      recommendations: recommendations.map(doc => ({
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
        similarity: doc.similarity || 0,
        reason: doc.reason || 'Similar content'
      }))
    })

  } catch (error) {
    console.error("Get recommendations error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

async function getDocumentBasedRecommendations(documentId: string, limit: number) {
  // Get the source document with its analysis
  const sourceDoc = await prisma.document.findUnique({
    where: { id: documentId },
    include: {
      analysis: true
    }
  })

  if (!sourceDoc || !sourceDoc.analysis) {
    return []
  }

  // Find documents with similar keywords, category, or tags
  const recommendations = await prisma.document.findMany({
    where: {
      AND: [
        { id: { not: documentId } }, // Exclude the source document
        { isPublished: true },
        {
          OR: [
            // Same category
            { category: sourceDoc.category },
            // Overlapping tags
            { tags: { hasSome: sourceDoc.tags } },
            // Similar keywords in analysis
            {
              analysis: {
                keywords: { hasSome: sourceDoc.analysis.keywords }
              }
            }
          ]
        }
      ]
    },
    include: {
      analysis: true
    },
    take: limit * 2 // Get more to calculate similarity
  })

  // Calculate similarity scores
  const scoredRecommendations = recommendations.map(doc => {
    let similarity = 0
    let reason = []

    // Category match (30% weight)
    if (doc.category === sourceDoc.category) {
      similarity += 0.3
      reason.push('Same category')
    }

    // Tag overlap (25% weight)
    const commonTags = doc.tags.filter(tag => sourceDoc.tags.includes(tag))
    if (commonTags.length > 0) {
      similarity += 0.25 * (commonTags.length / Math.max(doc.tags.length, sourceDoc.tags.length))
      reason.push(`${commonTags.length} shared tags`)
    }

    // Keyword overlap (35% weight)
    if (doc.analysis?.keywords && sourceDoc.analysis?.keywords) {
      const commonKeywords = doc.analysis.keywords.filter(keyword => 
        sourceDoc.analysis!.keywords.includes(keyword)
      )
      if (commonKeywords.length > 0) {
        similarity += 0.35 * (commonKeywords.length / Math.max(doc.analysis.keywords.length, sourceDoc.analysis.keywords.length))
        reason.push(`${commonKeywords.length} shared keywords`)
      }
    }

    // Language match (10% weight)
    if (doc.analysis?.language === sourceDoc.analysis?.language) {
      similarity += 0.1
    }

    return {
      ...doc,
      similarity,
      reason: reason.join(', ') || 'Similar content'
    }
  })

  // Sort by similarity and return top results
  return scoredRecommendations
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
}

async function getUserBasedRecommendations(userId: string, limit: number) {
  // Get user's download history
  const userDownloads = await prisma.download.findMany({
    where: { userId },
    include: {
      document: {
        include: {
          analysis: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 10 // Look at recent downloads
  })

  if (userDownloads.length === 0) {
    // If no download history, return popular documents
    return getPopularDocuments(limit)
  }

  // Extract user preferences from download history
  const userCategories = userDownloads.map(d => d.document.category)
  const userTags = userDownloads.flatMap(d => d.document.tags)
  const userKeywords = userDownloads.flatMap(d => d.document.analysis?.keywords || [])

  // Get downloaded document IDs to exclude
  const downloadedIds = userDownloads.map(d => d.document.id)

  // Find documents matching user preferences
  const categoryFreq = getFrequency(userCategories)
  const tagFreq = getFrequency(userTags)
  const keywordFreq = getFrequency(userKeywords)

  const topCategories = Object.entries(categoryFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([cat]) => cat)

  const topTags = Object.entries(tagFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag)

  const topKeywords = Object.entries(keywordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15)
    .map(([keyword]) => keyword)

  const recommendations = await prisma.document.findMany({
    where: {
      AND: [
        { id: { notIn: downloadedIds } },
        { isPublished: true },
        {
          OR: [
            { category: { in: topCategories } },
            { tags: { hasSome: topTags } },
            {
              analysis: {
                keywords: { hasSome: topKeywords }
              }
            }
          ]
        }
      ]
    },
    include: {
      analysis: true
    },
    take: limit * 2
  })

  // Score based on user preferences
  const scoredRecommendations = recommendations.map(doc => {
    let score = 0
    let reason = []

    // Category preference
    const categoryScore = categoryFreq[doc.category] || 0
    score += categoryScore * 0.4
    if (categoryScore > 0) {
      reason.push('Based on your interests')
    }

    // Tag preference
    const matchingTags = doc.tags.filter(tag => topTags.includes(tag))
    if (matchingTags.length > 0) {
      score += matchingTags.length * 0.3
      reason.push('Similar topics')
    }

    // Keyword preference
    const matchingKeywords = doc.analysis?.keywords.filter(keyword => 
      topKeywords.includes(keyword)
    ) || []
    if (matchingKeywords.length > 0) {
      score += matchingKeywords.length * 0.2
      reason.push('Related content')
    }

    // Popularity boost
    score += Math.log(doc.downloadCount + 1) * 0.1

    return {
      ...doc,
      similarity: Math.min(score / 10, 1), // Normalize to 0-1
      reason: reason.join(', ') || 'Popular content'
    }
  })

  return scoredRecommendations
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
}

async function getPopularDocuments(limit: number) {
  const popularDocs = await prisma.document.findMany({
    where: { isPublished: true },
    orderBy: [
      { downloadCount: 'desc' },
      { viewCount: 'desc' }
    ],
    take: limit,
    include: {
      analysis: true
    }
  })

  return popularDocs.map(doc => ({
    ...doc,
    similarity: 0.5,
    reason: 'Popular document'
  }))
}

function getFrequency(items: string[]): Record<string, number> {
  return items.reduce((freq, item) => {
    freq[item] = (freq[item] || 0) + 1
    return freq
  }, {} as Record<string, number>)
}